import React from 'react';
import { Card } from '../../../components/ui/card';

const ProfileSettingsCard: React.FC = () => {
  return (
    <Card>
      <div className="p-6">
        <h3 className="mb-6 text-xl font-semibold text-gray-800 dark:text-white">
          Impostazioni Profilo
        </h3>
        
        <div className="space-y-4">
          <button className="flex items-center w-full p-3 text-left transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mr-3 text-indigo-500 bg-indigo-100 rounded-full dark:bg-indigo-900/30">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                Informazioni Società
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Gestisci i dati della società sportiva
              </p>
            </div>
          </button>
          
          <button className="flex items-center w-full p-3 text-left transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mr-3 text-green-500 bg-green-100 rounded-full dark:bg-green-900/30">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                Orari e Disponibilità
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Gestisci orari di allenamento e disponibilità
              </p>
            </div>
          </button>
          
          <button className="flex items-center w-full p-3 text-left transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mr-3 text-purple-500 bg-purple-100 rounded-full dark:bg-purple-900/30">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                Sicurezza e Accesso
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Gestisci password e impostazioni di sicurezza
              </p>
            </div>
          </button>
          
          <button className="flex items-center w-full p-3 text-left transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mr-3 text-amber-500 bg-amber-100 rounded-full dark:bg-amber-900/30">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                Preferenze Notifiche
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Personalizza notifiche ed email
              </p>
            </div>
          </button>
        </div>
      </div>
    </Card>
  );
};

export default ProfileSettingsCard;
