import React from 'react';
import { Card } from '../../../components/ui/card';

const SystemLogsCard: React.FC = () => {
  // Dati di esempio per log
  const logs = [
    { id: 1, action: 'Login', user: 'Mario Rossi', date: '2025-07-16 10:00' },
    { id: 2, action: 'Modifica utente', user: 'Luisa Bianchi', date: '2025-07-16 09:45' },
    { id: 3, action: 'Eliminazione account', user: 'Giuseppe Verdi', date: '2025-07-15 18:30' }
  ];

  return (
    <Card>
      <div className="p-6">
        <h3 className="mb-6 text-xl font-semibold text-gray-800 dark:text-white">Log di Sistema</h3>
        <ul className="space-y-3">
          {logs.map((log) => (
            <li key={log.id} className="flex items-center justify-between p-3 border rounded-lg border-gray-200 dark:border-gray-700">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{log.action}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{log.user}</p>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">{log.date}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 text-right">
          <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Vedi Tutti i Log</button>
        </div>
      </div>
    </Card>
  );
};

export default SystemLogsCard;
