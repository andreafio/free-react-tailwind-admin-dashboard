import React from 'react';
import { Card } from '../../../components/ui/card';

const ResultsCard: React.FC = () => {
  // Dati di esempio per risultati
  const results = [
    {
      id: 1,
      eventName: 'Campionato Regionale Judo',
      date: '2025-06-15',
      category: 'Senior -73kg',
      position: 1,
      score: '2 Ippon'
    },
    {
      id: 2,
      eventName: 'Torneo Città di Roma',
      date: '2025-05-20',
      category: 'Senior -73kg',
      position: 3,
      score: '1 Ippon, 1 Waza-ari'
    },
    {
      id: 3,
      eventName: 'Coppa Italia',
      date: '2025-04-10',
      category: 'Senior -73kg',
      position: 5,
      score: 'Eliminato ai quarti'
    }
  ];

  return (
    <Card>
      <div className="p-6">
        <h3 className="mb-6 text-xl font-semibold text-gray-800 dark:text-white">
          Risultati Recenti
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Evento
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Data
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Categoria
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Posizione
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Dettagli
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {results.map((result) => (
                <tr key={result.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-4 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    {result.eventName}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {new Date(result.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {result.category}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${result.position === 1 
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500' 
                        : result.position === 2
                          ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                          : result.position === 3
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-500'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500'}`
                    }>
                      {result.position === 1 
                        ? '1° Oro' 
                        : result.position === 2
                          ? '2° Argento'
                          : result.position === 3
                            ? '3° Bronzo'
                            : `${result.position}° posto`}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {result.score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 text-right">
          <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Vedi Tutti i Risultati
          </button>
        </div>
      </div>
    </Card>
  );
};

export default ResultsCard;
