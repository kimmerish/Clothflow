import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Factory, 
  Package, 
  Users, 
  UserCog, 
  Wallet, 
  Settings,
  Menu,
  X,
  Scissors,
  LogOut,
  ChevronLeft
} from 'lucide-react';

const navItems = [
  { path: '/dashboard', label: 'Дашборд', icon: LayoutDashboard },
  { path: '/orders', label: 'Замовлення', icon: ShoppingBag },
  { path: '/production', label: 'Виробництво', icon: Factory },
  { path: '/inventory', label: 'Склад', icon: Package },
  { path: '/customers', label: 'Клієнти', icon: Users },
  { path: '/staff', label: 'Персонал', icon: UserCog },
  { path: '/finance', label: 'Фінанси', icon: Wallet },
  { path: '/settings', label: 'Налаштування', icon: Settings },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-screen bg-primary text-white flex flex-col transition-all duration-300 z-50',
        collapsed ? 'w-[72px]' : 'w-[280px]',
        'border-r border-primary-light'
      )}
      style={{ 
        background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)',
      }}
    >
      {/* Logo */}
      <div className={cn(
        'flex items-center gap-3 px-4 py-5 border-b border-white/10',
        collapsed && 'justify-center'
      )}>
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#e94560] to-[#ff6b6b] flex items-center justify-center shadow-lg">
          <Scissors className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <div className="flex flex-col">
            <span className="font-display text-lg font-bold tracking-tight">FashionFlow</span>
            <span className="text-xs text-white/50">Швейне виробництво</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative',
                isActive && 'bg-[#e94560]/20',
                collapsed && 'justify-center'
              )}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#e94560] rounded-r-full" />
              )}
              <Icon className={cn(
                'w-5 h-5 transition-colors',
                isActive ? 'text-[#e94560]' : 'text-white/60 group-hover:text-white'
              )} />
              {!collapsed && (
                <span className={cn(
                  'text-sm font-medium transition-colors',
                  isActive ? 'text-white' : 'text-white/60 group-hover:text-white'
                )}>
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className={cn(
        'p-4 border-t border-white/10',
        collapsed && 'flex flex-col items-center gap-2'
      )}>
        {!collapsed && user && (
          <div className="flex items-center gap-3 mb-3 p-2 rounded-lg bg-white/5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#e94560] to-[#ff6b6b] flex items-center justify-center text-sm font-bold">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-white/50 capitalize">{user.position || user.role}</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={logout}
          className={cn(
            'text-white/60 hover:text-white hover:bg-white/10 w-full',
            collapsed && 'w-9 h-9 p-0'
          )}
        >
          <LogOut className="w-4 h-4" />
          {!collapsed && <span className="ml-2">Вийти</span>}
        </Button>
      </div>

      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className={cn(
          'absolute -right-3 top-20 w-6 h-6 rounded-full bg-[#e94560] text-white flex items-center justify-center shadow-lg hover:bg-[#d63d56] transition-colors',
          collapsed && 'rotate-180'
        )}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
    </aside>
  );
}

interface HeaderProps {
  title: string;
  subtitle?: string;
  onMenuClick?: () => void;
}

export function Header({ title, subtitle, onMenuClick }: HeaderProps) {
  const { company } = useAuth();
  
  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="font-display text-xl font-semibold text-gray-900">{title}</h1>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium text-gray-900">{company.name}</p>
          <p className="text-xs text-gray-500">{company.phone}</p>
        </div>
      </div>
    </header>
  );
}

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export function Layout({ children, title, subtitle }: LayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      
      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <main
        className={cn(
          'transition-all duration-300 min-h-screen',
          sidebarCollapsed ? 'lg:ml-[72px]' : 'lg:ml-[280px]'
        )}
      >
        <Header 
          title={title} 
          subtitle={subtitle}
          onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
        />
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}