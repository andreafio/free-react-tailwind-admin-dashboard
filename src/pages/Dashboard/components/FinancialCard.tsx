import React from 'react';
import { Card } from '../../../components/ui/card';

const FinancialCard: React.FC = () => {
  // Dati di esempio per finanze
  const finances = {
    totalBudget: 25000,
    spent: 12350,
    remaining: 12650,
    categories: [
      {
        name: 'Eventi',
        amount: 7500,
        percentage: 30
      },
      {
        name: 'Rimborsi',
        amount: 3200,
        percentage: 12.8
      },
      {
        name: 'Materiali',
        amount: 1650,
        percentage: 6.6
      }
    ]
  };

  return (
    <Card>
      <div className="p-6">
        <h3 className="mb-6 text-xl font-semibold text-gray-800 dark:text-white">
          Finanze
        </h3>
        
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Budget Totale
            </p>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              €{finances.totalBudget.toLocaleString()}
            </p>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div 
              className="bg-indigo-600 h-2.5 rounded-full" 
              style={{ width: `${(finances.spent / finances.totalBudget) * 100}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between mt-2">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Speso: €{finances.spent.toLocaleString()} 
              ({((finances.spent / finances.totalBudget) * 100).toFixed(1)}%)
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Rimanente: €{finances.remaining.toLocaleString()}
            </p>
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Principali Categorie di Spesa
          </h4>
          
          {finances.categories.map((category, index) => (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {category.name}
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  €{category.amount.toLocaleString()} ({category.percentage}%)
                </p>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                <div 
                  className={`h-1.5 rounded-full ${
                    index === 0 
                      ? 'bg-blue-500' 
                      : index === 1 
                        ? 'bg-green-500' 
                        : 'bg-yellow-500'
                  }`} 
                  style={{ width: `${category.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-right">
          <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Rapporto Finanziario
          </button>
        </div>
      </div>
    </Card>
  );
};

export default FinancialCard;
