import apiConfig from './apiConfig';

const { axios } = apiConfig;
const API_URL = `${apiConfig.apiUrl}/v1`;

export interface Tournament {
  id: number;
  name: string;
  event_id: number;
  start_date: string;
  end_date: string;
  status: 'pending' | 'in_progress' | 'completed';
  teams: Team[];
  matches: Match[];
}

export interface Team {
  id: number;
  name: string;
}

export interface Match {
  id: number;
  tournament_id: number;
  team1_id: number | null;
  team2_id: number | null;
  team1_score_details?: string;
  team2_score_details?: string;
  winner_id: number | null;
  loser_id: number | null;
  round: string;
  match_number: number;
  status: 'pending' | 'in_progress' | 'completed';
  fight_time: number;
  golden_score: boolean;
  score?: string;
}

export interface Standing {
  team: Team;
  rank: number;
  status?: 'gold' | 'silver' | 'bronze';
  wins?: number;
  ippon_wins?: number;
  wazaari?: number;
  ippon_points?: number;
  points?: number;
}

export const tournamentService = {
  async createTournament(data: Partial<Tournament> & { participants: number[]; type: string }) {
    const response = await axios.post(`${API_URL}/tournaments`, data);
    return response.data;
  },

  async getTournament(id: number) {
    const response = await axios.get(`${API_URL}/tournaments/${id}`);
    return response.data;
  },

  async getTournaments() {
    const response = await axios.get(`${API_URL}/tournaments`);
    return response.data;
  },

  async getBrackets(tournamentId: number) {
    const response = await axios.get(`${API_URL}/tournaments/${tournamentId}/brackets`);
    return response.data;
  },

  async updateMatch(
    tournamentId: number,
    matchId: number,
    data: {
      winner_id: number;
      loser_id: number;
      score: string;
      team1_score_details?: string;
      team2_score_details?: string;
    }
  ) {
    const response = await axios.put(
      `${API_URL}/tournaments/${tournamentId}/matches/${matchId}`,
      data
    );
    return response.data;
  },

  async getStandings(tournamentId: number) {
    const response = await axios.get(
      `${API_URL}/tournaments/${tournamentId}/standings`
    );
    return response.data;
  },

  async getNextMatches(tournamentId: number) {
    const response = await axios.get(
      `${API_URL}/tournaments/${tournamentId}/next-matches`
    );
    return response.data;
  },

  async handleWithdrawal(tournamentId: number, withdrawnTeamId: number, luckyLoserId: number) {
    const response = await axios.post(
      `${API_URL}/tournaments/${tournamentId}/withdrawal`,
      {
        withdrawn_team_id: withdrawnTeamId,
        lucky_loser_id: luckyLoserId
      }
    );
    return response.data;
  }
};
