import OnboardingEntityForm from "./pages/Onboarding/OnboardingEntityForm";
// ...existing code...
          {/* Onboarding dinamico per nuove entità (unica route con query param) */}
          <Route path="/onboarding-entity" element={<OnboardingEntityForm />} />
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import Onboarding from "./pages/AuthPages/Onboarding";
import OTPVerification from "./pages/AuthPages/OTPVerification";
import AddUserTypeOnboarding from "./pages/AuthPages/AddUserTypeOnboarding";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import TournamentPage from "./pages/Tournament/TournamentPage";
import { authService } from "./services/authService";
import { RoleProvider, UserRole } from "./context/RoleContext";
import RoleProtectedRoute from "./components/auth/RoleProtectedRoute";

// Role-specific dashboards
import AthleteDashboard from "./pages/Dashboard/AthleteDashboard";
import GuardianDashboard from "./pages/Dashboard/GuardianDashboard";
import ClubDashboard from "./pages/Dashboard/ClubDashboard";
import CommitteeDashboard from "./pages/Dashboard/CommitteeDashboard";
import FederationDashboard from "./pages/Dashboard/FederationDashboard";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";

// Protected Route wrapper component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = authService.getCurrentUser();
  console.log("[ROUTER] ProtectedRoute - Stato utente:", user);
  
  // If no user is logged in, redirect to sign in
  if (!user) {
    console.log("[ROUTER] ProtectedRoute - Nessun utente, redirect a signin");
    return <Navigate to="/signin" />;
  }
  
  // Se l'utente non ha verificato l'email, reindirizza alla verifica OTP
  if (!user.email_verified_at) {
    console.log("[ROUTER] ProtectedRoute - Email non verificata, redirect a verify-otp");
    return <Navigate to="/verify-otp" />;
  }
  
  // If user hasn't completed onboarding, redirect to onboarding
  if (!user.onboarding_completed) {
    console.log("[ROUTER] ProtectedRoute - Onboarding non completato, redirect a onboarding");
    return <Navigate to="/onboarding" />;
  }
  
  console.log("[ROUTER] ProtectedRoute - Utente autenticato e onboarding completato");
  return <>{children}</>;
};

// Auth Route wrapper component (for login/register pages)
const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const user = authService.getCurrentUser();
  console.log("[ROUTER] AuthRoute - Stato utente:", user);
  
  if (user) {
    // Se l'utente è autenticato ma non ha verificato l'email
    if (!user.email_verified_at) {
      console.log("[ROUTER] AuthRoute - Email non verificata, redirect a verify-otp");
      return <Navigate to="/verify-otp" />;
    }
    
    // Se l'utente è autenticato ma non ha completato l'onboarding
    if (!user.onboarding_completed) {
      console.log("[ROUTER] AuthRoute - Onboarding non completato, redirect a onboarding");
      return <Navigate to="/onboarding" />;
    }
    
    // Se l'utente è autenticato e ha completato tutto, vai alla dashboard
    console.log("[ROUTER] AuthRoute - Utente autenticato, redirect a dashboard");
    return <Navigate to="/" />;
  }
  
  // Se l'utente non è autenticato, mostra il componente children (login/register)
  console.log("[ROUTER] AuthRoute - Utente non autenticato, mostra login/register");
  return <>{children}</>;
};

// Onboarding Route wrapper component
const OnboardingRoute = ({ children }: { children: React.ReactNode }) => {
  const user = authService.getCurrentUser();
  console.log("[ROUTER] OnboardingRoute - Stato utente:", user);
  
  // If no user is logged in, redirect to sign in
  if (!user) {
    console.log("[ROUTER] OnboardingRoute - Nessun utente, redirect a signin");
    return <Navigate to="/signin" />;
  }
  
  // Se l'utente non ha verificato l'email, reindirizza alla verifica OTP
  if (!user.email_verified_at) {
    console.log("[ROUTER] OnboardingRoute - Email non verificata, redirect a verify-otp");
    return <Navigate to="/verify-otp" />;
  }
  
  // If user has already completed onboarding, redirect to dashboard
  if (user.onboarding_completed) {
    console.log("[ROUTER] OnboardingRoute - Onboarding completato, redirect a dashboard");
    return <Navigate to="/" />;
  }
  
  // User is logged in but has not completed onboarding, show onboarding
  console.log("[ROUTER] OnboardingRoute - Mostra onboarding");
  return <>{children}</>;
};

