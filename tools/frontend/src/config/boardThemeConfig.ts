/**
 * Chess board themes, colors, and visual styling
 * 
 * Generated: 2025-08-29T00:52:22.206Z
 * Consolidated from: 36 UI interface(s)
 * Source files: boardControlsData.ts, boardThemeDefaults.ts, boardThemesData.ts, pieceSetsData.ts, preferencesData.ts, analysisBoard.ts, boardSettings.ts, customPuzzles.ts, openingExplorer.ts, openingPuzzles.ts, playComputer.ts, preferences.ts, progressOverview.ts
 */

// From: /mnt/c/Projects/chess-training/frontend/src/data/boardControlsData.ts
export interface BoardSizeConfig {
  label: string;
  width: number;
  height: number;
  squareSize: number;
}

// From: /mnt/c/Projects/chess-training/frontend/src/data/boardControlsData.ts
export interface CoordinateStyle {
  id: string;
  label: string;
  fontSize: number;
  fontWeight: string;
  opacity: number;
}

// From: /mnt/c/Projects/chess-training/frontend/src/data/boardControlsData.ts
export interface HighlightStyle {
  id: string;
  label: string;
  type: 'dots' | 'border' | 'glow' | 'solid' | 'none';
  opacity: number;
  color: string;
}

// From: /mnt/c/Projects/chess-training/frontend/src/data/boardControlsData.ts
export interface ArrowStyle {
  id: string;
  label: string;
  strokeWidth: number;
  style: 'simple' | 'curved' | 'bold' | 'dashed' | 'glowing';
  opacity: number;
}

// From: /mnt/c/Projects/chess-training/frontend/src/data/boardThemeDefaults.ts
export interface BoardThemeColors {
  lightSquare: string;
  darkSquare: string;
  name: string;
}

// From: /mnt/c/Projects/chess-training/frontend/src/data/boardThemesData.ts
export interface BoardTheme_boardThemesData {
  id: string;
  name: string;
  description: string;
  category: 'classic' | 'modern' | 'fantasy' | 'neon' | 'luxury' | 'minimal';
  author: string;
  createdAt: Date;
  isPremium: boolean;
  isUnlocked: boolean;
  lightSquare: string;
  darkSquare: string;
  border: {
    show: boolean
    color: string
    width: 'thin' | 'medium' | 'thick'
  };
  background: 'plain' | 'wood-grain' | 'marble-veins' | 'space-stars' | 'gradient';
  pieceSet: string;
  material: string;
  popularity: number;
  downloadCount: number;
}

// From: /mnt/c/Projects/chess-training/frontend/src/data/boardThemesData.ts
export interface ThemeCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  count: number;
}

// From: /mnt/c/Projects/chess-training/frontend/src/data/pieceSetsData.ts
export interface PieceSetInfo {
  id: string;
  name: string;
  description: string;
  preview: string;
  category: 'traditional' | 'modern' | 'fantasy' | 'gaming' | 'luxury';
  style: 'classic' | 'minimalist' | 'ornate' | 'pixel' | 'neon' | 'crystal' | 'carved' | 'metal';
  isPremium: boolean;
  author: string;
  createdAt: Date;
}

// From: /mnt/c/Projects/chess-training/frontend/src/data/pieceSetsData.ts
export interface PieceCustomization {
  sizeScaling: number;
  shadowEffect: 'none' | 'soft' | 'hard';
  borderEnabled: boolean;
  borderWidth: number;
  borderColor: string;
  glowEffect: boolean;
  glowColor: string;
  glowIntensity: number;
}

