export type MetricCard = {
  title: string;
  value: string | number;
  change?: {
    value: number;
    isPositive: boolean;
  };
  icon?: React.ReactNode;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple';
}

export type ChartWidget = {
  title: string;
  content: React.ReactNode;
  actions?: React.ReactNode;
}

export type DashboardTemplateProps = {
  title: string;
  subtitle?: string;
  metrics: MetricCard[];
  charts: ChartWidget[];
  loading?: boolean;
  onRefresh?: () => void;
  onExport?: () => void;
  headerActions?: React.ReactNode;
}