import React from 'react';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';
import PageMeta from '../../components/common/PageMeta';
import MemberListCard from './components/MemberListCard';
import EventsCard from './components/EventsCard';
import PaymentsCard from './components/PaymentsCard';
import ResultsCard from './components/ResultsCard';
import DocumentsCard from './components/DocumentsCard';
import QRCodeCard from './components/QRCodeCard';
import ProfileSettingsCard from './components/ProfileSettingsCard';

const ClubDashboard: React.FC = () => {
  return (
    <>
      <PageMeta
        title="Dashboard Società | SportApp"
        description="Dashboard per società sportive"
      />
      <PageBreadcrumb pageTitle="Dashboard Società" />
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {/* Prima riga */}
        <div className="col-span-1 lg:col-span-2">
          <MemberListCard />
        </div>
        
        <div className="col-span-1">
          <EventsCard />
        </div>
        
        {/* Seconda riga */}
        <div className="col-span-1">
          <PaymentsCard />
        </div>
        
        <div className="col-span-1">
          <ResultsCard />
        </div>
        
        <div className="col-span-1">
          <DocumentsCard />
        </div>
        
        {/* Terza riga */}
        <div className="col-span-1">
          <QRCodeCard />
        </div>
        
        <div className="col-span-1">
          <ProfileSettingsCard />
        </div>
      </div>
    </>
  );
};

export default ClubDashboard;
