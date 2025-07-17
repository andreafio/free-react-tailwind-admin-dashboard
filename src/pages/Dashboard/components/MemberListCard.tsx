import React from 'react';
import { Card } from '../../../components/ui/card';

const MemberListCard: React.FC = () => {
  // Dati di esempio per membri del club
  const members = [
    {
      id: 1,
      name: 'Marco Rossi',
      age: 18,
      category: 'Senior -73kg',
      role: 'athlete',
      status: 'active',
      imageUrl: '/images/members/member-1.jpg'
    },
    {
      id: 2,
      name: 'Laura Bianchi',
      age: 16,
      category: 'Junior -52kg',
      role: 'athlete',
      status: 'active',
      imageUrl: '/images/members/member-2.jpg'
    },
    {
      id: 3,
      name: 'Giuseppe Verdi',
      age: 45,
      category: '',
      role: 'coach',
      status: 'active',
      imageUrl: '/images/members/member-3.jpg'
    },
    {
      id: 4,
      name: 'Anna Neri',
      age: 13,
      category: 'Esordienti -48kg',
      role: 'athlete',
      status: 'inactive',
      imageUrl: '/images/members/member-4.jpg'
    }
  ];

  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            Membri della Società
          </h3>
          
          <div className="flex items-center space-x-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Cerca membro..."
                className="py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
            
            <select className="py-2 pl-3 pr-10 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
              <option value="all">Tutti</option>
              <option value="athlete">Atleti</option>
              <option value="coach">Allenatori</option>
              <option value="staff">Staff</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Nome
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Età
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Ruolo
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Categoria
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Stato
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Azioni
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {members.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-4 py-4 text-sm">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-8 h-8 mr-3">
                        <div className="rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                          {member.imageUrl ? (
                            <img 
                              src={member.imageUrl} 
                              alt={member.name} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-gray-500 font-bold">
                              {member.name.charAt(0)}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {member.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {member.age}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {member.role === 'athlete' ? 'Atleta' : 
                     member.role === 'coach' ? 'Allenatore' : 'Staff'}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {member.category || '-'}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${member.status === 'active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500' 
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`
                    }>
                      {member.status === 'active' ? 'Attivo' : 'Inattivo'}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <button className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-3">
                      Modifica
                    </button>
                    <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                      Elimina
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Mostrando 4 di 28 membri
          </div>
          
          <div className="flex">
            <button className="px-4 py-2 text-sm font-medium text-indigo-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-indigo-400">
              Precedente
            </button>
            <button className="px-4 py-2 ml-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Successivo
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MemberListCard;
