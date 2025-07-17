import React from 'react';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';
import PageMeta from '../../components/common/PageMeta';
import UserManagementCard from './components/UserManagementCard';
import SystemLogsCard from './components/SystemLogsCard';
import AccountToolsCard from './components/AccountToolsCard';
import ExportToolsCard from './components/ExportToolsCard';
import SystemUpdateCard from './components/SystemUpdateCard';

const AdminDashboard: React.FC = () => {
  return (
    <>
      <PageMeta
        title="Dashboard Admin | SportApp"
        description="Dashboard per amministratori di sistema"
      />
      <PageBreadcrumb pageTitle="Dashboard Admin" />
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {/* Prima riga */}
        <div className="col-span-1 lg:col-span-2 xl:col-span-3">
          <UserManagementCard />
        </div>
        
        {/* Seconda riga */}
        <div className="col-span-1">
          <SystemLogsCard />
        </div>
        
        <div className="col-span-1">
          <AccountToolsCard />
        </div>
        
        <div className="col-span-1">
          <ExportToolsCard />
        </div>
        
        {/* Terza riga */}
        <div className="col-span-1 lg:col-span-3">
          <SystemUpdateCard />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
