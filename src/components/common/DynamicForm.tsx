import React, { useState } from 'react';

interface SchemaField {
  type: string;
  label: string;
  required?: boolean;
}

interface DynamicFormProps {
  schema: Record<string, SchemaField>;
  onSubmit: (data: Record<string, any>) => void;
  submitLabel?: string;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ schema, onSubmit, submitLabel = 'Invia' }) => {
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.entries(schema).map(([field, config]) => (
        <div key={field} className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            {config.label}
            {config.required && <span className="text-red-500">*</span>}
          </label>
          <input
            type={config.type === 'string' ? 'text' : config.type}
            required={config.required}
            value={formData[field] || ''}
            onChange={(e) => handleChange(field, e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
      ))}
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        {submitLabel}
      </button>
    </form>
  );
};

export default DynamicForm;
