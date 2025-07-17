import { useState, useEffect, useCallback } from 'react';
import { authService } from '../services/authService';

interface User {
  id: number;
  name: string;
  email: string;
  profile_image?: string;
  email_verified_at?: string;
  onboarding_completed?: boolean;
  onboarding_step?: number;
  [key: string]: any; // Per altri campi che potrebbero essere presenti
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async (forceRefresh = false) => {
    try {
      setLoading(true);
      setError(null);
      
      // Prima recuperiamo l'utente dal localStorage per una UI reattiva
      const localUser = authService.getCurrentUser();
      if (localUser && !forceRefresh) {
        setUser(localUser);
      }
      
      // Poi recuperiamo i dati aggiornati dal backend
      const response = await authService.me();
      if (response && response.success && response.data) {
        // Aggiorniamo lo stato con i dati freschi dal backend
        setUser(response.data);
        
        // Aggiorniamo anche i dati nel localStorage
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
          const updatedUser = {
            ...currentUser,
            ...response.data,
          };
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
      }
    } catch (err) {
      console.error("Errore nel recupero dei dati utente:", err);
      setError("Impossibile recuperare i dati utente");
      
      // In caso di errore, usiamo comunque i dati locali se disponibili
      const localUser = authService.getCurrentUser();
      if (localUser) {
        setUser(localUser);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Recupera i dati utente al montaggio del componente
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // Funzione per il logout con update dello stato
  const logout = useCallback(async () => {
    try {
      await authService.logout();
      setUser(null);
    } catch (err) {
      console.error("Errore durante il logout:", err);
      setError("Impossibile effettuare il logout");
    }
  }, []);

  return { user, loading, error, fetchUser, logout };
}
