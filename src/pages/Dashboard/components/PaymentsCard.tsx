import React from 'react';
import { Card } from '../../../components/ui/card';

const PaymentsCard: React.FC = () => {
  // Dati di esempio per pagamenti
  const payments = [
    {
      id: 1,
      eventName: 'Campionato Regionale Judo',
      amount: 50.00,
      date: '2025-07-28',
      status: 'paid'
    },
    {
      id: 2,
      eventName: 'Torneo Nazionale Karate',
      amount: 75.00,
      date: '2025-08-10',
      status: 'pending'
    }
  ];

  return (
    <Card>
      <div className="p-6">
        <h3 className="mb-6 text-xl font-semibold text-gray-800 dark:text-white">
          Pagamenti
        </h3>
        
        <div className="space-y-4">
          {payments.map((payment) => (
            <div 
              key={payment.id} 
              className="flex items-center justify-between p-4 border rounded-lg border-gray-200 dark:border-gray-700"
            >
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {payment.eventName}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(payment.date).toLocaleDateString()}
                </p>
              </div>
              
              <div className="text-right">
                <p className="font-medium text-gray-900 dark:text-white">
                  €{payment.amount.toFixed(2)}
                </p>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                  ${payment.status === 'paid' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500' 
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500'}`
                }>
                  {payment.status === 'paid' ? 'Pagato' : 'In attesa'}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-right">
          <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Gestisci Pagamenti
          </button>
        </div>
      </div>
    </Card>
  );
};

export default PaymentsCard;
