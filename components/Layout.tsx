import { Link, useLocation } from 'react-router-dom';

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

import {
  LayoutDashboard,
  TrendingUp,
  Activity,
  FlaskConical,
  Beaker,
  Radio,
  LineChart,
  Briefcase,
  Shield,
  MessageSquare,
  Settings as SettingsIcon,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Ticker Intelligence', href: '/ticker-intelligence', icon: TrendingUp },
  { name: 'Factor Explorer', href: '/factor-explorer', icon: Activity },
  { name: 'Model Lab', href: '/model-lab', icon: FlaskConical },
  { name: 'Experiments', href: '/experiments', icon: Beaker },
  { name: 'Signal Diagnostics', href: '/signal-diagnostics', icon: Radio },
  { name: 'Strategy Backtest', href: '/strategy-backtest', icon: LineChart },
  { name: 'Portfolio Lab', href: '/portfolio-lab', icon: Briefcase },
  { name: 'Risk & Performance', href: '/risk-performance', icon: Shield },
  { name: 'Sentiment', href: '/sentiment', icon: MessageSquare },
  { name: 'Settings', href: '/settings', icon: SettingsIcon },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border">
        <div className="flex h-16 items-center border-b border-border px-6">
          <h1 className="text-xl font-bold">QuantSight</h1>
        </div>
        <nav className="space-y-1 px-3 py-4">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )}
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main className="pl-64">
        <div className="container mx-auto p-6">{children}</div>
      </main>
    </div>
  );
}
