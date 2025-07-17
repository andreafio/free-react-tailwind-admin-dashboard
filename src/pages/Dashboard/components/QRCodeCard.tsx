import React from 'react';
import { Card } from '../../../components/ui/card';

const QRCodeCard: React.FC = () => {
  return (
    <Card>
      <div className="p-6 text-center">
        <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
          QR Code Personale
        </h3>
        
        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
          Usa questo QR code per accedere rapidamente agli eventi e confermare la tua identità
        </p>
        
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-white rounded-lg">
            {/* Placeholder for QR code image */}
            <div className="w-40 h-40 mx-auto bg-gray-200 border border-gray-300 flex items-center justify-center">
              <span className="text-gray-500">QR Code</span>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Scarica QR Code
          </button>
        </div>
      </div>
    </Card>
  );
};

export default QRCodeCard;
