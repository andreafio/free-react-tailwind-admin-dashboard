import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRole, UserRole } from '../../context/RoleContext';

interface AddUserTypeProps {
  onSuccess?: () => void;
  className?: string;
}

const AddUserType: React.FC<AddUserTypeProps> = ({ className = '' }) => {
  const { availableRoles } = useRole();
  const navigate = useNavigate();

  // Filtro i tipi di utente disponibili escludendo quelli già associati all'utente
  const availableTypes: UserRole[] = [
    'athlete', 'guardian', 'club', 'committee', 'federation', 'admin'
  ].filter(type => !availableRoles.some(role => role.role === type)) as UserRole[];

  if (availableTypes.length === 0) {
    return null; // Non mostrare nulla se non ci sono tipi disponibili da aggiungere
  }

  const handleClick = () => {
    navigate('/add-user-type');
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={handleClick}
        className="flex items-center text-sm font-medium text-white bg-indigo-600 border border-indigo-600 rounded-md shadow-sm px-4 py-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <span className="mr-2">➕</span> Aggiungi ruolo
      </button>
    </div>
  );
};

export default AddUserType;