// OTP Verification Route component
const OTPVerificationRoute = ({ children }: { children: React.ReactNode }) => {
  const user = authService.getCurrentUser();
  
  // Se l'utente ha già verificato l'email, vai all'onboarding (o alla dashboard se completo)
  if (user && user.email_verified_at) {
    console.log("[ROUTER] OTPVerificationRoute - Email già verificata, redirect a onboarding o dashboard");
    if (user.onboarding_completed) {
      return <Navigate to="/" />;
    } else {
      return <Navigate to="/onboarding" />;
    }
  }
  
  // La verifica OTP è accessibile a tutti (sia utenti non loggati che in attesa di verifica)
  return <>{children}</>;
};

export default function App() {
  return (
    <>
      <RoleProvider>
        <Router>
          <ScrollToTop />
          <Routes>
          {/* Auth Layout */}
          <Route
            path="/signin"
            element={
              <AuthRoute>
                <SignIn />
              </AuthRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthRoute>
                <SignUp />
              </AuthRoute>
            }
          />
          <Route
            path="/verify-otp"
            element={
              <OTPVerificationRoute>
                <OTPVerification />
              </OTPVerificationRoute>
            }
          />
          <Route
            path="/onboarding"
            element={
              <OnboardingRoute>
                <Onboarding />
              </OnboardingRoute>
            }
          />
          
          {/* Aggiunta nuovo tipo utente */}
          <Route
            path="/add-user-type"
            element={
              <ProtectedRoute>
                <AddUserTypeOnboarding />
              </ProtectedRoute>
            }
          />
          
          {/* Onboarding dinamico per nuove entità (unica route con query param) */}
          <Route
            path="/onboarding-entity"
            element={
              <ProtectedRoute>
                <OnboardingEntityForm />
              </ProtectedRoute>
            }
          />

          {/* Dashboard Layout */}
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index path="/" element={<Home />} />
            <Route path="/tournaments" element={<TournamentPage />} />
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />
            <Route path="/form-elements" element={<FormElements />} />
            <Route path="/basic-tables" element={<BasicTables />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
            
            {/* Role-specific Dashboard Routes */}
            <Route element={<RoleProtectedRoute allowedRoles={["athlete" as UserRole]} />}>
              <Route path="/dashboard/athlete" element={<AthleteDashboard />} />
            </Route>
            
            <Route element={<RoleProtectedRoute allowedRoles={["guardian" as UserRole]} />}>
              <Route path="/dashboard/guardian" element={<GuardianDashboard />} />
            </Route>
            
            <Route element={<RoleProtectedRoute allowedRoles={["club" as UserRole]} />}>
              <Route path="/dashboard/club" element={<ClubDashboard />} />
            </Route>
            
            <Route element={<RoleProtectedRoute allowedRoles={["committee" as UserRole]} />}>
              <Route path="/dashboard/committee" element={<CommitteeDashboard />} />
            </Route>
            
            <Route element={<RoleProtectedRoute allowedRoles={["federation" as UserRole]} />}>
              <Route path="/dashboard/federation" element={<FederationDashboard />} />
            </Route>
            
            <Route element={<RoleProtectedRoute allowedRoles={["admin" as UserRole]} />}>
              <Route path="/dashboard/admin" element={<AdminDashboard />} />
            </Route>
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Router>
      </RoleProvider>
    </>
  );
}
