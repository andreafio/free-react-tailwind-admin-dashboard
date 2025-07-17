import React from 'react';
import { Card } from '../../../components/ui/card';

const AccountToolsCard: React.FC = () => {
  return (
    <Card>
      <div className="p-6">
        <h3 className="mb-6 text-xl font-semibold text-gray-800 dark:text-white">Strumenti Account</h3>
        <ul className="space-y-3">
          <li className="flex items-center justify-between p-3 border rounded-lg border-gray-200 dark:border-gray-700">
            <span className="font-medium text-gray-900 dark:text-white">Reset Password Utente</span>
            <button className="px-3 py-1 text-xs font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700">Reset</button>
          </li>
          <li className="flex items-center justify-between p-3 border rounded-lg border-gray-200 dark:border-gray-700">
            <span className="font-medium text-gray-900 dark:text-white">Blocca Account</span>
            <button className="px-3 py-1 text-xs font-medium text-white bg-red-600 rounded hover:bg-red-700">Blocca</button>
          </li>
          <li className="flex items-center justify-between p-3 border rounded-lg border-gray-200 dark:border-gray-700">
            <span className="font-medium text-gray-900 dark:text-white">Sblocca Account</span>
            <button className="px-3 py-1 text-xs font-medium text-white bg-green-600 rounded hover:bg-green-700">Sblocca</button>
          </li>
        </ul>
      </div>
    </Card>
  );
};

export default AccountToolsCard;
