import React from 'react';
import { Card } from '../../../components/ui/card';

const AthleteListCard: React.FC = () => {
  // Dati di esempio per gli atleti
  const athletes = [
    {
      id: 1,
      name: 'Marco Rossi',
      age: 15,
      sport: 'Judo',
      category: 'Cadetti -60kg',
      imageUrl: '/images/athletes/athlete-1.jpg'
    },
    {
      id: 2,
      name: 'Laura Bianchi',
      age: 13,
      sport: 'Karate',
      category: 'Esordienti -45kg',
      imageUrl: '/images/athletes/athlete-2.jpg'
    }
  ];

  return (
    <Card>
      <div className="p-6">
        <h3 className="mb-6 text-xl font-semibold text-gray-800 dark:text-white">
          I Tuoi Atleti
        </h3>
        
        <div className="space-y-4">
          {athletes.map((athlete) => (
            <div 
              key={athlete.id} 
              className="flex items-center p-4 border rounded-lg border-gray-200 dark:border-gray-700"
            >
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {athlete.imageUrl ? (
                    <img 
                      src={athlete.imageUrl} 
                      alt={athlete.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-500 text-xl font-bold">
                      {athlete.name.charAt(0)}
                    </span>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {athlete.name}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {athlete.age} anni - {athlete.sport}, {athlete.category}
                </p>
              </div>
              
              <div className="ml-auto">
                <button className="p-2 text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-right">
          <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Gestisci Atleti
          </button>
        </div>
      </div>
    </Card>
  );
};

export default AthleteListCard;
