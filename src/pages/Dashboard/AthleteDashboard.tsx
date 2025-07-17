import React from 'react';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';
import PageMeta from '../../components/common/PageMeta';
import { Card } from '../../components/ui/card';
import EventsCard from './components/EventsCard';
import RegistrationsCard from './components/RegistrationsCard';
import PaymentsCard from './components/PaymentsCard';
import DocumentsCard from './components/DocumentsCard';
import QRCodeCard from './components/QRCodeCard';
import ResultsCard from './components/ResultsCard';

const AthleteDashboard: React.FC = () => {
  return (
    <>
      <PageMeta
        title="Dashboard Atleta | SportApp"
        description="Dashboard personale dell'atleta con eventi, iscrizioni e risultati"
      />
      <PageBreadcrumb pageTitle="Dashboard Atleta" />
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {/* Prima riga */}
        <div className="col-span-1 lg:col-span-2 xl:col-span-3">
          <EventsCard />
        </div>
        
        {/* Seconda riga */}
        <div className="col-span-1">
          <RegistrationsCard />
        </div>
        
        <div className="col-span-1">
          <PaymentsCard />
        </div>
        
        <div className="col-span-1">
          <DocumentsCard />
        </div>
        
        {/* Terza riga */}
        <div className="col-span-1">
          <QRCodeCard />
        </div>
        
        <div className="col-span-1 lg:col-span-2">
          <ResultsCard />
        </div>
      </div>
    </>
  );
};

export default AthleteDashboard;