// From: /mnt/c/Projects/chess-training/frontend/src/data/preferencesData.ts
export interface ThemeOption {
  value: 'midnight' | 'cyber' | 'neon' | 'royal' | 'classic';
  label: string;
  description: string;
  primaryColors: string[];
  accentColor: string;
  backgroundGradient: string;
  isPremium: boolean;
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/analysisBoard.ts
export interface EvaluationBarProps {
  evaluation: number;
  className?: string;
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/analysisBoard.ts
export interface EngineLineProps {
  analysis: EngineAnalysis;
  index: number;
  onPlayLine?: (moves: string[]) => void;
  className?: string;
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/analysisBoard.ts
export interface PositionSetupProps {
  currentFen: string;
  onLoadFen: (fen: string) => void;
  onResetPosition: () => void;
  className?: string;
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/analysisBoard.ts
export interface MoveNavigationProps {
  gameHistory: string[];
  currentMoveIndex: number;
  onGoToMove: (index: number) => void;
  onUndo: () => void;
  onRedo: () => void;
  className?: string;
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/analysisBoard.ts
export interface AnalysisControlsProps {
  analysisMode: AnalysisMode;
  isAnalyzing: boolean;
  engineStatus: EngineStatus;
  analysisSettings: AnalysisSettings;
  onStartAnalysis: () => void;
  onStopAnalysis: () => void;
  onModeChange: (mode: AnalysisMode) => void;
  onSettingsChange: (settings: Partial<AnalysisSettings>) => void;
  className?: string;
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/analysisBoard.ts
export interface PositionDatabaseProps {
  positions: AnalysisPosition[];
  onLoadPosition: (position: AnalysisPosition) => void;
  onSavePosition?: (name: string, category: AnalysisPosition['category']) => void;
  onDeletePosition?: (id: string) => void;
  className?: string;
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/boardSettings.ts
export interface CoordinateSettings {
  show: boolean; // Whether to show coordinates
  position: 'inside' | 'outside' | 'both'; // Position of coordinates
  style: 'classic' | 'bold' | 'minimal' | 'gaming'; // Coordinate style
  colorScheme: 'auto' | 'light' | 'dark' | 'accent'; // Coordinate color theme
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/boardSettings.ts
export interface MoveHighlightSettings {
  showLastMove: boolean; // Highlight last move
  showLegalMoves: boolean; // Highlight legal moves
  style: HighlightStyle; // Highlight style
  color: string; // Highlight color
  opacity: number; // Opacity level (0-1)
  showCheck: boolean; // Show check highlight
  checkColor: string; // Check highlight color
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/boardSettings.ts
export interface MarkupSettings {
  enableArrows: boolean; // Enable arrow drawing
  arrowStyle: ArrowStyle; // Arrow style
  arrowColor: string; // Default arrow color
  arrowOpacity: number; // Arrow opacity (0-1)
  enableSquareHighlight: boolean; // Enable square highlighting
  squareHighlightColor: string; // Square highlight color
  squareHighlightOpacity: number; // Square highlight opacity (0-1)
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/boardSettings.ts
export interface BorderSettings {
  show: boolean; // Show border
  style: 'simple' | 'classic' | 'ornate' | 'modern' | 'gaming'; // Border style
  width: 'thin' | 'medium' | 'thick'; // Border width
  color: string; // Border color
  material: BoardMaterial; // Border material effect
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/boardSettings.ts
export interface BoardTheme_boardSettings {
  id: string; // Unique identifier
  name: string; // Display name
  description: string; // Theme description
  category: 'classic' | 'modern' | 'fantasy' | 'neon' | 'luxury' | 'minimal'; // Theme category
  material: BoardMaterial; // Board material
  lightSquare: string; // Light square color
  darkSquare: string; // Dark square color
  border: BorderSettings; // Board border settings
  background: BoardBackground; // Background pattern
  pieceSet: PieceSet; // Piece set style
  previewImage: string; // Preview image URL
  isPremium: boolean; // Whether this is a premium theme
  isUnlocked: boolean; // Whether this theme is unlocked
  author: string; // Theme creator/author
  createdAt: number; // Creation date
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/boardSettings.ts
export interface BoardSettings {
  theme: BoardTheme; // Current theme
  size: BoardSize; // Board size
  orientation: BoardOrientation; // Board orientation
  coordinates: CoordinateSettings; // Coordinate display settings
  highlighting: MoveHighlightSettings; // Move highlighting settings
  animations: AnimationSettings; // Animation preferences
  sounds: SoundSettings; // Sound preferences
  markup: MarkupSettings; // Arrow and markup settings
  showLabels: boolean; // Show rank and file labels
  enableContextMenu: boolean; // Enable right-click context menu
  enableDragDrop: boolean; // Enable drag and drop
  autoQueen: boolean; // Auto-queen promotion
  showCapturedPieces: boolean; // Show captured pieces
  showMoveClock: boolean; // Show move clock
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/boardSettings.ts
export interface BoardSettingsExport {
  version: string; // Format version
  exportedAt: number; // Export timestamp
  settings: BoardSettings; // Settings data
  customThemes: BoardTheme[]; // Custom themes included
  metadata: {
    appVersion: string
    userName: string
    description?: string
  }; // Export metadata
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/boardSettings.ts
export interface BoardPreviewProps {
  settings: BoardSettings; // Current board settings
  position?: string; // Preview position (FEN)
  size?: 'small' | 'medium' | 'large'; // Preview size
  interactive?: boolean; // Whether preview is interactive
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/boardSettings.ts
export interface ThemeSelectorProps_boardSettings {
  themes: BoardTheme[]; // Available themes
  selectedTheme: BoardTheme; // Currently selected theme
  onThemeSelect: (theme: BoardTheme) => void; // Callback when theme is selected
  showPremium: boolean; // Whether to show premium themes
  categoryFilter?: string; // Theme category filter
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/boardSettings.ts
export interface PieceSelectorProps {
  pieceSets: { id: PieceSet; name: string; preview: string; description?: string }[]; // Available piece sets
  selectedPieceSet: PieceSet; // Currently selected piece set
  onPieceSetSelect: (pieceSet: PieceSet) => void; // Callback when piece set is selected
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/boardSettings.ts
export interface BoardControlsProps {
  settings: BoardSettings; // Current board settings
  onSettingsChange: (settings: Partial<BoardSettings>) => void; // Callback when settings change
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/boardSettings.ts
export interface BoardSettingsHookReturn {
  settings: BoardSettings;
  availableThemes: BoardTheme[];
  customThemes: BoardTheme[];
  isLoading: boolean;
  isSaving: boolean;
  isExporting: boolean;
  isImporting: boolean;
  updateSettings: (settings: Partial<BoardSettings>) => void;
  selectTheme: (theme: BoardTheme) => void;
  resetToDefaults: () => void;
  saveSettings: () => Promise<void>;
  exportSettings: () => Promise<string>;
  importSettings: (data: string) => Promise<boolean>;
  createCustomTheme: (theme: Omit<BoardTheme, 'id' | 'createdAt'>) => void;
  deleteCustomTheme: (themeId: string) => void;
  previewSettings: (tempSettings: Partial<BoardSettings>) => void;
  applyPreview: () => void;
  cancelPreview: () => void;
  isPreviewMode: boolean;
  error: string | null;
  clearError: () => void;
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/boardSettings.ts
export interface ThemeWizardStep {
  id: string; // Step identifier
  title: string; // Step title
  description: string; // Step description
  completed: boolean; // Whether step is completed
  current: boolean; // Whether step is current
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/boardSettings.ts
export interface ThemeCreationData {
  basic: {
    name: string
    description: string
    category: BoardTheme['category']
    author: string
  }; // Basic theme info
  colors: {
    lightSquare: string
    darkSquare: string
    borderColor: string
  }; // Color scheme
  materials: {
    boardMaterial: BoardMaterial
    background: BoardBackground
    pieceSet: PieceSet
  }; // Material and texture
  advanced: {
    border: BorderSettings
    isPremium: boolean
  }; // Advanced settings
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/customPuzzles.ts
export interface CustomPuzzleBoardProps {
  position: string; // Current board position as FEN string
  onPieceDrop: (sourceSquare: string, targetSquare: string) => boolean; // Callback fired when a piece is dropped
  orientation?: 'white' | 'black'; // Board orientation
  showCoordinates?: boolean; // Show board coordinates
  boardTheme?: { lightSquare?: string; darkSquare?: string } | string; // Custom board theme
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/openingExplorer.ts
export interface OpeningBoardProps {
  position: string; // Current position FEN
  onMove: (from: string, to: string) => boolean; // Callback when move is made
  allowMoves: boolean; // Whether moves are allowed
  lastMove?: {
    from: string
    to: string
  }; // Last move highlight
  arrows?: Array<{
    from: string
    to: string
    color?: string
  }>; // Arrows to display
  orientation: 'white' | 'black'; // Board orientation
  showCoordinates: boolean; // Show coordinates
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/openingPuzzles.ts
export interface PuzzleBoardProps {
  position: string; // Current board position as FEN string
  onPieceDrop: (sourceSquare: string, targetSquare: string) => boolean; // Callback fired when a piece is dropped
  orientation?: 'white' | 'black'; // Board orientation
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/playComputer.ts
export interface ChessGameBoardProps {
  gameState: GameState; // Current game state
  onPlayerMove: (from: string, to: string) => void; // Callback when player makes a move
  playerColor: 'white' | 'black'; // Player's color
  showCoordinates: boolean; // Whether to show coordinates
  showLastMove: boolean; // Whether to show last move highlight
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/preferences.ts
export interface ThemeSelectorProps_preferences {
  preferences: AppearancePreferences;
  onUpdate: (preferences: Partial<AppearancePreferences>) => void;
  isLoading?: boolean;
  theme: any;
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/progressOverview.ts
export interface CommandCenterTheme {
  commandPrimary: string; // Primary command colors
  commandSecondary: string; // Secondary command colors
  commandAccent: string; // Accent highlights
  statusColors: {
    operational: string
    warning: string
    critical: string
    offline: string
  }; // Status indicators
  hudColors: {
    border: string
    background: string
    text: string
    highlight: string
  }; // HUD elements
  animations: {
    pulse: boolean
    glow: boolean
    scan: boolean
  }; // Animation settings
}

// Consolidated BoardThemeConfig
export const BoardThemeConfig = {
  boardSizeConfig: {} as BoardSizeConfig,
  coordinateStyle: {} as CoordinateStyle,
  highlightStyle: {} as HighlightStyle,
  arrowStyle: {} as ArrowStyle,
  boardThemeColors: {} as BoardThemeColors,
  boardTheme: {} as BoardTheme_boardThemesData,
  themeCategory: {} as ThemeCategory,
  pieceSetInfo: {} as PieceSetInfo,
  pieceCustomization: {} as PieceCustomization,
  themeOption: {} as ThemeOption,
  evaluationBarProps: {} as EvaluationBarProps,
  engineLineProps: {} as EngineLineProps,
  positionSetupProps: {} as PositionSetupProps,
  moveNavigationProps: {} as MoveNavigationProps,
  analysisControlsProps: {} as AnalysisControlsProps,
  positionDatabaseProps: {} as PositionDatabaseProps,
  coordinateSettings: {} as CoordinateSettings,
  moveHighlightSettings: {} as MoveHighlightSettings,
  markupSettings: {} as MarkupSettings,
  borderSettings: {} as BorderSettings,
  boardTheme: {} as BoardTheme_boardSettings,
  boardSettings: {} as BoardSettings,
  boardSettingsExport: {} as BoardSettingsExport,
  boardPreviewProps: {} as BoardPreviewProps,
  themeSelectorProps: {} as ThemeSelectorProps_boardSettings,
  pieceSelectorProps: {} as PieceSelectorProps,
  boardControlsProps: {} as BoardControlsProps,
  boardSettingsHookReturn: {} as BoardSettingsHookReturn,
  themeWizardStep: {} as ThemeWizardStep,
  themeCreationData: {} as ThemeCreationData,
  customPuzzleBoardProps: {} as CustomPuzzleBoardProps,
  openingBoardProps: {} as OpeningBoardProps,
  puzzleBoardProps: {} as PuzzleBoardProps,
  chessGameBoardProps: {} as ChessGameBoardProps,
  themeSelectorProps: {} as ThemeSelectorProps_preferences,
  commandCenterTheme: {} as CommandCenterTheme,
} as const;

// Type exports
export type BoardSizeConfigType = BoardSizeConfig;
export type CoordinateStyleType = CoordinateStyle;
export type HighlightStyleType = HighlightStyle;
export type ArrowStyleType = ArrowStyle;
export type BoardThemeColorsType = BoardThemeColors;
export type BoardTheme_boardThemesDataType = BoardTheme_boardThemesData;
export type ThemeCategoryType = ThemeCategory;
export type PieceSetInfoType = PieceSetInfo;
export type PieceCustomizationType = PieceCustomization;
export type ThemeOptionType = ThemeOption;
export type EvaluationBarPropsType = EvaluationBarProps;
export type EngineLinePropsType = EngineLineProps;
export type PositionSetupPropsType = PositionSetupProps;
export type MoveNavigationPropsType = MoveNavigationProps;
export type AnalysisControlsPropsType = AnalysisControlsProps;
export type PositionDatabasePropsType = PositionDatabaseProps;
export type CoordinateSettingsType = CoordinateSettings;
export type MoveHighlightSettingsType = MoveHighlightSettings;
export type MarkupSettingsType = MarkupSettings;
export type BorderSettingsType = BorderSettings;
export type BoardTheme_boardSettingsType = BoardTheme_boardSettings;
export type BoardSettingsType = BoardSettings;
export type BoardSettingsExportType = BoardSettingsExport;
export type BoardPreviewPropsType = BoardPreviewProps;
export type ThemeSelectorProps_boardSettingsType = ThemeSelectorProps_boardSettings;
export type PieceSelectorPropsType = PieceSelectorProps;
export type BoardControlsPropsType = BoardControlsProps;
export type BoardSettingsHookReturnType = BoardSettingsHookReturn;
export type ThemeWizardStepType = ThemeWizardStep;
export type ThemeCreationDataType = ThemeCreationData;
export type CustomPuzzleBoardPropsType = CustomPuzzleBoardProps;
export type OpeningBoardPropsType = OpeningBoardProps;
export type PuzzleBoardPropsType = PuzzleBoardProps;
export type ChessGameBoardPropsType = ChessGameBoardProps;
export type ThemeSelectorProps_preferencesType = ThemeSelectorProps_preferences;
export type CommandCenterThemeType = CommandCenterTheme;
