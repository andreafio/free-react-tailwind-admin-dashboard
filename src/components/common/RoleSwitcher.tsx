import React, { useState } from 'react';
import AddUserType from './AddUserType';
import { useRole, UserRole } from '../../context/RoleContext';
import { ChevronDownIcon } from '../../icons';
import { useNavigate } from 'react-router-dom';

interface RoleSwitcherProps {
  className?: string;
}

// Mappatura delle icone/colori per i ruoli
const roleConfig: Record<UserRole, { icon: string; bgColor: string }> = {
  athlete: { 
    icon: '🏃', 
    bgColor: 'bg-blue-100 dark:bg-blue-900/30' 
  },
  guardian: { 
    icon: '👨‍👧', 
    bgColor: 'bg-purple-100 dark:bg-purple-900/30' 
  },
  club: { 
    icon: '🏢', 
    bgColor: 'bg-green-100 dark:bg-green-900/30' 
  },
  committee: { 
    icon: '🏛️', 
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/30' 
  },
  federation: { 
    icon: '🏆', 
    bgColor: 'bg-red-100 dark:bg-red-900/30' 
  },
  admin: { 
    icon: '⚙️', 
    bgColor: 'bg-gray-100 dark:bg-gray-900/30' 
  }
};


const RoleSwitcher: React.FC<RoleSwitcherProps> = ({ className = '' }) => {
  const { availableRoles, activeRole, setActiveRole } = useRole();
  const navigate = useNavigate();
  // Trova l'oggetto info del ruolo attivo
  const activeRoleInfo = availableRoles.find(r => r.role === activeRole);
  const [isOpen, setIsOpen] = useState(false);

  // DEBUG: Mostra i ruoli disponibili e il ruolo attivo
  console.log('[RoleSwitcher] availableRoles:', availableRoles);
  console.log('[RoleSwitcher] activeRole:', activeRole);

  // Mostra sempre il selettore dei ruoli, ma solo i ruoli assegnati all'utente

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleRoleSelect = (role: typeof availableRoles[0]) => {
    setActiveRole(role);
    setIsOpen(false);
    // Cambia dashboard in base al ruolo selezionato
    if (role.dashboardUrl) {
      navigate(role.dashboardUrl);
    }
  };

  return (
    <div className={`relative flex items-center gap-2 ${className}`}>
      <div className="w-auto">
        <button
          onClick={toggleDropdown}
          className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          {activeRoleInfo && (
            <div className="flex items-center">
              <span className={`flex items-center justify-center w-8 h-8 mr-2 rounded-full text-base ${roleConfig[activeRoleInfo.role]?.bgColor || 'bg-gray-100'}`}>
                {roleConfig[activeRoleInfo.role]?.icon || '👤'}
              </span>
              <span>{activeRoleInfo.label}</span>
            </div>
          )}
          <ChevronDownIcon className="w-5 h-5 ml-2" />
        </button>

        {isOpen && (
          <div className="absolute right-0 z-10 w-full mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 dark:ring-gray-700">
            <div className="py-1">
              {/* Mostra solo i ruoli assegnati all'utente */}
              {availableRoles.map((role) => (
                <button
                  key={role.role}
                  onClick={() => handleRoleSelect(role)}
                  className={`flex items-center w-full px-4 py-2 text-sm text-left ${
                    activeRole === role.role
                      ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                  }`}
                >
                  <span className={`flex items-center justify-center w-8 h-8 mr-2 rounded-full text-base ${roleConfig[role.role]?.bgColor || 'bg-gray-100'}`}>
                    {roleConfig[role.role]?.icon || '👤'}
                  </span>
                  {role.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Pulsante aggiungi ruolo sempre visibile */}
      <div className="w-auto">
        <AddUserType />
      </div>
    </div>
  );
};

export default RoleSwitcher;
