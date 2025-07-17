import React from 'react';
import { Card } from '../../../components/ui/card';

const DocumentsCard: React.FC = () => {
  // Dati di esempio per documenti
  const documents = [
    {
      id: 1,
      name: 'Certificato Medico',
      expiryDate: '2025-12-31',
      status: 'valid'
    },
    {
      id: 2,
      name: 'Tessera Federazione',
      expiryDate: '2025-09-15',
      status: 'expiring'
    },
    {
      id: 3,
      name: 'Liberatoria Privacy',
      expiryDate: '',
      status: 'valid'
    }
  ];

  return (
    <Card>
      <div className="p-6">
        <h3 className="mb-6 text-xl font-semibold text-gray-800 dark:text-white">
          Documenti
        </h3>
        
        <div className="space-y-3">
          {documents.map((doc) => (
            <div 
              key={doc.id} 
              className="flex items-center justify-between p-3 border rounded-lg border-gray-200 dark:border-gray-700"
            >
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {doc.name}
                </h4>
                {doc.expiryDate && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Scadenza: {new Date(doc.expiryDate).toLocaleDateString()}
                  </p>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                  ${doc.status === 'valid' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500' 
                    : doc.status === 'expiring'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500'}`
                }>
                  {doc.status === 'valid' 
                    ? 'Valido' 
                    : doc.status === 'expiring'
                      ? 'In scadenza'
                      : 'Scaduto'}
                </span>
                
                <button className="p-1 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-right">
          <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Carica Documento
          </button>
        </div>
      </div>
    </Card>
  );
};

export default DocumentsCard;
