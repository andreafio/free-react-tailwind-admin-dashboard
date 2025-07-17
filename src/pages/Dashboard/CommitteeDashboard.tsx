import React from 'react';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';
import PageMeta from '../../components/common/PageMeta';
import EventsCard from './components/EventsCard';
import StatisticsCard from './components/StatisticsCard';
import RefereesCard from './components/RefereesCard';
import FinancialCard from './components/FinancialCard';
import RegulationsCard from './components/RegulationsCard';

const CommitteeDashboard: React.FC = () => {
  return (
    <>
      <PageMeta
        title="Dashboard Comitato | SportApp"
        description="Dashboard per comitati regionali e provinciali"
      />
      <PageBreadcrumb pageTitle="Dashboard Comitato" />
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {/* Prima riga */}
        <div className="col-span-1 lg:col-span-2 xl:col-span-3">
          <EventsCard />
        </div>
        
        {/* Seconda riga */}
        <div className="col-span-1">
          <StatisticsCard />
        </div>
        
        <div className="col-span-1">
          <RefereesCard />
        </div>
        
        <div className="col-span-1">
          <FinancialCard />
        </div>
        
        {/* Terza riga */}
        <div className="col-span-1 lg:col-span-3">
          <RegulationsCard />
        </div>
      </div>
    </>
  );
};

export default CommitteeDashboard;
