import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { authService } from "../../services/authService";

interface ValidationErrors {
  [key: string]: string[];
}

export default function OTPVerificationForm() {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Recupera l'email utente dal backend tramite token
    const fetchUser = async () => {
      try {
        const response = await authService.me();
        const user = response?.data?.user;
        if (user && user.email) {
          console.log("[OTP] Email recuperata:", user.email);
          setEmail(user.email);
        } else {
          console.warn("[OTP] Nessuna email trovata nella risposta:", response);
        }
      } catch (err) {
        console.error("[OTP] Errore nel recupero dati utente:", err);
        setError("Impossibile recuperare i dati utente. Effettua nuovamente l'accesso.");
      }
    };
    fetchUser();
  }, []);



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors({});
    setError("");
    
    if (!otp) {
      setError("Please enter the verification code");
      console.warn("[OTP] Tentativo di verifica senza codice OTP");
      return;
    }
    
    if (!email) {
      setError("Email is required. Please go back to the registration page.");
      console.warn("[OTP] Tentativo di verifica senza email");
      return;
    }

    setLoading(true);
    console.log("[OTP] Invio verifica OTP", { email, otp });

    try {
      const response = await authService.verifyOTP({
        email,
        otp
      });

      if (response.success) {
        console.log("[OTP] Verifica OTP riuscita", response);
        // Dopo verifica, aggiorna lo stato utente dal backend
        try {
          const meResponse = await authService.me();
          console.log("[OTP] Aggiornamento stato utente dopo verifica OTP:", meResponse);
          if (meResponse?.data?.user) {
            const user = meResponse.data.user;
            // Aggiorna lo stato utente nel localStorage con tutti i campi necessari
            const userToStore = {
              ...user,
              access_token: localStorage.getItem('token'),
              email_verified_at: user.email_verified_at || new Date().toISOString(),
              onboarding_completed: user.onboarding_completed || false,
              onboarding_step: user.onboarding_step || 2
            };
            console.log("[OTP] Aggiornamento localStorage dopo verifica:", userToStore);
            localStorage.setItem('user', JSON.stringify(userToStore));
          }
        } catch (meErr) {
          console.warn("[OTP] Errore aggiornamento stato utente dopo verifica OTP", meErr);
        }
        // Redirect a onboarding (il ProtectedRoute farà il resto)
        navigate("/onboarding");
      } else {
        console.warn("[OTP] Verifica OTP fallita", response);
      }
    } catch (err: any) {
      console.error("[OTP] Errore durante la verifica OTP", err);
      if (err.response?.status === 422 && err.response?.data?.errors) {
        setValidationErrors(err.response.data.errors);
        setError(err.response.data.message || "Validation errors");
      } else if (err.response?.status === 400) {
        setError(err.response?.data?.message || "Invalid or expired code");
      } else {
        setError(err.response?.data?.message || "Error verifying code");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!email) {
      setError("Email is required to resend verification code");
      console.warn("[OTP] Tentativo di reinvio OTP senza email");
      return;
    }

    setLoading(true);
    setError("");
    console.log("[OTP] Invio richiesta resend OTP", email);

    try {
      const response = await authService.resendOTP(email);
      if (response.success) {
        setError("");
        console.log("[OTP] Resend OTP riuscito", response);
      } else {
        setError(response.message || "Error sending verification code");
        console.warn("[OTP] Resend OTP fallito", response);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Error sending verification code");
      console.error("[OTP] Errore durante resend OTP", err);
    } finally {
      setLoading(false);
    }
  };

  if (!email) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center min-h-[300px]">
        <p className="text-gray-500 dark:text-gray-400">Caricamento dati utente...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Verify Your Email
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              We've sent a verification code to {email}. Please enter it below.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-100 rounded-lg dark:bg-red-900/30 dark:text-red-400">
                  {error}
                </div>
              )}
              
              <div>
                <Label>
                  Verification Code <span className="text-error-500">*</span>
                </Label>
                <Input
                  type="text"
                  placeholder="Enter verification code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required={true}
                />
                {validationErrors.otp && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {validationErrors.otp[0]}
                  </p>
                )}
              </div>

              <div>
                <Button
                  className="w-full"
                  size="sm"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Verify"}
                </Button>
              </div>
              
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={loading || !email}
                  className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Resend verification code
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
