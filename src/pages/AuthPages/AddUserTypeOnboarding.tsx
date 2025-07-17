import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { roleService, Role } from '../../services/roleService';

const AddUserTypeOnboarding: React.FC = () => {
  const navigate = useNavigate();
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    roleService.getAllRoles()
      .then(setRoles)
      .catch(() => setError('Errore nel recupero dei ruoli'))
      .finally(() => setLoading(false));
  }, []);

  const handleTypeSelect = (type: string) => {
    navigate(`/onboarding-entity?entity=${type}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <div>
          <h1 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white">
            Aggiungi nuovo ruolo
          </h1>
          <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
            Crea un nuovo profilo utente nel sistema
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Scegli il tipo di utente da aggiungere</h2>
          {loading ? (
            <div className="text-center">Caricamento ruoli...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {roles.map((role) => (
                <button
                  key={role.name}
                  onClick={() => handleTypeSelect(role.name)}
                  className="flex flex-col items-center justify-center p-6 border rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <span className="text-4xl mb-2">�️</span>
                  <span className="font-medium">{role.label || role.name.charAt(0).toUpperCase() + role.name.slice(1)}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddUserTypeOnboarding;
