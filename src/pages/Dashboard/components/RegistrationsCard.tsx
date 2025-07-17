import React from 'react';
import { Card } from '../../../components/ui/card';

const RegistrationsCard: React.FC = () => {
  // Dati di esempio per iscrizioni
  const registrations = [
    {
      id: 1,
      eventTitle: 'Campionato Regionale Judo',
      date: '2025-08-15',
      status: 'confirmed',
      checkIn: false
    },
    {
      id: 2,
      eventTitle: 'Gara di Jiu-Jitsu',
      date: '2025-07-28',
      status: 'pending',
      checkIn: false
    },
    {
      id: 3,
      eventTitle: 'Torneo Locale Karate',
      date: '2025-06-20',
      status: 'confirmed',
      checkIn: true
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500">
            Confermata
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500">
            In attesa
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-500">
            Sconosciuto
          </span>
        );
    }
  };

  return (
    <Card>
      <div className="p-6">
        <h3 className="mb-6 text-xl font-semibold text-gray-800 dark:text-white">
          Iscrizioni Attive
        </h3>
        
        <div className="space-y-4">
          {registrations.map((registration) => (
            <div key={registration.id} className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h4 className="text-base font-medium text-gray-900 dark:text-white">
                  {registration.eventTitle}
                </h4>
                {getStatusBadge(registration.status)}
              </div>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {new Date(registration.date).toLocaleDateString()}
              </p>
              <div className="mt-3 flex items-center">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Check-in:</span>
                <span className="ml-2">
                  {registration.checkIn ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500">
                      Completato
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-500">
                      Non effettuato
                    </span>
                  )}
                </span>
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

export default RegistrationsCard;
