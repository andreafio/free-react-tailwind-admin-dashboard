import React from 'react';
import { Card } from '../../../components/ui/card';

const UserManagementCard: React.FC = () => {
  // Dati di esempio per utenti
  const users = [
    { id: 1, name: 'Mario Rossi', role: 'Admin', status: 'active' },
    { id: 2, name: 'Luisa Bianchi', role: 'Manager', status: 'active' },
    { id: 3, name: 'Giuseppe Verdi', role: 'User', status: 'inactive' }
  ];

  return (
    <Card>
      <div className="p-6">
        <h3 className="mb-6 text-xl font-semibold text-gray-800 dark:text-white">Gestione Utenti</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Nome</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Ruolo</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Stato</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Azioni</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-4 py-4 text-sm font-medium text-gray-900 dark:text-white">{user.name}</td>
                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">{user.role}</td>
                  <td className="px-4 py-4 text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>{user.status === 'active' ? 'Attivo' : 'Inattivo'}</span>
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <button className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-3">Modifica</button>
                    <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">Elimina</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-right">
          <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Aggiungi Utente</button>
        </div>
      </div>
    </Card>
  );
};

export default UserManagementCard;
