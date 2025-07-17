import apiConfig from './apiConfig';

const { axios } = apiConfig;
const API_URL = `${apiConfig.apiUrl}/v1`;

interface StepRegistrationData {
  email: string;
  phone?: string;
}

interface VerifyOTPData {
  registration_id: string;
  otp: string;
}

interface UserTypeData {
  registration_id: string;
  user_type: string;
  data: Record<string, any>;
}

interface RelatedEntitiesData {
  registration_id: string;
  entities: Record<string, any>[];
}

interface PasswordData {
  registration_id: string;
  password: string;
  password_confirmation: string;
}

export const registrationService = {
  // Inizia registrazione (Passo 1)
  async startRegistration(data: StepRegistrationData) {
    const response = await axios.post(`${API_URL}/registration/start`, data);
    return response.data;
  },
  
  // Verifica OTP 
  async verifyOTP(data: VerifyOTPData) {
    const response = await axios.post(`${API_URL}/registration/verify-otp`, data);
    return response.data;
  },
  
  // Ottieni step corrente
  async getCurrentStep() {
    const response = await axios.get(`${API_URL}/registration/step`);
    return response.data;
  },
  
  // Invia dati per uno step specifico
  async submitStep(step: number, data: Record<string, any>) {
    const response = await axios.post(`${API_URL}/registration/step/${step}`, data);
    return response.data;
  },
  
  // Completa registrazione
  async completeRegistration(data: Record<string, any>) {
    const response = await axios.post(`${API_URL}/registration/complete`, data);
    if (response.data.access_token) {
      localStorage.setItem('user', JSON.stringify(response.data.data));
      localStorage.setItem('token', response.data.access_token);
    }
    return response.data;
  },
  
  // === Legacy support (vecchio sistema multi-step) ===
  
  // Passo 2: Raccolta dati tipo utente
  async collectUserTypeData(data: UserTypeData) {
    const response = await axios.post(`${API_URL}/registration/legacy/${data.registration_id}/step2`, data);
    return response.data;
  },
  
  // Passo 3: Raccolta entità correlate
  async collectRelatedEntities(data: RelatedEntitiesData) {
    const response = await axios.post(`${API_URL}/registration/legacy/${data.registration_id}/step3`, data);
    return response.data;
  },
  
  // Passo 4: Imposta password e invia OTP
  async setPasswordAndSendOTP(data: PasswordData) {
    const response = await axios.post(`${API_URL}/registration/legacy/${data.registration_id}/step4`, data);
    return response.data;
  },
  
  // Completamento: Verifica OTP e completa registrazione
  async verifyOTPAndComplete(data: VerifyOTPData) {
    const response = await axios.post(`${API_URL}/registration/legacy/${data.registration_id}/complete`, data);
    if (response.data.access_token) {
      localStorage.setItem('user', JSON.stringify(response.data.data));
      localStorage.setItem('token', response.data.access_token);
    }
    return response.data;
  }
};
