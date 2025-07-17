import React from 'react';
import { Card } from '../../../components/ui/card';

const RefereesCard: React.FC = () => {
  // Dati di esempio per arbitri
  const referees = [
    {
      id: 1,
      name: 'Mario Bianchi',
      level: 'Nazionale',
      specialization: 'Judo',
      availability: 'available',
      imageUrl: '/images/referees/referee-1.jpg'
    },
    {
      id: 2,
      name: 'Luisa Verdi',
      level: 'Regionale',
      specialization: 'Karate',
      availability: 'available',
      imageUrl: '/images/referees/referee-2.jpg'
    },
    {
      id: 3,
      name: 'Roberto Neri',
      level: 'Nazionale',
      specialization: 'Jiu-Jitsu',
      availability: 'unavailable',
      imageUrl: '/images/referees/referee-3.jpg'
    },
    {
      id: 4,
      name: 'Carla Rossi',
      level: 'Regionale',
      specialization: 'Judo',
      availability: 'busy',
      imageUrl: '/images/referees/referee-4.jpg'
    }
  ];

  return (
    <Card>
      <div className="p-6">
        <h3 className="mb-6 text-xl font-semibold text-gray-800 dark:text-white">
          Arbitri
        </h3>
        
        <div className="space-y-4">
          {referees.map((referee) => (
            <div 
              key={referee.id} 
              className="flex items-center p-3 border rounded-lg border-gray-200 dark:border-gray-700"
            >
              <div className="flex-shrink-0 mr-3">
                <div className="relative w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {referee.imageUrl ? (
                    <img 
                      src={referee.imageUrl} 
                      alt={referee.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-500 font-bold">
                      {referee.name.charAt(0)}
                    </span>
                  )}
                  <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white
                    ${referee.availability === 'available' 
                      ? 'bg-green-500' 
                      : referee.availability === 'busy'
                        ? 'bg-yellow-500'
                        : 'bg-red-500'}`
                  }></div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {referee.name}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {referee.level} • {referee.specialization}
                </p>
              </div>
              
              <div className="ml-auto">
                <button className="p-1 text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-right">
          <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Gestisci Arbitri
          </button>
        </div>
      </div>
    </Card>
  );
};

export default RefereesCard;
