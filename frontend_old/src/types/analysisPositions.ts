export interface AnalysisPosition {
  id: string;
  name: string;
  fen: string;
  description: string;
  category: string;
}

export type AnalysisCategory = 'opening' | 'middlegame' | 'endgame' | 'tactics';

export interface PositionAnalysis {
  evaluation: number;
  bestMoves: string[];
  themes: string[];
  difficulty: number;
}