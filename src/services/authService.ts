import apiConfig from './apiConfig';

const { axios } = apiConfig;
// We're using relative paths directly with axios since baseURL is already set

interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone?: string;
  ruolo?: string;
}

interface LoginData {
  email: string;
  password: string;
  device_name?: string;
}

interface OnboardingRegisterData {
  email: string;
  password: string;
  password_confirmation: string;
  phone?: string;
}

interface OnboardingVerifyOTPData {
  email: string;
  otp: string;
}

interface OnboardingUserTypeData {
  user_types: string[]; // Array of user types: 'athlete', 'guardian', 'referee', 'club', 'federation', etc.
}

// Nuova interfaccia per l'aggiunta di un ruolo all'utente

export const authService = {
  // Registrazione tradizionale single-step
  async register(data: RegisterData) {
    const response = await axios.post(`/v1/auth/register`, data);
    if (response.data && response.data.data && response.data.data.access_token) {
      // Salva i dati dell'utente
      localStorage.setItem('user', JSON.stringify(response.data.data));
      // Salva il token di accesso
      localStorage.setItem('token', response.data.data.access_token);
    }
    return response.data;
  },

  // Login
  async login(data: LoginData) {
    const response = await axios.post(`/v1/auth/login`, data);
    if (response.data && response.data.success) {
      // Estrai i dati dalla risposta
      const userData = response.data.data;
      
      // Combina i dati dell'utente con le informazioni di onboarding
      const userDataWithOnboarding = {
        ...userData.user,
        access_token: userData.access_token,
        token_type: userData.token_type,
        onboarding_completed: userData.onboarding_completed,
        onboarding_step: userData.onboarding_step
      };
      
      // Salva i dati dell'utente
      localStorage.setItem('user', JSON.stringify(userDataWithOnboarding));
      
      // Salva il token di accesso
      localStorage.setItem('token', userData.access_token);

      // Debug della risposta e dei dati salvati
      console.log("[AUTH] Login - Risposta API:", response.data);
      console.log("[AUTH] Login - Dati utente salvati:", userDataWithOnboarding);
    }
    return response.data;
  },

  // Logout
  async logout() {
    const token = localStorage.getItem('token');
    if (token) {
      await axios.post(`/v1/auth/logout`, {}, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
    }
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  },
  
  // Onboarding step by step - Passo 1: Registrazione iniziale
  async startOnboarding(data: OnboardingRegisterData) {
    const response = await axios.post(`/v1/onboarding/register`, data);
    return response.data;
  },
  
  // Onboarding step by step - Passo 2: Verifica OTP
  async verifyOTP(data: OnboardingVerifyOTPData) {
    const response = await axios.post(`/v1/onboarding/verify-otp`, data);
    if (response.data.success) {
      // Se abbiamo un token, aggiorniamo localStorage
      if (response.data.data && response.data.data.access_token) {
        // Prepara i dati utente da salvare
        const userData = {
          ...response.data.data.user,
          access_token: response.data.data.access_token,
          email_verified_at: new Date().toISOString(), // Aggiungi un timestamp
          onboarding_step: 2 // Dopo OTP, prossimo step è 2
        };
        
        localStorage.setItem('token', response.data.data.access_token);
        localStorage.setItem('user', JSON.stringify(userData));
      }
    }
    return response.data;
  },
  
  // Onboarding step by step - Passo 3: Selezione tipo utente
  async selectUserType(data: OnboardingUserTypeData) {
    const response = await axios.post(`/v1/onboarding/select-user-type`, data);
    return response.data;
  },
  
  // Onboarding step by step - Passo 4: Inserimento dati utente
  async submitUserData(data: Record<string, any>) {
    const response = await axios.post(`/v1/onboarding/user-data`, data);
    if (response.data.success) {
      // Aggiorna localStorage con onboarding completato
      const currentUser = this.getCurrentUser();
      if (currentUser) {
        const updatedUser = {
          ...currentUser,
          onboarding_completed: true,
          // Assicurati che email_verified_at sia presente
          email_verified_at: currentUser.email_verified_at || new Date().toISOString()
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    }
    return response.data;
  },
  
  // Onboarding step by step - Ottieni step corrente
  async getCurrentOnboardingStep() {
    const response = await axios.get(`/v1/onboarding/step`);
    return response.data;
  },

  // Onboarding step by step - Reinvia OTP
  async resendOTP(email: string) {
    const response = await axios.post(`/v1/onboarding/resend-otp`, { email });
    return response.data;
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  },
  
  // Verifica se l'utente ha completato l'onboarding
  isOnboardingCompleted() {
    const user = this.getCurrentUser();
    return user?.onboarding_completed === true;
  },
  
  // Ottieni lo step attuale dell'onboarding
  getOnboardingStep() {
    const user = this.getCurrentUser();
    return user?.onboarding_step || 1;
  },
  
  // Verifica utente corrente
  async me() {
    const response = await axios.get(`/v1/auth/me`);
    return response.data;
  },
  
  // Aggiungi un nuovo tipo utente al profilo corrente (riutilizza la logica onboarding)
  async addUserType(userType: string) {
    try {
      // Recupera i ruoli attuali dell'utente
      const currentUser = this.getCurrentUser();
      let currentRoles: string[] = [];
      if (currentUser && Array.isArray(currentUser.roles)) {
        currentRoles = currentUser.roles.map((r: any) => typeof r === 'string' ? r : r.name || r.ruolo || r.type || r);
      }
      // Unisci i ruoli attuali con quello nuovo, senza duplicati
      const newRoles = Array.from(new Set([...currentRoles, userType]));
      // Chiamata all'endpoint onboarding per aggiornare i ruoli
      const data: OnboardingUserTypeData = { user_types: newRoles };
      const response = await axios.post(`/v1/onboarding/select-user-type`, data);
      // Aggiorna localStorage come nell'onboarding
      if (response.data && response.data.success && response.data.data) {
        const userData = {
          ...currentUser,
          roles: newRoles.map(role => ({ name: role })),
        };
        localStorage.setItem('user', JSON.stringify(userData));
      }
      return response.data;
    } catch (error) {
      console.error('[authService] Errore durante l\'aggiunta del tipo utente (onboarding logic):', error);
      throw error;
    }
  }
};

// Add axios interceptor to handle authentication headers
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
