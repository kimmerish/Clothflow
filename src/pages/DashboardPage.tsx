import { useAuth } from '@/contexts/AuthContext';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  mockDashboardStats, 
  mockOrders, 
  mockProductionOrders, 
  getLowStockMaterials,
  mockTransactions 
} from '@/data/mockData';
import { cn } from '@/lib/utils';
import { 
  TrendingUp, 
  TrendingDown, 
  Package, 
  ShoppingBag, 
  Factory, 
  AlertTriangle,
  Plus,
  ArrowRight,
  DollarSign,
  Users,
  Calendar,
  Activity
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts';

const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];
const revenueData = days.map((day, i) => ({
  day,
  revenue: mockDashboardStats.weeklyRevenue[i],
}));

const statusColors: Record<string, string> = {
  new: '#f59e0b',
  confirmed: '#3b82f6',
  in_production: '#8b5cf6',
  quality_check: '#06b6d4',
  ready: '#10b981',
  shipped: '#6366f1',
  completed: '#22c55e',
  cancelled: '#ef4444',
};

const statusLabels: Record<string, string> = {
  new: 'Нове',
  confirmed: 'Підтверджено',
  in_production: 'В роботі',
  quality_check: 'Перевірка',
  ready: 'Готове',
  shipped: 'Відвантажено',
  completed: 'Завершено',
  cancelled: 'Скасовано',
};

const statusData = Object.entries(mockDashboardStats.orderStatusBreakdown)
  .filter(([_, value]) => value > 0)
  .map(([status, count]) => ({
    name: statusLabels[status],
    value: count,
    color: statusColors[status],
  }));

export default function DashboardPage() {
  const { user } = useAuth();

  const recentOrders = [...mockOrders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const lowStock = getLowStockMaterials();
  const activeProduction = mockProductionOrders.filter(p => p.status === 'in_progress' || p.status === 'quality_check');

  const totalIncome = mockTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = mockTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <Layout title="Дашборд" subtitle={`Вітаємо, ${user?.name?.split(' ')[0]}!`}>
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Замовлень цього місяця</p>
                  <p className="text-3xl font-bold text-gray-900">{mockDashboardStats.ordersThisMonth}</p>
                  <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    <span>+12%</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#e94560]/10 to-[#e94560]/5 flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-[#e94560]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Сума замовлень</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {(mockDashboardStats.ordersAmountThisMonth / 1000).toFixed(0)}к ₴
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    <span>+8%</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#10b981]/10 to-[#10b981]/5 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-[#10b981]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">В виробництві</p>
                  <p className="text-3xl font-bold text-gray-900">{mockDashboardStats.productionInProgress}</p>
                  <div className="flex items-center gap-1 mt-2 text-sm text-gray-500">
                    <Factory className="w-4 h-4" />
                    <span>активних</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8b5cf6]/10 to-[#8b5cf6]/5 flex items-center justify-center">
                  <Activity className="w-6 h-6 text-[#8b5cf6]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Низький запас</p>
                  <p className="text-3xl font-bold text-gray-900">{mockDashboardStats.lowStockMaterials}</p>
                  <div className="flex items-center gap-1 mt-2 text-sm text-orange-600">
                    <AlertTriangle className="w-4 h-4" />
                    <span>потребує уваги</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#f59e0b]/10 to-[#f59e0b]/5 flex items-center justify-center">
                  <Package className="w-6 h-6 text-[#f59e0b]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Дохід за тиждень</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#e94560" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#e94560" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                    <YAxis 
                      tick={{ fontSize: 12 }} 
                      stroke="#9ca3af"
                      tickFormatter={(value) => `${value / 1000}к`}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        borderRadius: 8, 
                        border: 'none', 
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
                      }}
                      formatter={(value: number) => [`${value.toLocaleString()} ₴`, 'Дохід']}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#e94560" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorRevenue)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Статуси замовлень</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        borderRadius: 8, 
                        border: 'none', 
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap gap-2 ml-4 max-w-[140px]">
                  {statusData.map((item) => (
                    <div key={item.name} className="flex items-center gap-1.5 text-xs">
                      <div 
                        className="w-2.5 h-2.5 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-gray-600">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Low Stock */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <Card className="border-0 shadow-lg lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold">Останні замовлення</CardTitle>
              <Button variant="ghost" size="sm" className="text-[#e94560]">
                Всі замовлення <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <div 
                    key={order.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
                        <ShoppingBag className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{order.orderNumber}</p>
                        <p className="text-sm text-gray-500">{order.customerName}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        {order.totalAmount.toLocaleString()} ₴
                      </p>
                      <span 
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
                        style={{ 
                          backgroundColor: `${statusColors[order.status]}15`,
                          color: statusColors[order.status]
                        }}
                      >
                        {statusLabels[order.status]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Low Stock Alert */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Низький запас</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {lowStock.map((material) => (
                  <div 
                    key={material.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-orange-50"
                  >
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{material.name}</p>
                      <p className="text-xs text-gray-500">{material.sku}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-orange-600">{material.quantity} од.</p>
                      <p className="text-xs text-gray-500">мін: {material.minQuantity}</p>
                    </div>
                  </div>
                ))}
                {lowStock.length === 0 && (
                  <p className="text-center text-gray-500 py-4">Все в порядку!</p>
                )}
              </div>
              <Button className="w-full mt-4 bg-[#e94560] hover:bg-[#d63d56]" asChild>
                <a href="/inventory/materials">Поповнити запаси</a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Production Progress */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold">Виробничі замовлення</CardTitle>
            <Button variant="ghost" size="sm" className="text-[#e94560]">
              Всі <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeProduction.map((prod) => (
                <div 
                  key={prod.id}
                  className="p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-[#e94560]/30 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-gray-900">{prod.orderNumber}</span>
                    <span 
                      className="px-2 py-1 rounded-full text-xs font-medium"
                      style={{ 
                        backgroundColor: statusColors[prod.status] + '15',
                        color: statusColors[prod.status]
                      }}
                    >
                      {statusLabels[prod.status]}
                    </span>
                  </div>
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500">Прогрес</span>
                      <span className="font-medium text-gray-900">{prod.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#e94560] to-[#ff6b6b] rounded-full transition-all"
                        style={{ width: `${prod.progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(prod.estimatedEndDate).toLocaleDateString('uk-UA')}
                    </div>
                    <div className="flex items-center gap-1">
                      <Factory className="w-3 h-3" />
                      {prod.operations.filter(o => o.status === 'completed').length}/{prod.operations.length}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Finance Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-green-700">Дохід</p>
                  <p className="text-2xl font-bold text-green-800">{totalIncome.toLocaleString()} ₴</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-red-700">Витрати</p>
                  <p className="text-2xl font-bold text-red-800">{totalExpenses.toLocaleString()} ₴</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-[#e94560]/5 to-[#e94560]/10">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#e94560]/10 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-[#e94560]" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Прибуток</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {(totalIncome - totalExpenses).toLocaleString()} ₴
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}