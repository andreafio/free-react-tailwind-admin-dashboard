import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useRole, UserRole } from '../../context/RoleContext';

interface RoleProtectedRouteProps {
  allowedRoles: UserRole[];
  redirectPath?: string;
}

const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({
  allowedRoles,
  redirectPath = '/',
}) => {
  const { isAuthenticated, userRoles, activeRole, isLoading } = useRole();
  const location = useLocation();

  // Se stiamo ancora caricando i dati, mostra un loader
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  // Se l'utente non è autenticato, reindirizza al login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Verifica se l'utente ha uno dei ruoli consentiti
  const hasRequiredRole = allowedRoles.some(role => 
    userRoles.some(userRole => userRole.role === role)
  );

  // Se l'utente non ha il ruolo richiesto, reindirizza
  if (!hasRequiredRole) {
    return <Navigate to={redirectPath} replace />;
  }

  // Verifica se il ruolo attivo è tra quelli consentiti
  const isActiveRoleAllowed = allowedRoles.includes(activeRole);

  // Se il ruolo attivo non è consentito ma l'utente ha un ruolo consentito,
  // reindirizza alla dashboard di quel ruolo
  if (!isActiveRoleAllowed && hasRequiredRole) {
    // Trova il primo ruolo consentito
    const firstAllowedRole = userRoles.find(userRole => 
      allowedRoles.includes(userRole.role)
    );
    
    if (firstAllowedRole) {
      return <Navigate to={`/dashboard/${firstAllowedRole.role}`} replace />;
    }
  }

  // Se tutto è a posto, permetti l'accesso alla route
  return <Outlet />;
};

export default RoleProtectedRoute;
