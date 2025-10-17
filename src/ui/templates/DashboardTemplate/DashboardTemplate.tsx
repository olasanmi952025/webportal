import { Button } from '../../atoms/Button';
import  Badge  from '../../atoms/Badge/Badge';
import { Skeleton } from '../../atoms/Skeleton';
import { Cards} from '../../atoms/Cards';
import type { DashboardTemplateProps } from '.';



 function DashboardTemplate({
  title,
  subtitle,
  metrics,
  charts,
  loading = false,
  onRefresh,
  onExport,
  headerActions,
}: DashboardTemplateProps) {
  const getMetricColor = (color: string = 'blue') => {
    const colors = {
      blue: 'bg-blue-50 text-blue-600 border-blue-200',
      green: 'bg-green-50 text-green-600 border-green-200',
      red: 'bg-red-50 text-red-600 border-red-200',
      yellow: 'bg-yellow-50 text-yellow-600 border-yellow-200',
      purple: 'bg-purple-50 text-purple-600 border-purple-200',
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-64" />
          <div className="flex gap-3">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => (
            <Skeleton key={i} className="h-80" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen ">
          <div className="flex-1">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
              {subtitle && (
                <p className="text-xs md:text-base text-gray-600 mt-1">{subtitle}</p>
              )}
            </div>
            <div className="flex items-center gap-3 my-2">
              {headerActions}
              {onRefresh && (
                <Button variant="outline" onClick={onRefresh}>
                  Actualizar
                </Button>
              )}
              {onExport && (
                <Button variant="secondary" onClick={onExport}>
                  Exportar
                </Button>
              )}
            </div>
          </div>

          {/* Métricas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <Cards key={index} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {metric.value}
                    </p>
                    {metric.change && (
                      <div className="flex items-center mt-2">
                        <Badge
                          variant={metric.change.isPositive ? 'success' : 'error'}
                          className="text-xs"
                        >
                          {metric.change.isPositive ? '+' : ''}{metric.change.value}%
                        </Badge>
                        <span className="text-xs text-gray-500 ml-2">vs mes anterior</span>
                      </div>
                    )}
                  </div>
                  {metric.icon && (
                    <div className={`p-3 rounded-lg border ${getMetricColor(metric.color)}`}>
                      {metric.icon}
                    </div>
                  )}
                </div>
              </Cards>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {charts.map((chart, index) => (
              <Cards key={index} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">{chart.title}</h3>
                  {chart.actions && <div>{chart.actions}</div>}
                </div>
                <div className="h-64">
                  {chart.content}
                </div>
              </Cards>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


export default DashboardTemplate;