import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Chess } from 'chess.js';
import apiService from '../services/api';
import type { Puzzle, PuzzleStats } from '../types/api';

interface PuzzleState {
  // Current puzzle state
  currentPuzzle: Puzzle | null;
  chessInstance: Chess | null;
  userMoves: string[];
  isLoading: boolean;
  error: string | null;
  
  // Puzzle solving state
  isSolved: boolean;
  isCorrect: boolean | null;
  solution: string[] | null;
  hint: string | null;
  feedback: string | null;
  ratingChange: number | null;
  
  // Stats
  stats: PuzzleStats | null;
  
  // Timing
  startTime: number | null;
  endTime: number | null;
  
  // Actions
  loadNextPuzzle: () => Promise<void>;
  makeMove: (move: string) => void;
  checkSolution: () => Promise<void>;
  submitSolution: () => Promise<void>;
  getHint: () => Promise<void>;
  loadStats: () => Promise<void>;
  resetPuzzle: () => void;
  clearError: () => void;
}

export const usePuzzleStore = create<PuzzleState>()(
  devtools(
    (set, get) => ({
      // Initial state
      currentPuzzle: null,
      chessInstance: null,
      userMoves: [],
      isLoading: false,
      error: null,
      isSolved: false,
      isCorrect: null,
      solution: null,
      hint: null,
      feedback: null,
      ratingChange: null,
      stats: null,
      startTime: null,
      endTime: null,

      loadNextPuzzle: async () => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await apiService.getNextPuzzle();
          
          if (response.success && response.puzzle) {
            const chess = new Chess(response.puzzle.fen);
            
            set({
              currentPuzzle: response.puzzle,
              chessInstance: chess,
              userMoves: [],
              isSolved: false,
              isCorrect: null,
              solution: null,
              hint: null,
              feedback: null,
              ratingChange: null,
              startTime: Date.now(),
              endTime: null,
              isLoading: false,
              error: null
            });
          } else {
            set({
              isLoading: false,
              error: response.error || 'Failed to load puzzle'
            });
          }
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.response?.data?.error || 'Failed to load puzzle'
          });
        }
      },

      makeMove: (move: string) => {
        const { chessInstance, userMoves, isSolved } = get();
        
        if (!chessInstance || isSolved) return;

        try {
          // Validate move
          const moveObj = chessInstance.move(move);
          if (!moveObj) {
            set({ error: 'Invalid move' });
            return;
          }

          const newUserMoves = [...userMoves, move];
          set({ 
            userMoves: newUserMoves,
            error: null 
          });

          // Auto-check solution after each move
          setTimeout(() => get().checkSolution(), 100);

        } catch (error) {
          set({ error: 'Invalid move format' });
        }
      },

      checkSolution: async () => {
        const { currentPuzzle, userMoves, isSolved } = get();
        
        if (!currentPuzzle || isSolved || userMoves.length === 0) return;

        // Check if we have completed the expected number of moves in the solution
        const solutionMoves = currentPuzzle.solutionMoves || [];
        
        if (userMoves.length >= solutionMoves.length) {
          // Automatically submit when we have made enough moves
          await get().submitSolution();
        }
      },

      submitSolution: async () => {
        const { currentPuzzle, userMoves, startTime } = get();
        
        if (!currentPuzzle || userMoves.length === 0) {
          set({ error: 'No moves to submit' });
          return;
        }

        set({ isLoading: true, error: null });
        
        try {
          const timeTaken = startTime ? Date.now() - startTime : 0;
          
          const response = await apiService.solvePuzzle(currentPuzzle.id, {
            moves: userMoves,
            timeTaken
          });
          
          if (response.success) {
            set({
              isSolved: true,
              isCorrect: response.correct,
              solution: response.solution || null,
              hint: response.hint || null,
              feedback: response.feedback || null,
              ratingChange: response.ratingChange,
              endTime: Date.now(),
              isLoading: false,
              error: null
            });
            
            // Reload stats after solving
            get().loadStats();
          } else {
            set({
              isLoading: false,
              error: response.error || 'Failed to submit solution'
            });
          }
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.response?.data?.error || 'Failed to submit solution'
          });
        }
      },

      getHint: async () => {
        const { currentPuzzle } = get();
        
        if (!currentPuzzle) return;

        set({ isLoading: true, error: null });
        
        try {
          const response = await apiService.getHint(currentPuzzle.id);
          
          if (response.success) {
            set({
              hint: response.hint,
              isLoading: false,
              error: null
            });
          } else {
            set({
              isLoading: false,
              error: response.error || 'Failed to get hint'
            });
          }
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.response?.data?.error || 'Failed to get hint'
          });
        }
      },

      loadStats: async () => {
        try {
          const response = await apiService.getPuzzleStats();
          
          if (response.success) {
            set({ stats: response.stats });
          }
        } catch (error) {
          console.error('Failed to load puzzle stats:', error);
        }
      },

      resetPuzzle: () => {
        const { currentPuzzle } = get();
        if (currentPuzzle) {
          const chess = new Chess(currentPuzzle.fen);
          set({
            chessInstance: chess,
            userMoves: [],
            isSolved: false,
            isCorrect: null,
            solution: null,
            hint: null,
            feedback: null,
            ratingChange: null,
            startTime: Date.now(),
            endTime: null,
            error: null
          });
        }
      },

      clearError: () => {
        set({ error: null });
      }
    }),
    {
      name: 'puzzle-store'
    }
  )
);