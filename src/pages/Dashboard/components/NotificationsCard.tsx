import React from 'react';
import { Card } from '../../../components/ui/card';

const NotificationsCard: React.FC = () => {
  // Dati di esempio per notifiche
  const notifications = [
    {
      id: 1,
      title: 'Iscrizione confermata',
      message: 'Iscrizione di Marco Rossi al Campionato Regionale Judo confermata',
      date: '2025-07-15',
      read: false,
      type: 'info'
    },
    {
      id: 2,
      title: 'Pagamento richiesto',
      message: 'È richiesto il pagamento per l\'iscrizione di Laura Bianchi al Torneo Nazionale Karate',
      date: '2025-07-14',
      read: false,
      type: 'warning'
    },
    {
      id: 3,
      title: 'Documento in scadenza',
      message: 'Il certificato medico di Laura Bianchi scadrà tra 15 giorni',
      date: '2025-07-10',
      read: true,
      type: 'alert'
    }
  ];

  return (
    <Card>
      <div className="p-6">
        <h3 className="mb-6 text-xl font-semibold text-gray-800 dark:text-white">
          Notifiche
        </h3>
        
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`p-4 border rounded-lg ${notification.read 
                ? 'border-gray-200 dark:border-gray-700' 
                : 'border-indigo-300 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/20'}`}
            >
              <div className="flex items-center justify-between">
                <h4 className={`font-medium ${notification.read 
                  ? 'text-gray-900 dark:text-white' 
                  : 'text-indigo-700 dark:text-indigo-400'}`}>
                  {notification.title}
                </h4>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(notification.date).toLocaleDateString()}
                </span>
              </div>
              
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                {notification.message}
              </p>
              
              <div className="mt-2 flex justify-end">
                {!notification.read && (
                  <button className="text-xs text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
                    Segna come letto
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-right">
          <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Vedi Tutte
          </button>
        </div>
      </div>
    </Card>
  );
};

export default NotificationsCard;
