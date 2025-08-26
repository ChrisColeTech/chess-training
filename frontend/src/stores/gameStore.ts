import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Chess } from 'chess.js';
import apiService from '../services/api';
import type { Game, GameMove, CreateGameRequest, MakeMoveResponse } from '../types/api';

interface GameState {
  // Current game state
  game: Game | null;
  chessInstance: Chess | null;
  gameId: string | null;
  isLoading: boolean;
  error: string | null;
  
  // Game settings
  aiLevel: number;
  userColor: 'white' | 'black';
  
  // Move history and state
  moveHistory: string[];
  lastMove: { from: string; to: string } | null;
  
  // Actions
  createGame: (settings: CreateGameRequest) => Promise<void>;
  makeMove: (move: GameMove) => Promise<MakeMoveResponse | null>;
  loadGame: (gameId: string) => Promise<void>;
  resetGame: () => void;
  clearError: () => void;
}

export const useGameStore = create<GameState>()(
  devtools(
    (set, get) => ({
      // Initial state
      game: null,
      chessInstance: null,
      gameId: null,
      isLoading: false,
      error: null,
      aiLevel: 2,
      userColor: 'white',
      moveHistory: [],
      lastMove: null,

      createGame: async (settings: CreateGameRequest) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await apiService.createGame(settings);
          
          if (response.success) {
            const chess = new Chess(response.initialFen);
            
            // If there was an AI first move, apply it
            if (response.aiMove) {
              chess.move(response.aiMove);
            }
            
            set({
              gameId: response.gameId,
              chessInstance: chess,
              aiLevel: settings.aiLevel,
              userColor: settings.color === 'random' 
                ? (Math.random() < 0.5 ? 'white' : 'black')
                : settings.color,
              moveHistory: chess.history(),
              lastMove: response.aiMove ? {
                from: response.aiMove.from,
                to: response.aiMove.to
              } : null,
              isLoading: false,
              error: null
            });
          } else {
            set({
              isLoading: false,
              error: response.error || 'Failed to create game'
            });
          }
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.response?.data?.error || 'Failed to create game'
          });
        }
      },

      makeMove: async (move: GameMove) => {
        const { gameId, chessInstance } = get();
        
        if (!gameId || !chessInstance) {
          set({ error: 'No active game' });
          return null;
        }

        set({ isLoading: true, error: null });
        
        try {
          // Validate move locally first
          const tempChess = new Chess(chessInstance.fen());
          const testMove = tempChess.move(move);
          
          if (!testMove) {
            set({ isLoading: false, error: 'Illegal move' });
            return null;
          }

          // Send move to server
          const response = await apiService.makeMove(gameId, { move });
          
          if (response.success && response.legal) {
            // Update chess instance with new game state
            const newChess = new Chess(response.gameState.fen);
            
            set({
              chessInstance: newChess,
              moveHistory: newChess.history(),
              lastMove: response.aiMove ? {
                from: response.aiMove.from,
                to: response.aiMove.to
              } : {
                from: move.from,
                to: move.to
              },
              isLoading: false,
              error: null
            });
            
            return response;
          } else {
            set({
              isLoading: false,
              error: response.error || 'Move failed'
            });
            return null;
          }
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.response?.data?.error || 'Move failed'
          });
          return null;
        }
      },

      loadGame: async (gameId: string) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await apiService.getGame(gameId);
          
          if (response.success && response.game) {
            const chess = new Chess(response.game.currentFen);
            
            set({
              game: response.game,
              gameId: response.game.id,
              chessInstance: chess,
              aiLevel: response.game.aiLevel,
              moveHistory: chess.history(),
              isLoading: false,
              error: null
            });
          } else {
            set({
              isLoading: false,
              error: response.error || 'Failed to load game'
            });
          }
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.response?.data?.error || 'Failed to load game'
          });
        }
      },

      resetGame: () => {
        set({
          game: null,
          chessInstance: null,
          gameId: null,
          isLoading: false,
          error: null,
          moveHistory: [],
          lastMove: null
        });
      },

      clearError: () => {
        set({ error: null });
      }
    }),
    {
      name: 'game-store'
    }
  )
);