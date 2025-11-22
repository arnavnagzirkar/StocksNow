import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { cn } from '../utils/cn';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  className?: string;
}

export function MetricCard({ title, value, change, changeLabel, className }: MetricCardProps) {
  const isPositive = change !== undefined && change >= 0;

  return (
    <Card className={cn('', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change !== undefined && (
          <p className="text-xs text-muted-foreground">
            <span className={cn(isPositive ? 'text-green-600' : 'text-red-600')}>
              {isPositive ? '↑' : '↓'} {Math.abs(change).toFixed(2)}%
            </span>
            {changeLabel && ` ${changeLabel}`}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
