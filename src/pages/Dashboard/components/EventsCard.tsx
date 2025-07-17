import React from 'react';
import { Card } from '../../../components/ui/card';

const EventsCard: React.FC = () => {
  // Dati di esempio per eventi
  const events = [
    {
      id: 1,
      title: 'Campionato Regionale Judo',
      date: '2025-08-15',
      location: 'Roma',
      status: 'open',
      isSelected: true
    },
    {
      id: 2,
      title: 'Torneo Nazionale Karate',
      date: '2025-09-05',
      location: 'Milano',
      status: 'open',
      isSelected: false
    },
    {
      id: 3,
      title: 'Gara di Jiu-Jitsu',
      date: '2025-07-28',
      location: 'Napoli',
      status: 'upcoming',
      isSelected: true
    }
  ];

  return (
    <Card>
      <div className="p-6">
        <h3 className="mb-6 text-xl font-semibold text-gray-800 dark:text-white">
          Eventi Disponibili
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
                  Luogo
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Stato
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Selezionato
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {events.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-4 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    {event.title}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {new Date(event.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {event.location}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${event.status === 'open' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500' 
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500'}`
                    }>
                      {event.status === 'open' ? 'Aperto' : 'Prossimo'}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm">
                    {event.isSelected && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-500">
                        Selezionato
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 text-right">
          <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Vedi Tutti
          </button>
        </div>
      </div>
    </Card>
  );
};

export default EventsCard;
