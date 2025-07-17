import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Button from '../ui/button/Button';
import Label from '../form/Label';
import Input from '../form/input/InputField';
import { authService } from '../../services/authService';

// Tipi di utente supportati dal backend
const USER_TYPES = [
  { id: 'athlete', label: 'Athlete' },
  { id: 'guardian', label: 'Guardian/Parent' },
  { id: 'club', label: 'Club/Team' },
  { id: 'committee', label: 'Committee' },
  { id: 'federation', label: 'Federation' },
  { id: 'event_organizer', label: 'Event Organizer' },
  { id: 'referee', label: 'Referee' }
];

// Interfaccia per i dati di onboarding
interface OnboardingData {
  // Step 3: Selezione tipo utente
  userTypes: string[];
  
  // Step 4: Dati specifici per tutti i tipi di utente
  name: string;
  phone: string;
  
  // Dati specifici per atleti
  birthdate: string;
  gender: string;
  weight: string;
  belt: string;
  
  // Dati specifici per club
  club_name: string;
  fiscal_code: string;
  address: string;
  club_email: string;
  
  // Dati per guardian
  relationship: string;
  
  // Dati per referee
  qualification: string;
  license_number: string;

  // Altri campi specifici per gli altri tipi di utente
  committee_name: string;
  region: string;
  federation_name: string;
  country: string;
  organizer_name: string;
  contact_email: string;
}

