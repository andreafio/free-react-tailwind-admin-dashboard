import React, { useEffect, useState } from 'react';
import { Tournament, Match, tournamentService } from '../../services/tournamentService';
import JudoBracket from '../../components/tournament/JudoBracket';
import { Modal } from '../../components/ui/modal';
import Button from '../../components/ui/button/Button';
import Input from '../../components/form/input/InputField';
import Label from '../../components/form/Label';

export default function TournamentPage() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showMatchModal, setShowMatchModal] = useState(false);

  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/tournaments');
      setTournaments(response.data.data);
    } catch (err: any) {
      setError(err.message || 'Errore nel caricamento dei tornei');
    } finally {
      setLoading(false);
    }
  };

  const handleMatchClick = (match: Match) => {
    setSelectedMatch(match);
    setShowMatchModal(true);
  };

  const handleMatchUpdate = async (matchData: Partial<Match>) => {
    if (!selectedTournament || !selectedMatch) return;

    try {
      await tournamentService.updateMatch(
        selectedTournament.id,
        selectedMatch.id,
        matchData
      );
      // Ricarica il torneo per aggiornare i dati
      const updatedTournament = await tournamentService.getTournament(selectedTournament.id);
      setSelectedTournament(updatedTournament.data);
      setShowMatchModal(false);
    } catch (err: any) {
      setError(err.message || 'Errore nell\'aggiornamento del match');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-6 text-2xl font-bold">Tornei di Judo</h1>

      {error && (
        <div className="p-4 mb-4 text-red-600 bg-red-100 rounded-lg">
          {error}
        </div>
      )}

      {/* Lista dei tornei */}
      <div className="grid gap-4 mb-8 md:grid-cols-2 lg:grid-cols-3">
        {tournaments.map((tournament) => (
          <div
            key={tournament.id}
            className="p-4 bg-white rounded-lg shadow cursor-pointer dark:bg-gray-800 hover:shadow-lg"
            onClick={() => setSelectedTournament(tournament)}
          >
            <h3 className="mb-2 text-lg font-semibold">{tournament.name}</h3>
            <p className="text-sm text-gray-500">
              {tournament.teams.length} Partecipanti
            </p>
            <div className="mt-2">
              <span className={`
                px-2 py-1 text-xs rounded-full
                ${tournament.status === 'completed' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30' 
                  : tournament.status === 'in_progress'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700'}
              `}>
                {tournament.status === 'completed' 
                  ? 'Completato' 
                  : tournament.status === 'in_progress'
                    ? 'In Corso'
                    : 'In Attesa'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Visualizzazione del torneo selezionato */}
      {selectedTournament && (
        <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">
              {selectedTournament.name}
            </h2>
            <Button
              size="sm"
              onClick={() => setSelectedTournament(null)}
            >
              Chiudi
            </Button>
          </div>
          <JudoBracket
            tournamentId={selectedTournament.id}
            onMatchClick={handleMatchClick}
          />
        </div>
      )}

      {/* Modal per l'aggiornamento del match */}
      <Modal
        isOpen={showMatchModal}
        onClose={() => setShowMatchModal(false)}
        className="p-6 bg-white rounded-lg dark:bg-gray-800"
      >
        <h3 className="mb-4 text-lg font-semibold">
          Aggiorna Match #{selectedMatch?.match_number}
        </h3>
        {selectedMatch && (
          <div className="space-y-4">
            {/* Aggiungi qui i campi per l'aggiornamento del match */}
            <div>
              <Label>Vincitore</Label>
              <select
                className="w-full p-2 border rounded"
                onChange={(e) => handleMatchUpdate({ winner_id: parseInt(e.target.value) })}
              >
                <option value="">Seleziona vincitore</option>
                <option value={selectedMatch.team1_id?.toString()}>
                  Atleta 1
                </option>
                <option value={selectedMatch.team2_id?.toString()}>
                  Atleta 2
                </option>
              </select>
            </div>
            {/* Aggiungi altri campi per i punteggi */}
          </div>
        )}
      </Modal>
    </div>
  );
}
