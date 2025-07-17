import { useState, useEffect } from 'react';
import { tournamentService, Tournament, Match } from '../../services/tournamentService';

// Estendi l'interfaccia Match per includere il nome del torneo
interface MatchWithTournament extends Match {
  tournament_name: string;
}

export default function RecentResults() {
  const [matches, setMatches] = useState<MatchWithTournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [teamsMap, setTeamsMap] = useState<Record<number, string>>({});

  useEffect(() => {
    const fetchRecentMatches = async () => {
      try {
        setLoading(true);
        const tournaments = await tournamentService.getTournaments();
        
        // Crea una mappa di tutte le squadre per una facile ricerca
        const allTeams: Record<number, string> = {};
        tournaments.forEach((tournament: Tournament) => {
          tournament.teams?.forEach(team => {
            if (team.id && team.name) {
              allTeams[team.id] = team.name;
            }
          });
        });
        setTeamsMap(allTeams);
        
        // Trova tutte le partite completate
        const allCompletedMatches: MatchWithTournament[] = [];
        tournaments.forEach((tournament: Tournament) => {
          const tournamentMatches = tournament.matches?.filter(match => match.status === 'completed') || [];
          tournamentMatches.forEach(match => {
            // Aggiungi il nome del torneo a ogni partita come proprietà
            allCompletedMatches.push({
              ...match,
              tournament_name: tournament.name
            });
          });
        });
        
        // Ordina per data (assumiamo che non ci sia un campo data, quindi è simulato)
        const sortedMatches = allCompletedMatches.sort((a, b) => b.id - a.id);
        
        // Prendi solo i 5 più recenti
        setMatches(sortedMatches.slice(0, 5));
      } catch (error) {
        console.error("Errore nel caricamento delle partite recenti:", error);
        setMatches([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentMatches();
  }, []);

  const getTeamName = (teamId: number | null) => {
    if (!teamId) return 'TBD';
    return teamsMap[teamId] || 'Squadra sconosciuta';
  };

  const getScore = (match: Match) => {
    if (match.team1_score_details && match.team2_score_details) {
      return `${match.team1_score_details} - ${match.team2_score_details}`;
    }
    if (match.score) {
      return match.score;
    }
    if (match.winner_id && match.loser_id) {
      return match.winner_id === match.team1_id ? '1 - 0' : '0 - 1';
    }
    return 'N/A';
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-6 flex items-center justify-between">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Risultati Recenti
        </h4>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex animate-pulse items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-800">
              <div className="flex items-center gap-4">
                <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700"></div>
              </div>
              <div className="h-6 w-16 rounded bg-gray-200 dark:bg-gray-700"></div>
              <div className="flex items-center gap-4">
                <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700"></div>
                <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              </div>
            </div>
          ))}
        </div>
      ) : matches.length === 0 ? (
        <div className="rounded-lg border border-gray-200 p-4 text-center dark:border-gray-800">
          <p className="text-gray-500 dark:text-gray-400">Nessun risultato recente</p>
        </div>
      ) : (
        <div className="space-y-4">
          {matches.map((match) => (
            <div
              key={match.id}
              className="rounded-lg border border-gray-200 p-4 transition-colors hover:border-brand-500/50 dark:border-gray-800 dark:hover:border-brand-500/30"
            >
              <div className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                {match.tournament_name} • {match.round}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-xs font-bold dark:bg-gray-800">
                    {getTeamName(match.team1_id)?.charAt(0) || '?'}
                  </div>
                  <span className="font-medium text-gray-800 dark:text-white/90">
                    {getTeamName(match.team1_id)}
                  </span>
                </div>
                
                <div className="rounded-md bg-gray-100 px-3 py-1 text-sm font-semibold dark:bg-gray-800">
                  {getScore(match)}
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-800 dark:text-white/90">
                    {getTeamName(match.team2_id)}
                  </span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-xs font-bold dark:bg-gray-800">
                    {getTeamName(match.team2_id)?.charAt(0) || '?'}
                  </div>
                </div>
              </div>
              
              {match.winner_id && (
                <div className="mt-2 text-right text-xs font-medium text-brand-500">
                  Vincitore: {getTeamName(match.winner_id)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
