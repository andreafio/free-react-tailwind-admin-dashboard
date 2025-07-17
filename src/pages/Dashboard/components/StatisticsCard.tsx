import React from 'react';
import { Card } from '../../../components/ui/card';

const StatisticsCard: React.FC = () => {
  // Dati di esempio per statistiche
  const statistics = [
    {
      id: 1,
      title: 'Società Affiliate',
      value: 42,
      change: '+5%',
      trend: 'up'
    },
    {
      id: 2,
      title: 'Atleti Tesserati',
      value: 1284,
      change: '+12%',
      trend: 'up'
    },
    {
      id: 3,
      title: 'Eventi Organizzati',
      value: 18,
      change: '+3%',
      trend: 'up'
    },
    {
      id: 4,
      title: 'Categorie Attive',
      value: 24,
      change: '0%',
      trend: 'stable'
    }
  ];

  return (
    <Card>
      <div className="p-6">
        <h3 className="mb-6 text-xl font-semibold text-gray-800 dark:text-white">
          Statistiche Comitato
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          {statistics.map((stat) => (
            <div 
              key={stat.id} 
              className="p-4 border rounded-lg border-gray-200 dark:border-gray-700"
            >
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {stat.title}
              </p>
              <div className="flex items-baseline mt-1">
                <h4 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {stat.value}
                </h4>
                <span className={`ml-2 text-sm font-medium ${
                  stat.trend === 'up' 
                    ? 'text-green-600 dark:text-green-500' 
                    : stat.trend === 'down'
                      ? 'text-red-600 dark:text-red-500'
                      : 'text-gray-600 dark:text-gray-400'
                }`}>
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-right">
          <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Rapporto Completo
          </button>
        </div>
      </div>
    </Card>
  );
};

export default StatisticsCard;
