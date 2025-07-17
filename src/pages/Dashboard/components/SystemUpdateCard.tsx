import React from 'react';
import { Card } from '../../../components/ui/card';

const SystemUpdateCard: React.FC = () => {
  return (
    <Card>
      <div className="p-6">
        <h3 className="mb-6 text-xl font-semibold text-gray-800 dark:text-white">Aggiornamenti di Sistema</h3>
        <ul className="space-y-3">
          <li className="flex items-center justify-between p-3 border rounded-lg border-gray-200 dark:border-gray-700">
            <span className="font-medium text-gray-900 dark:text-white">Versione attuale</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">2.0.2</span>
          </li>
          <li className="flex items-center justify-between p-3 border rounded-lg border-gray-200 dark:border-gray-700">
            <span className="font-medium text-gray-900 dark:text-white">Ultimo aggiornamento</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">16/07/2025</span>
          </li>
          <li className="flex items-center justify-between p-3 border rounded-lg border-gray-200 dark:border-gray-700">
            <span className="font-medium text-gray-900 dark:text-white">Stato sistema</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500">Online</span>
          </li>
        </ul>
        <div className="mt-4 text-right">
          <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Verifica Aggiornamenti</button>
        </div>
      </div>
    </Card>
  );
};

export default SystemUpdateCard;
