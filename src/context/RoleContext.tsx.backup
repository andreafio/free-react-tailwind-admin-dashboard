import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService";
import apiConfig from "../services/apiConfig";
const { axios } = apiConfig;

// Definizione dei tipi di ruolo possibili
export type UserRole = 
  | "athlete" 
  | "guardian" 
  | "club" 
  | "committee" 
  | "federation" 
  | "admin";

interface UserRoleInfo {
  role: UserRole;
  label: string;
  dashboardUrl: string;
}

interface RoleContextType {
  availableRoles: UserRoleInfo[];
  activeRole: UserRole;
  userRoles: UserRoleInfo[];
  setActiveRole: (role: UserRoleInfo) => void;
  isRoleAvailable: (roleName: UserRole) => boolean;
  addNewUserType: (userType: UserRole) => Promise<boolean>;
  refreshRoles: () => Promise<void>;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const defaultRoleLabels: Record<UserRole, string> = {
  athlete: "Atleta",
  guardian: "Tutore",
  club: "Società Sportiva",
  committee: "Comitato",
  federation: "Federazione",
  admin: "Amministratore"
};

const defaultDashboardUrls: Record<UserRole, string> = {
  athlete: "/dashboard/athlete",
  guardian: "/dashboard/guardian",
  club: "/dashboard/club",
  committee: "/dashboard/committee",
  federation: "/dashboard/federation",
  admin: "/dashboard/admin"
};

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
};

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [availableRoles, setAvailableRoles] = useState<UserRoleInfo[]>([]);
  const [activeRole, setActiveRole] = useState<UserRole>("athlete");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Funzione per recuperare i ruoli dal backend
  const fetchRoles = async () => {
    setIsLoading(true);
    try {
      // Prima prova a ottenere i ruoli direttamente dall'endpoint roles
      try {
        const rolesResponse = await axios.get('/v1/roles');
        if (rolesResponse.data && Array.isArray(rolesResponse.data)) {
          console.log('[RoleProvider] /roles response:', rolesResponse.data);
          
          // Mappatura dei ruoli alle informazioni complete
          const userRoles: UserRoleInfo[] = rolesResponse.data.map((role: any) => ({
            role: role.name as UserRole,
            label: defaultRoleLabels[role.name as UserRole] || role.name,
            dashboardUrl: defaultDashboardUrls[role.name as UserRole] || "/"
          }));
          
          setAvailableRoles(userRoles);
          setIsAuthenticated(true);
          
          // Se ci sono ruoli disponibili e nessun ruolo attivo, imposta il primo
          if (userRoles.length > 0) {
            setActiveRole(userRoles[0].role);
          }
          return;
        }
      } catch (error) {
        console.warn('[RoleProvider] Errore nel recupero dei ruoli dall\'endpoint /v1/roles, provo con /me');
      }
      
      // Fallback: se /roles non funziona, usa /me
      const response = await authService.me();
      console.log('[RoleProvider] /me response:', response);
      
      // Estrai l'utente dalla risposta API
      const user = response.data || response.user || response;
      
      if (user && user.roles && Array.isArray(user.roles)) {
        // Mappatura dei ruoli alle informazioni complete
        const userRoles: UserRoleInfo[] = user.roles.map((role: any) => ({
          role: role.name as UserRole,
          label: defaultRoleLabels[role.name as UserRole] || role.name,
          dashboardUrl: defaultDashboardUrls[role.name as UserRole] || "/"
        }));
        
        setAvailableRoles(userRoles);
        setIsAuthenticated(true);
        
        // Se ci sono ruoli disponibili e nessun ruolo attivo, imposta il primo
        if (userRoles.length > 0) {
          setActiveRole(userRoles[0].role);
        }
      } else {
        console.warn('[RoleProvider] Nessun ruolo trovato nell\'utente:', user);
        setAvailableRoles([]);
        setIsAuthenticated(!!user); // Se c'è un utente ma non ha ruoli, è comunque autenticato
      }
    } catch (error) {
      console.error('[RoleProvider] Errore nel recupero dei ruoli dal backend:', error);
      setAvailableRoles([]);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Carica i ruoli all'avvio dell'app
  useEffect(() => {
    fetchRoles();
  }, []);

  // Aggiungi un nuovo tipo utente
  const addNewUserType = async (userType: UserRole): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Endpoint per aggiungere un nuovo tipo utente
      const response = await authService.addUserType(userType);
      
      if (response && response.success) {
        // Ricarica i ruoli dopo l'aggiunta
        await fetchRoles();
        return true;
      }
      return false;
    } catch (error) {
      console.error('[RoleProvider] Errore nell\'aggiunta del nuovo tipo utente:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const isRoleAvailable = (roleName: UserRole): boolean => {
    return availableRoles.some(role => role.role === roleName);
  };

  const handleSetActiveRole = (role: UserRoleInfo) => {
    setActiveRole(role.role);
    // Notifica il cambio ruolo (opzionale)
    // authService.setActiveRole(role.role);
  };

  return (
    <RoleContext.Provider
      value={{
        availableRoles,
        activeRole,
        userRoles: availableRoles,
        setActiveRole: handleSetActiveRole,
        isRoleAvailable,
        addNewUserType,
        refreshRoles: fetchRoles,
        isLoading,
        isAuthenticated
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};
