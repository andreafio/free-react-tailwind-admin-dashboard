import React from 'react';
import { Card } from '../../../components/ui/card';

const RegulationsCard: React.FC = () => {
  // Dati di esempio per regolamenti
  const regulations = [
    {
      id: 1,
      title: 'Regolamento Tornei Regionali 2025',
      category: 'Competizioni',
      updatedAt: '2025-06-10',
      status: 'active'
    },
    {
      id: 2,
      title: 'Linee Guida Arbitraggio',
      category: 'Arbitraggio',
      updatedAt: '2025-05-22',
      status: 'active'
    },
    {
      id: 3,
      title: 'Normativa Anti-Doping',
      category: 'Medico',
      updatedAt: '2025-04-15',
      status: 'active'
    },
    {
      id: 4,
      title: 'Protocollo COVID-19',
      category: 'Sicurezza',
      updatedAt: '2025-07-01',
      status: 'active'
    },
    {
      id: 5,
      title: 'Regolamento Disciplinare',
      category: 'Disciplinare',
      updatedAt: '2025-01-20',
      status: 'revision'
    }
  ];

  return (
    <Card>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            Regolamenti e Normative
          </h3>
          
          <div className="flex items-center space-x-2">
            <select className="py-1 pl-3 pr-10 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
              <option value="all">Tutte le categorie</option>
              <option value="competitions">Competizioni</option>
              <option value="referee">Arbitraggio</option>
              <option value="medical">Medico</option>
              <option value="safety">Sicurezza</option>
              <option value="disciplinary">Disciplinare</option>
            </select>
            
            <div className="relative">
              <input
                type="text"
                placeholder="Cerca regolamento..."
                className="py-1 pl-8 pr-4 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Titolo
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Categoria
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Ultimo Aggiornamento
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
              {regulations.map((regulation) => (
                <tr key={regulation.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-4 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    {regulation.title}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {regulation.category}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {new Date(regulation.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${regulation.status === 'active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500' 
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-500'}`
                    }>
                      {regulation.status === 'active' ? 'Attivo' : 'In Revisione'}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <div className="flex space-x-2">
                      <button className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">
                        Visualizza
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300">
                        Modifica
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Mostrando 5 di 12 regolamenti
          </div>
          
          <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Nuovo Regolamento
          </button>
        </div>
      </div>
    </Card>
  );
};

export default RegulationsCard;
