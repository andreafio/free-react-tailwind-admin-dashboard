import { useState, useEffect } from 'react';
import { tournamentService, Tournament } from '../../services/tournamentService';

export default function UpcomingTournaments() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        setLoading(true);
        const allTournaments = await tournamentService.getTournaments();
        // Filtriamo i tornei in attesa o in corso
        const relevantTournaments = allTournaments
          .filter((t: Tournament) => t.status === 'pending' || t.status === 'in_progress')
          .slice(0, 5); // Prendiamo solo i primi 5
        
        setTournaments(relevantTournaments);
      } catch (error) {
        console.error("Errore nel caricamento dei tornei:", error);
        setTournaments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  // Funzione per formattare la data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-6 flex items-center justify-between">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Prossimi Tornei
        </h4>
        <a
          href="/tournaments"
          className="flex items-center gap-2 text-sm font-medium text-brand-500 transition-colors hover:text-brand-600"
        >
          Vedi Tutti
          <svg
            className="fill-current"
            width="17"
            height="15"
            viewBox="0 0 17 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.0303 8.03033C16.3232 7.73744 16.3232 7.26256 16.0303 6.96967L11.0303 1.96967C10.7374 1.67678 10.2626 1.67678 9.96967 1.96967C9.67678 2.26256 9.67678 2.73744 9.96967 3.03033L14.4393 7.5L9.96967 11.9697C9.67678 12.2626 9.67678 12.7374 9.96967 13.0303C10.2626 13.3232 10.7374 13.3232 11.0303 13.0303L16.0303 8.03033ZM0.5 8.25H15.5V6.75H0.5V8.25Z"
              fill=""
            />
          </svg>
        </a>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex animate-pulse space-x-4 rounded-lg border border-gray-200 p-4 dark:border-gray-800">
              <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="flex-1 space-y-2 py-1">
                <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700"></div>
                <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700"></div>
              </div>
            </div>
          ))}
        </div>
      ) : tournaments.length === 0 ? (
        <div className="rounded-lg border border-gray-200 p-4 text-center dark:border-gray-800">
          <p className="text-gray-500 dark:text-gray-400">Nessun torneo in programma</p>
        </div>
      ) : (
        <div className="space-y-4">
          {tournaments.map((tournament) => (
            <div
              key={tournament.id}
              className="flex items-center justify-between rounded-lg border border-gray-200 p-4 transition-colors hover:border-brand-500/50 dark:border-gray-800 dark:hover:border-brand-500/30"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-500/10 text-brand-500">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 5H5V7H19V5Z" fill="currentColor" />
                    <path d="M5 9H19V11H5V9Z" fill="currentColor" />
                    <path d="M19 13H5V15H19V13Z" fill="currentColor" />
                    <path d="M5 17H19V19H5V17Z" fill="currentColor" />
                  </svg>
                </div>
                <div>
                  <h5 className="font-medium text-gray-800 dark:text-white/90">
                    {tournament.name}
                  </h5>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(tournament.start_date)} - {formatDate(tournament.end_date)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span 
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                    tournament.status === 'pending' 
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500' 
                      : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500'
                  }`}
                >
                  {tournament.status === 'pending' ? 'In attesa' : 'In corso'}
                </span>
                <a
                  href={`/tournaments/${tournament.id}`}
                  className="inline-flex items-center justify-center rounded-full bg-gray-100 p-1 text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-900 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
