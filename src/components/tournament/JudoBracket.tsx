import React, { useEffect, useState } from 'react';
import { Match, Standing, tournamentService } from '../../services/tournamentService';
import { CheckCircleIcon } from '../../icons';

interface BracketProps {
  tournamentId: number;
  onMatchClick?: (match: Match) => void;
}

interface RoundGroup {
  name: string;
  matches: Match[];
}

const JudoBracket: React.FC<BracketProps> = ({ tournamentId, onMatchClick }) => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [standings, setStandings] = useState<Standing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [matchesResponse, standingsResponse] = await Promise.all([
          tournamentService.getNextMatches(tournamentId),
          tournamentService.getStandings(tournamentId)
        ]);
        setMatches(matchesResponse.data);
        setStandings(standingsResponse.data);
      } catch (err: any) {
        setError(err.message || 'Errore nel caricamento del torneo');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tournamentId]);

  const groupMatchesByRound = (matches: Match[]): RoundGroup[] => {
    const groups: { [key: string]: Match[] } = {};
    
    matches.forEach(match => {
      const roundName = match.round.startsWith('POOL_') 
        ? 'Gironi' 
        : match.round === 'SF1' || match.round === 'SF2' 
          ? 'Semifinali'
          : match.round === 'REP1' || match.round === 'REP2'
            ? 'Ripescaggi'
            : match.round === 'FINAL'
              ? 'Finale'
              : match.round;

      if (!groups[roundName]) {
        groups[roundName] = [];
      }
      groups[roundName].push(match);
    });

    return Object.entries(groups).map(([name, matches]) => ({
      name,
      matches: matches.sort((a, b) => a.match_number - b.match_number)
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="w-8 h-8 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-600 bg-red-100 rounded-lg">
        {error}
      </div>
    );
  }

  const roundGroups = groupMatchesByRound(matches);

  return (
    <div className="p-4">
      {/* Classifica */}
      <div className="mb-8">
        <h3 className="mb-4 text-lg font-semibold">Classifica</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-sm font-medium text-left text-gray-500 bg-gray-100 dark:bg-gray-800">
                <th className="p-3">Pos.</th>
                <th className="p-3">Atleta</th>
                <th className="p-3 text-center">V</th>
                <th className="p-3 text-center">IV</th>
                <th className="p-3 text-center">W</th>
                <th className="p-3 text-center">IP</th>
                <th className="p-3 text-center">P</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((standing, index) => (
                <tr 
                  key={standing.team.id}
                  className={
                    standing.status === 'gold' 
                      ? 'bg-yellow-50 dark:bg-yellow-900/20' 
                      : standing.status === 'silver'
                        ? 'bg-gray-50 dark:bg-gray-800/50'
                        : standing.status === 'bronze'
                          ? 'bg-orange-50 dark:bg-orange-900/20'
                          : ''
                  }
                >
                  <td className="p-3">{standing.rank}</td>
                  <td className="p-3">{standing.team.name}</td>
                  <td className="p-3 text-center">{standing.wins || 0}</td>
                  <td className="p-3 text-center">{standing.ippon_wins || 0}</td>
                  <td className="p-3 text-center">{standing.wazaari || 0}</td>
                  <td className="p-3 text-center">{standing.ippon_points || 0}</td>
                  <td className="p-3 text-center">{standing.points || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bracket */}
      <div className="space-y-8">
        {roundGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
            <h3 className="mb-4 text-lg font-semibold">{group.name}</h3>
            <div className="grid gap-4">
              {group.matches.map((match) => (
                <div
                  key={match.id}
                  onClick={() => onMatchClick?.(match)}
                  className={`
                    p-4 border rounded-lg cursor-pointer transition-colors
                    ${match.status === 'completed' 
                      ? 'bg-green-50 dark:bg-green-900/20' 
                      : match.status === 'in_progress'
                        ? 'bg-blue-50 dark:bg-blue-900/20'
                        : 'bg-white dark:bg-gray-800'}
                    ${onMatchClick ? 'hover:border-blue-500' : ''}
                  `}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">
                      Match #{match.match_number}
                    </span>
                    {match.status === 'completed' && (
                      <CheckCircleIcon className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                  <div className="space-y-2">
                    {[
                      { id: match.team1_id, details: match.team1_score_details },
                      { id: match.team2_id, details: match.team2_score_details }
                    ].map((team, idx) => (
                      <div 
                        key={idx}
                        className={`
                          flex items-center justify-between p-2 rounded
                          ${match.winner_id === team.id ? 'bg-green-100 dark:bg-green-900/30' : ''}
                        `}
                      >
                        <span>
                          {team.id 
                            ? standings.find(s => s.team.id === team.id)?.team.name || 'TBD'
                            : 'TBD'
                          }
                        </span>
                        {team.details && (
                          <div className="text-sm">
                            {JSON.parse(team.details).map((score: any, i: number) => (
                              <span 
                                key={i}
                                className={`
                                  ml-2 px-2 py-1 rounded
                                  ${score.type === 'ippon' ? 'bg-red-100 dark:bg-red-900/30' : ''}
                                  ${score.type === 'wazaari' ? 'bg-yellow-100 dark:bg-yellow-900/30' : ''}
                                `}
                              >
                                {score.type}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JudoBracket;
