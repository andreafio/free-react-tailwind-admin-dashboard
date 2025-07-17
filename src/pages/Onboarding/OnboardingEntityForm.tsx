import React, { useEffect, useState } from 'react';
import DynamicForm from '../../components/common/DynamicForm';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../../services/authService';
import apiConfig from '../../services/apiConfig';
const { axios } = apiConfig;

// Mappa entity -> endpoint
const entityConfig: Record<string, { schema: string; create: string; dashboard: string; userType: string }> = {
  club: {
    schema: '/v1/club/schema',
    create: '/v1/clubs',
    dashboard: '/dashboard/club',
    userType: 'club',
  },
  committee: {
    schema: '/v1/committee/schema',
    create: '/v1/committees',
    dashboard: '/dashboard/committee',
    userType: 'committee',
  },
  federation: {
    schema: '/v1/federation/schema',
    create: '/v1/federations',
    dashboard: '/dashboard/federation',
    userType: 'federation',
  },
  guardian: {
    schema: '/v1/guardian/schema',
    create: '/v1/guardians',
    dashboard: '/dashboard/guardian',
    userType: 'guardian',
  },
  athlete: {
    schema: '/v1/athlete/schema',
    create: '/v1/athletes',
    dashboard: '/dashboard/athlete',
    userType: 'athlete',
  },
};

const OnboardingEntityForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [schema, setSchema] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // L'entità viene passata come query param: /onboarding-entity?entity=club
  const params = new URLSearchParams(location.search);
  const entity = params.get('entity');
  const config = entity ? entityConfig[entity] : undefined;

  useEffect(() => {
    if (!config) return;
    setLoading(true);
    setError(null);
    axios.get(config.schema)
      .then((res: any) => {
        console.log('Schema response:', res.data);
        setSchema(res.data);
      })
      .catch((err) => {
        console.error('Error fetching schema:', err);
        setError('Errore nel caricamento dello schema');
      })
      .finally(() => setLoading(false));
  }, [entity]);

  const handleSubmit = async (formData: Record<string, any>) => {
    if (!config) return;
    setLoading(true);
    setError(null);
    try {
      await axios.post(config.create, formData);
      await authService.addUserType(config.userType);
      await authService.me(); // refetch user
      navigate(config.dashboard);
    } catch (e) {
      setError('Errore durante la creazione dell\'entità');
    } finally {
      setLoading(false);
    }
  };

  if (!entity || !config) return <div>Entità non valida</div>;
  if (loading) return <div>Caricamento...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!schema) return null;

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Onboarding {entity.charAt(0).toUpperCase() + entity.slice(1)}</h2>
      <DynamicForm schema={schema} onSubmit={handleSubmit} submitLabel="Crea e aggiungi ruolo" />
    </div>
  );
};

export default OnboardingEntityForm;
