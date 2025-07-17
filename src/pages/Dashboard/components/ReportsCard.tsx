import React from 'react';
import { Card } from '../../../components/ui/card';

const ReportsCard: React.FC = () => {
  // Dati di esempio per report
  const reports = [
    { id: 1, title: 'Report Attività 2025', date: '2025-07-01', status: 'completato' },
    { id: 2, title: 'Report Gare Giugno', date: '2025-06-30', status: 'in revisione' },
    { id: 3, title: 'Report Tesseramenti', date: '2025-06-15', status: 'completato' }
  ];

  return (
    <Card>
      <div className="p-6">
        <h3 className="mb-6 text-xl font-semibold text-gray-800 dark:text-white">Report</h3>
        <ul className="space-y-3">
          {reports.map((report) => (
            <li key={report.id} className="flex items-center justify-between p-3 border rounded-lg border-gray-200 dark:border-gray-700">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{report.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(report.date).toLocaleDateString()}</p>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${report.status === 'completato' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500'}`}>{report.status}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 text-right">
          <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Scarica Report</button>
        </div>
      </div>
    </Card>
  );
};

export default ReportsCard;
