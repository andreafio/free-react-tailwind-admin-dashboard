import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageMeta from "../../components/common/PageMeta";
import SportMetrics from "../../components/dashboard/SportMetrics";
import UpcomingTournaments from "../../components/dashboard/UpcomingTournaments";
import RecentResults from "../../components/dashboard/RecentResults";
import { useUser } from "../../hooks/useUser";
import { useRole } from "../../context/RoleContext";

export default function Home() {
  const { user } = useUser();
  const { activeRole } = useRole();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to role-specific dashboard if activeRole is set
    if (activeRole && activeRole.dashboardUrl && activeRole.dashboardUrl !== '/') {
      navigate(activeRole.dashboardUrl);
    }
  }, [activeRole, navigate]);
  
  return (
    <>
      <PageMeta
        title="Athlos Dashboard | Piattaforma di gestione tornei sportivi"
        description="Dashboard per la gestione di tornei e competizioni sportive"
      />
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white md:text-3xl">
          Benvenuto, {user?.name || 'Atleta'}!
        </h1>
        <p className="mt-1 text-gray-500 dark:text-gray-400">
          Ecco un riepilogo delle tue attività e dei prossimi eventi
        </p>
      </div>
      
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12">
          <SportMetrics />
        </div>

        <div className="col-span-12 xl:col-span-7">
          <UpcomingTournaments />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <RecentResults />
        </div>
      </div>
    </>
  );
}
