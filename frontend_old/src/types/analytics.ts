export interface AnalyticsData {
  pageViews: number;
  uniqueUsers: number;
  averageSessionTime: number;
  bounceRate: number;
}

export interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
  }>;
}

export type AnalyticsPeriod = 'day' | 'week' | 'month' | 'year';

export type ChartType = 'line' | 'bar' | 'area' | 'scatter' | 'pie' | 'heatmap';

export interface UserActivity {
  userId: string;
  action: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}