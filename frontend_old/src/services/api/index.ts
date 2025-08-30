// API service factory - centralized access to all API clients
import { apiClient } from '../ApiClient';
import { AuthApiClient } from './AuthApiClient';
import { PuzzleApiClient } from './PuzzleApiClient';
import { TutorialApiClient } from './TutorialApiClient';
import { LearningApiClient } from './LearningApiClient';
import { AnalysisApiClient } from './AnalysisApiClient';
import { GameApiClient } from './GameApiClient';
import { ProfileApiClient } from './ProfileApiClient';
import { AchievementApiClient } from './AchievementApiClient';
import { SettingsApiClient } from './SettingsApiClient';
import { NotificationApiClient } from './NotificationApiClient';
import { ProgressApiClient } from './ProgressApiClient';
import { SearchApiClient } from './SearchApiClient';

// API service factory following DI pattern
export class ApiService {
  public readonly auth: AuthApiClient;
  public readonly puzzles: PuzzleApiClient;
  public readonly tutorials: TutorialApiClient;
  public readonly learning: LearningApiClient;
  public readonly analysis: AnalysisApiClient;
  public readonly games: GameApiClient;
  public readonly profile: ProfileApiClient;
  public readonly achievements: AchievementApiClient;
  public readonly settings: SettingsApiClient;
  public readonly notifications: NotificationApiClient;
  public readonly progress: ProgressApiClient;
  public readonly search: SearchApiClient;

  constructor() {
    // Single responsibility: Initialize all API clients with shared HTTP client
    this.auth = new AuthApiClient(apiClient);
    this.puzzles = new PuzzleApiClient(apiClient);
    this.tutorials = new TutorialApiClient(apiClient);
    this.learning = new LearningApiClient(apiClient);
    this.analysis = new AnalysisApiClient(apiClient);
    this.games = new GameApiClient(apiClient);
    this.profile = new ProfileApiClient(apiClient);
    this.achievements = new AchievementApiClient(apiClient);
    this.settings = new SettingsApiClient(apiClient);
    this.notifications = new NotificationApiClient(apiClient);
    this.progress = new ProgressApiClient(apiClient);
    this.search = new SearchApiClient(apiClient);
  }
}

// Global API service instance
export const apiService = new ApiService();

// Re-export types for convenience
export * from '../../types/api';
export { ErrorService } from '../ErrorService';
export type { ApiError } from '../ErrorService';