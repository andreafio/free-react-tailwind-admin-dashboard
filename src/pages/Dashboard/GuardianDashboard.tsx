import React from 'react';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';
import PageMeta from '../../components/common/PageMeta';
import AthleteListCard from './components/AthleteListCard';
import EventsCard from './components/EventsCard';
import PaymentsCard from './components/PaymentsCard';
import DocumentsCard from './components/DocumentsCard';
import NotificationsCard from './components/NotificationsCard';

const GuardianDashboard: React.FC = () => {
  return (
    <>
      <PageMeta
        title="Dashboard Tutore | SportApp"
        description="Dashboard per tutori di atleti minorenni"
      />
      <PageBreadcrumb pageTitle="Dashboard Tutore" />
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {/* Prima riga */}
        <div className="col-span-1">
          <AthleteListCard />
        </div>
        
        <div className="col-span-1 lg:col-span-1 xl:col-span-2">
          <EventsCard />
        </div>
        
        {/* Seconda riga */}
        <div className="col-span-1">
          <PaymentsCard />
        </div>
        
        <div className="col-span-1">
          <DocumentsCard />
        </div>
        
        <div className="col-span-1">
          <NotificationsCard />
        </div>
      </div>
    </>
  );
};

export default GuardianDashboard;
