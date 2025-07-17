import React from 'react';
import { Card } from '../../../components/ui/card';

const CategoriesCard: React.FC = () => {
  // Dati di esempio per categorie
  const categories = [
    { id: 1, name: 'Senior', description: 'Atleti 18+ anni' },
    { id: 2, name: 'Junior', description: 'Atleti 15-17 anni' },
    { id: 3, name: 'Cadetti', description: 'Atleti 12-14 anni' },
    { id: 4, name: 'Esordienti', description: 'Atleti 9-11 anni' }
  ];

  return (
    <Card>
      <div className="p-6">
        <h3 className="mb-6 text-xl font-semibold text-gray-800 dark:text-white">Categorie</h3>
        <ul className="space-y-3">
          {categories.map((cat) => (
            <li key={cat.id} className="flex items-center justify-between p-3 border rounded-lg border-gray-200 dark:border-gray-700">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{cat.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{cat.description}</p>
              </div>
              <button className="px-3 py-1 text-xs font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700">Gestisci</button>
            </li>
          ))}
        </ul>
        <div className="mt-4 text-right">
          <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Aggiungi Categoria</button>
        </div>
      </div>
    </Card>
  );
};

export default CategoriesCard;
