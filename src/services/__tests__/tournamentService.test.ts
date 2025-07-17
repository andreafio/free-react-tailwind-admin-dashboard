import { tournamentService } from '../tournamentService';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('TournamentService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createTournament', () => {
    it('should create a new tournament', async () => {
      const mockTournamentData = {
        name: 'Test Tournament',
        event_id: 1,
        start_date: '2025-07-15',
        end_date: '2025-07-16',
        participants: [1, 2, 3, 4],
        type: 'single_elimination'
      };

      const mockResponse = {
        id: 1,
        ...mockTournamentData,
        status: 'pending',
        teams: [],
        matches: []
      };

      mockedAxios.post.mockResolvedValueOnce({ data: mockResponse });

      const result = await tournamentService.createTournament(mockTournamentData);
      
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'http://localhost:8000/api/v1/tournaments',
        mockTournamentData
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getBrackets', () => {
    it('should fetch tournament brackets', async () => {
      const tournamentId = 1;
      const mockBrackets = {
        '1': [
          {
            id: 1,
            team1: { id: 1, name: 'Team 1' },
            team2: { id: 2, name: 'Team 2' },
            winner: null,
            loser: null,
            score: null,
            status: 'pending',
            match_number: 1
          }
        ]
      };

      mockedAxios.get.mockResolvedValueOnce({ data: mockBrackets });

      const result = await tournamentService.getBrackets(tournamentId);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        `http://localhost:8000/api/v1/tournaments/${tournamentId}/brackets`
      );
      expect(result).toEqual(mockBrackets);
    });
  });

  describe('updateMatch', () => {
    it('should update match result', async () => {
      const tournamentId = 1;
      const matchId = 1;
      const updateData = {
        winner_id: 1,
        loser_id: 2,
        score: '1-0',
        team1_score_details: 'ippon',
        team2_score_details: ''
      };

      const mockResponse = {
        id: matchId,
        ...updateData,
        status: 'completed'
      };

      mockedAxios.put.mockResolvedValueOnce({ data: mockResponse });

      const result = await tournamentService.updateMatch(
        tournamentId,
        matchId,
        updateData
      );

      expect(mockedAxios.put).toHaveBeenCalledWith(
        `http://localhost:8000/api/v1/tournaments/${tournamentId}/matches/${matchId}`,
        updateData
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
