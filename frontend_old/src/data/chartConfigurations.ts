import { ChartLine, BarChart3, Activity, ChartPie, Target, Calendar } from 'lucide-react'
import type { ChartType } from '@/types/analytics'

export const chartTypeIcons: Record<ChartType, React.ElementType> = {
  line: ChartLine,
  bar: BarChart3,
  area: Activity,
  pie: ChartPie,
  scatter: Target,
  heatmap: Calendar
}

export const chartTypeLabels: Record<ChartType, string> = {
  line: 'Line Chart',
  bar: 'Bar Chart',
  area: 'Area Chart',
  pie: 'Pie Chart',
  scatter: 'Scatter Plot',
  heatmap: 'Heat Map'
}