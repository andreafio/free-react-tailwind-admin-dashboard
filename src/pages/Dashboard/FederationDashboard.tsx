import React from 'react';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';
import PageMeta from '../../components/common/PageMeta';
import CategoriesCard from './components/CategoriesCard';
import EventsCard from './components/EventsCard';
import RefereesCard from './components/RefereesCard';
import ReportsCard from './components/ReportsCard';
import StatisticsCard from './components/StatisticsCard';
import ExportToolsCard from './components/ExportToolsCard';

const FederationDashboard: React.FC = () => {
  return (
    <>
      <PageMeta
        title="Dashboard Federazione | SportApp"
        description="Dashboard per federazioni sportive"
      />
      <PageBreadcrumb pageTitle="Dashboard Federazione" />
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {/* Prima riga */}
        <div className="col-span-1">
          <CategoriesCard />
        </div>
        
        <div className="col-span-1 lg:col-span-1 xl:col-span-2">
          <EventsCard />
        </div>
        
        {/* Seconda riga */}
        <div className="col-span-1">
          <RefereesCard />
        </div>
        
        <div className="col-span-1">
          <ReportsCard />
        </div>
        
        <div className="col-span-1">
          <StatisticsCard />
        </div>
        
        {/* Terza riga */}
        <div className="col-span-1 lg:col-span-3">
          <ExportToolsCard />
        </div>
      </div>
    </>
  );
};

export default FederationDashboard;