export default function OnboardingSteps() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState<OnboardingData>({
    // Inizializza tutti i campi vuoti
    userTypes: [],
    name: '',
    phone: '',
    birthdate: '',
    gender: '',
    weight: '',
    belt: '',
    club_name: '',
    fiscal_code: '',
    address: '',
    club_email: '',
    relationship: '',
    qualification: '',
    license_number: '',
    committee_name: '',
    region: '',
    federation_name: '',
    country: '',
    organizer_name: '',
    contact_email: '',
  });
  const navigate = useNavigate();
  const totalSteps = 2; // Il nostro frontend mostrerà 2 step (3 e 4 del backend)

  // Fetch current onboarding step on component mount
  useEffect(() => {
    async function fetchOnboardingStatus() {
      try {
        // First try to get from local storage
        const user = authService.getCurrentUser();
        
        if (user?.onboarding_completed) {
          navigate('/');
          return;
        }
        
        // Se l'utente non ha verificato l'email, reindirizza alla verifica OTP
        if (user && !user.email_verified_at) {
          console.log('[ONBOARDING] Email non verificata, redirect a /verify-otp');
          navigate('/verify-otp');
          return;
        }
        
        // Then fetch the latest status from the server
        const response = await authService.getCurrentOnboardingStep();
        console.log('[ONBOARDING] Risposta getCurrentOnboardingStep:', response);
        if (response.success) {
          if (response.data.onboarding_completed) {
            console.log('[ONBOARDING] Onboarding completato, redirect a /');
            navigate('/');
          } else {
            const backendStep = response.data.step || 1;
            console.log('[ONBOARDING] Step backend:', backendStep, 'user_types:', response.data.user_types);
            
            // Aggiorna lo user nel localStorage con lo step attuale dal backend
            const currentUser = authService.getCurrentUser();
            if (currentUser) {
              const updatedUser = {
                ...currentUser,
                onboarding_step: backendStep
              };
              localStorage.setItem('user', JSON.stringify(updatedUser));
              console.log('[ONBOARDING] User aggiornato nel localStorage con step', backendStep);
            }
            
            if (backendStep === 2 || backendStep === 3) {
              setCurrentStep(1);
              console.log('[ONBOARDING] Set currentStep 1 (selezione tipo utente, backend step 2 o 3)');
              if (response.data.user_types) {
                setData(prev => ({ ...prev, userTypes: response.data.user_types }));
                console.log('[ONBOARDING] userTypes prelevati:', response.data.user_types);
              }
            } else if (backendStep === 4) {
              setCurrentStep(2);
              console.log('[ONBOARDING] Set currentStep 2 (dati specifici per tipo utente, backend step 4)');
            } else {
              setCurrentStep(1);
              console.log('[ONBOARDING] Set currentStep 1 (default/fallback)');
            }
          }
        } else {
          console.warn('[ONBOARDING] Errore nella risposta getCurrentOnboardingStep:', response);
        }
      } catch (err) {
        console.error('Error fetching onboarding status:', err);
        setError('Error fetching your onboarding status. Please try again.');
      } finally {
        setLoading(false);
      }
    }
    
    fetchOnboardingStatus();
  }, [navigate]);

  const handleStepSubmit = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Step 1 del frontend (Step 3 del backend) - Selezione tipo utente
      if (currentStep === 1) {
        if (data.userTypes.length === 0) {
          setError('Please select at least one user type');
          setLoading(false);
          return;
        }
        
        // Invia la selezione del tipo utente al backend
        const response = await authService.selectUserType({
          user_types: data.userTypes
        });
        
        if (response.success) {
          // Passa allo step 2 del frontend (Step 4 del backend)
          setCurrentStep(2);
        } else {
          setError(response.message || 'Error saving user types');
        }
      } 
      // Step 2 del frontend (Step 4 del backend) - Inserimento dati specifici
      else if (currentStep === 2) {
        // Prepara i dati da inviare in base ai tipi utente selezionati
        const userData: Record<string, any> = {
          name: data.name,
          phone: data.phone,
        };
        
        // Aggiungi campi specifici in base ai tipi utente selezionati
        if (data.userTypes.includes('athlete')) {
          userData.birthdate = data.birthdate;
          userData.gender = data.gender;
          userData.weight = data.weight;
          userData.belt = data.belt;
        }
        
        if (data.userTypes.includes('club')) {
          userData.club_name = data.club_name;
          userData.fiscal_code = data.fiscal_code;
          userData.address = data.address;
          userData.club_email = data.club_email;
        }
        
        if (data.userTypes.includes('guardian')) {
          userData.relationship = data.relationship;
        }
        
        if (data.userTypes.includes('referee')) {
          userData.qualification = data.qualification;
          userData.license_number = data.license_number;
        }
        
        if (data.userTypes.includes('committee')) {
          userData.committee_name = data.committee_name;
          userData.region = data.region;
        }
        
        if (data.userTypes.includes('federation')) {
          userData.federation_name = data.federation_name;
          userData.country = data.country;
        }
        
        if (data.userTypes.includes('event_organizer')) {
          userData.organizer_name = data.organizer_name;
          userData.contact_email = data.contact_email;
        }
        
        // Invia i dati utente al backend
        const response = await authService.submitUserData(userData);
        
        if (response.success) {
          // Recupera i dati utente aggiornati dal backend
          const userResponse = await authService.me();
          console.log('[ONBOARDING] Risposta finale dopo submit user data:', userResponse);
          
          if (userResponse.success) {
            // Ottieni l'utente corrente dal localStorage per preservare token e altri campi
            const currentUser = authService.getCurrentUser();
            
            // Combina i dati: mantieni token e altri campi, aggiorna con i nuovi dati
            const updatedUser = {
              ...currentUser,
              ...userResponse.data.user,
              onboarding_completed: true,
              email_verified_at: currentUser?.email_verified_at || new Date().toISOString()
            };
            
            console.log('[ONBOARDING] Aggiornamento localStorage con utente:', updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
          }
          
          // Navigate to dashboard
          navigate('/');
        } else {
          setError(response.message || 'Error saving user data');
        }
      }
    } catch (error: any) {
      console.error('Error updating onboarding step:', error);
      setError(error.response?.data?.message || 'Error saving your data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Gestisci il cambio di tipo utente
  const handleUserTypeChange = (type: string) => {
    setData(prev => {
      const userTypes = [...prev.userTypes];
      
      if (userTypes.includes(type)) {
        // Rimuovi il tipo se già selezionato
        const index = userTypes.indexOf(type);
        userTypes.splice(index, 1);
      } else {
        // Aggiungi il tipo se non è già selezionato
        userTypes.push(type);
      }
      
      return { ...prev, userTypes };
    });
  };

  // Aggiorna i dati generici
  const updateData = (field: string, value: any) => {
    setData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Renderizza i campi per i dati specifici in base al tipo utente
  const renderUserTypeSpecificFields = () => {
    const { userTypes } = data;
    
    return (
      <div className="space-y-6">
        {/* Campi comuni per tutti gli utenti */}
        <div className="space-y-4">
          <div>
            <Label>Full Name <span className="text-error-500">*</span></Label>
            <Input
              type="text"
              placeholder="Your full name"
              value={data.name}
              onChange={(e) => updateData('name', e.target.value)}
              required={true}
            />
          </div>
          <div>
            <Label>Phone Number</Label>
            <Input
              type="tel"
              placeholder="Your phone number"
              value={data.phone}
              onChange={(e) => updateData('phone', e.target.value)}
            />
          </div>
        </div>

        {/* Campi specifici per atleti */}
        {userTypes.includes('athlete') && (
          <div className="p-4 space-y-4 border rounded-lg border-gray-200 dark:border-gray-700">
            <h3 className="font-medium text-gray-900 dark:text-white">Athlete Information</h3>
            <div>
              <Label>Birth Date <span className="text-error-500">*</span></Label>
              <Input
                type="date"
                value={data.birthdate}
                onChange={(e) => updateData('birthdate', e.target.value)}
                required={true}
              />
            </div>
            <div>
              <Label>Gender <span className="text-error-500">*</span></Label>
              <select
                className="w-full px-3 py-2 border rounded-lg focus:outline-none dark:bg-gray-800 dark:text-gray-300"
                value={data.gender}
                onChange={(e) => updateData('gender', e.target.value)}
                required
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <Label>Weight (kg)</Label>
              <Input
                type="number"
                placeholder="Your weight in kg"
                value={data.weight}
                onChange={(e) => updateData('weight', e.target.value)}
              />
            </div>
            <div>
              <Label>Belt/Level</Label>
              <Input
                type="text"
                placeholder="Your belt or level"
                value={data.belt}
                onChange={(e) => updateData('belt', e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Campi specifici per club */}
        {userTypes.includes('club') && (
          <div className="p-4 space-y-4 border rounded-lg border-gray-200 dark:border-gray-700">
            <h3 className="font-medium text-gray-900 dark:text-white">Club Information</h3>
            <div>
              <Label>Club Name <span className="text-error-500">*</span></Label>
              <Input
                type="text"
                placeholder="Club name"
                value={data.club_name}
                onChange={(e) => updateData('club_name', e.target.value)}
                required={true}
              />
            </div>
            <div>
              <Label>Fiscal Code <span className="text-error-500">*</span></Label>
              <Input
                type="text"
                placeholder="Fiscal code or VAT number"
                value={data.fiscal_code}
                onChange={(e) => updateData('fiscal_code', e.target.value)}
                required={true}
              />
            </div>
            <div>
              <Label>Address <span className="text-error-500">*</span></Label>
              <Input
                type="text"
                placeholder="Club address"
                value={data.address}
                onChange={(e) => updateData('address', e.target.value)}
                required={true}
              />
            </div>
            <div>
              <Label>Club Email</Label>
              <Input
                type="email"
                placeholder="Club email"
                value={data.club_email}
                onChange={(e) => updateData('club_email', e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Altri campi specifici per gli altri tipi di utente possono essere aggiunti qui */}
        {/* Esempio per referee */}
        {userTypes.includes('referee') && (
          <div className="p-4 space-y-4 border rounded-lg border-gray-200 dark:border-gray-700">
            <h3 className="font-medium text-gray-900 dark:text-white">Referee Information</h3>
            <div>
              <Label>Qualification <span className="text-error-500">*</span></Label>
              <Input
                type="text"
                placeholder="Your qualification"
                value={data.qualification}
                onChange={(e) => updateData('qualification', e.target.value)}
                required={true}
              />
            </div>
            <div>
              <Label>License Number</Label>
              <Input
                type="text"
                placeholder="Your license number"
                value={data.license_number}
                onChange={(e) => updateData('license_number', e.target.value)}
              />
            </div>
          </div>
        )}
        
        {/* Altri blocchi per guardian, committee, federation, event_organizer */}
      </div>
    );
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col items-center justify-center flex-1 px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
              Complete Your Profile
            </h2>
            <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
              Step {currentStep} of {totalSteps}
            </p>
          </div>

          {loading && (
            <div className="flex items-center justify-center w-full py-8">
              <div className="w-8 h-8 border-4 border-gray-300 rounded-full border-t-brand-500 animate-spin"></div>
            </div>
          )}

          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-100 rounded-lg dark:bg-red-900/30 dark:text-red-400">
              {error}
            </div>
          )}

          {!loading && (
            <div className="mt-8 space-y-6">
              {/* Step 1: Selezione tipo utente */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <Label>Select User Type(s) <span className="text-error-500">*</span></Label>
                    <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">
                      Select all that apply to you. You can select multiple roles.
                    </p>
                    
                    <div className="space-y-2">
                      {USER_TYPES.map((type) => (
                        <div key={type.id} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`type-${type.id}`}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            checked={data.userTypes.includes(type.id)}
                            onChange={() => handleUserTypeChange(type.id)}
                          />
                          <label htmlFor={`type-${type.id}`} className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                            {type.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Dati specifici per tipo utente */}
              {currentStep === 2 && renderUserTypeSpecificFields()}

              {/* Pulsanti di navigazione */}
              <div className="flex justify-between">
                {currentStep > 1 && (
                  <Button
                    size="sm"
                    onClick={() => setCurrentStep(prev => prev - 1)}
                    disabled={loading}
                  >
                    Previous
                  </Button>
                )}
                <Button
                  size="sm"
                  className={currentStep === 1 ? 'w-full' : ''}
                  onClick={handleStepSubmit}
                  disabled={loading}
                >
                  {currentStep === totalSteps ? 'Complete' : 'Next'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
