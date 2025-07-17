import { useState, useEffect } from 'react';
import { tournamentService, Tournament } from '../../services/tournamentService';

export default function SportMetrics() {
  const [metrics, setMetrics] = useState({
    tournaments: 0,
    upcomingMatches: 0,
    pendingTournaments: 0,
    completedTournaments: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        // Nella realtà questi dati dovrebbero essere recuperati da una API specifica
        // Per ora simuliamo con i dati che abbiamo disponibili
        const tournaments = await tournamentService.getTournaments();
        
        const pendingTournaments = tournaments.filter((t: Tournament) => t.status === 'pending').length;
        const completedTournaments = tournaments.filter((t: Tournament) => t.status === 'completed').length;
        
        // Assumiamo che questo endpoint restituisca i prossimi incontri dell'utente
        // In realtà dovrebbe essere specifico per l'utente corrente
        const upcomingMatches = 
          tournaments
            .filter((t: Tournament) => t.status === 'in_progress')
            .reduce((acc: number, t: Tournament) => acc + (t.matches?.filter(m => m.status === 'pending').length || 0), 0);
        
        setMetrics({
          tournaments: tournaments.length,
          upcomingMatches,
          pendingTournaments,
          completedTournaments
        });
      } catch (error) {
        console.error("Errore nel caricamento delle metriche:", error);
        // In caso di errore, mostriamo dei dati di fallback
        setMetrics({
          tournaments: 0,
          upcomingMatches: 0,
          pendingTournaments: 0,
          completedTournaments: 0
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
      <h4 className="mb-6 text-lg font-semibold text-gray-800 dark:text-white/90">
        Panoramica Sport
      </h4>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Tornei Totali */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-800">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary-500/10">
            <svg className="fill-brand-500" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 0C5.20156 0 0.5 4.70156 0.5 10.5C0.5 16.2984 5.20156 21 11 21C16.7984 21 21.5 16.2984 21.5 10.5C21.5 4.70156 16.7984 0 11 0ZM11 2.625C14.9016 2.625 18.0781 5.29844 18.7891 8.8125H15.1328C14.5469 7.59844 13.2859 6.75 11.8125 6.75H10.1875C8.71406 6.75 7.45312 7.59844 6.86719 8.8125H3.21094C3.92188 5.29844 7.09844 2.625 11 2.625ZM3.21094 12.1875H6.86719C7.45312 13.4016 8.71406 14.25 10.1875 14.25H11.8125C13.2859 14.25 14.5469 13.4016 15.1328 12.1875H18.7891C18.0781 15.7016 14.9016 18.375 11 18.375C7.09844 18.375 3.92188 15.7016 3.21094 12.1875Z" />
            </svg>
          </div>

          <h5 className="mb-1 text-xl font-bold leading-9 text-gray-800 dark:text-white/90">
            {loading ? (
              <div className="h-6 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
            ) : (
              metrics.tournaments
            )}
          </h5>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
            Tornei Totali
          </p>
        </div>

        {/* Incontri in Programma */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-800">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-secondary-500/10">
            <svg className="fill-green-500" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.25 3.25H17.4167V2.33333C17.4167 1.92562 17.2542 1.53411 16.9651 1.2451C16.6761 0.956094 16.2846 0.79362 15.8769 0.79362C15.4692 0.79362 15.0776 0.956094 14.7886 1.2451C14.4996 1.53411 14.3372 1.92562 14.3372 2.33333V3.25H7.91667V2.33333C7.91667 1.92562 7.7542 1.53411 7.46519 1.2451C7.17619 0.956094 6.78467 0.79362 6.37696 0.79362C5.96925 0.79362 5.57774 0.956094 5.28873 1.2451C4.99972 1.53411 4.83725 1.92562 4.83725 2.33333V3.25H3.00392C2.47239 3.25 1.96262 3.45871 1.58755 3.83378C1.21248 4.20885 1.00377 4.71862 1.00377 5.25014V18.3335C1.00377 18.865 1.21248 19.3748 1.58755 19.7498C1.96262 20.1249 2.47239 20.3336 3.00392 20.3336H19.25C19.7815 20.3336 20.2913 20.1249 20.6664 19.7498C21.0414 19.3748 21.2501 18.865 21.2501 18.3335V5.25014C21.2501 4.71862 21.0414 4.20885 20.6664 3.83378C20.2913 3.45871 19.7815 3.25 19.25 3.25ZM18.1668 17.25H4.08333V8.33333H18.1668V17.25Z" />
            </svg>
          </div>

          <h5 className="mb-1 text-xl font-bold leading-9 text-gray-800 dark:text-white/90">
            {loading ? (
              <div className="h-6 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
            ) : (
              metrics.upcomingMatches
            )}
          </h5>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
            Incontri in Programma
          </p>
        </div>

        {/* Tornei in Attesa */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-800">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-warning-500/10">
            <svg className="fill-yellow-500" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 0.5C5.20156 0.5 0.5 5.20156 0.5 11C0.5 16.7984 5.20156 21.5 11 21.5C16.7984 21.5 21.5 16.7984 21.5 11C21.5 5.20156 16.7984 0.5 11 0.5ZM11 19.7188C6.18594 19.7188 2.28125 15.8141 2.28125 11C2.28125 6.18594 6.18594 2.28125 11 2.28125C15.8141 2.28125 19.7188 6.18594 19.7188 11C19.7188 15.8141 15.8141 19.7188 11 19.7188ZM15.3359 8.41406L14.2031 7.28125L10.1172 11.3672L7.79688 9.04688L6.66406 10.1797L10.1172 13.6328L15.3359 8.41406Z" />
            </svg>
          </div>

          <h5 className="mb-1 text-xl font-bold leading-9 text-gray-800 dark:text-white/90">
            {loading ? (
              <div className="h-6 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
            ) : (
              metrics.pendingTournaments
            )}
          </h5>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
            Tornei in Attesa
          </p>
        </div>

        {/* Tornei Completati */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-800">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-danger-500/10">
            <svg className="fill-red-500" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.15222 0.790008L6.94847 1.20204L5.78401 4.93071H2.31345C1.93916 4.93071 1.61344 5.10331 1.40969 5.38863C1.20595 5.67399 1.13464 6.00694 1.2254 6.34034L3.15222 13.1542C3.26222 13.5559 3.61441 13.8358 4.03022 13.8358H14.2302C14.6358 13.8358 14.9881 13.5559 15.0981 13.1542L17.0247 6.34036C17.1156 6.00691 17.0443 5.67399 16.8406 5.38863C16.6369 5.10331 16.3111 4.93071 15.9369 4.93071H12.4663L11.3018 1.20204L11.0981 0.790008H7.15222ZM7.96541 2.37689H10.2845L11.0912 4.93071H7.15878L7.96541 2.37689ZM3.98438 6.5175H15.2663L13.5938 12.25H4.6568L3.98438 6.5175ZM9.625 20.3737C10.5089 20.3737 11.2356 19.6553 11.2356 18.7737C11.2356 17.8921 10.5089 17.1737 9.625 17.1737C8.74112 17.1737 8.01439 17.8921 8.01439 18.7737C8.01439 19.6553 8.74112 20.3737 9.625 20.3737ZM14.6953 20.3737C15.5792 20.3737 16.3059 19.6553 16.3059 18.7737C16.3059 17.8921 15.5792 17.1737 14.6953 17.1737C13.8114 17.1737 13.0847 17.8921 13.0847 18.7737C13.0847 19.6553 13.8114 20.3737 14.6953 20.3737Z" />
            </svg>
          </div>

          <h5 className="mb-1 text-xl font-bold leading-9 text-gray-800 dark:text-white/90">
            {loading ? (
              <div className="h-6 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
            ) : (
              metrics.completedTournaments
            )}
          </h5>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
            Tornei Completati
          </p>
        </div>
      </div>
    </div>
  );
}
