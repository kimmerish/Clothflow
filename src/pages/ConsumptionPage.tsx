import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { mockMaterialConsumption, mockOrders } from '@/data/mockData';
import type { MaterialConsumption, ConsumableType } from '@/types';
import { cn } from '@/lib/utils';
import { 
  TrendingDown,
  Package,
  Scissors,
  Star,
  Diamond,
  Circle,
  Search,
  Plus,
  Filter,
  Calendar,
  DollarSign,
  PieChart,
  BarChart3,
  Download,
  ArrowDownRight,
  ArrowRight
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area
} from 'recharts';

const typeIcons: Record<ConsumableType, React.ElementType> = {
  fabric: Scissors,
  accessory: Package,
  lace: Star,
  rhinestone: Diamond,
  beads: Circle,
  thread: ArrowDownRight,
  other: Package,
};

const typeLabels: Record<ConsumableType, string> = {
  fabric: 'Тканини',
  accessory: 'Аксесуари',
  lace: 'Мереживо',
  rhinestone: 'Стrazy',
  beads: 'Бісер',
  thread: 'Нитки',
  other: 'Інше',
};

const typeColors: Record<ConsumableType, string> = {
  fabric: '#e94560',
  accessory: '#8b5cf6',
  lace: '#ec4899',
  rhinestone: '#a855f7',
  beads: '#f97316',
  thread: '#06b6d4',
  other: '#64748b',
};

const COLORS = ['#e94560', '#8b5cf6', '#ec4899', '#a855f7', '#f97316', '#06b6d4', '#64748b'];

export default function ConsumptionPage() {
  const [consumptions] = useState<MaterialConsumption[]>(mockMaterialConsumption);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<string>('all');

  const filteredConsumptions = consumptions.filter(c => {
    const matchesSearch = c.materialName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || c.consumableType === typeFilter;
    const matchesOrder = selectedOrder === 'all' || c.orderId === selectedOrder;
    return matchesSearch && matchesType && matchesOrder;
  });

  // Stats
  const totalCost = consumptions.reduce((sum, c) => sum + c.totalCost, 0);
  const totalQuantity = consumptions.reduce((sum, c) => sum + c.quantityUsed, 0);
  
  const costByType = Object.entries(typeLabels).map(([type, label]) => ({
    type: type as ConsumableType,
    label,
    cost: consumptions
      .filter(c => c.consumableType === type)
      .reduce((sum, c) => sum + c.totalCost, 0),
    quantity: consumptions
      .filter(c => c.consumableType === type)
      .reduce((sum, c) => sum + c.quantityUsed, 0),
  })).filter(item => item.cost > 0);

  const costByOrder = mockOrders.map(order => ({
    orderNumber: order.orderNumber,
    cost: consumptions
      .filter(c => c.orderId === order.id)
      .reduce((sum, c) => sum + c.totalCost, 0),
  })).filter(item => item.cost > 0);

  // Chart data
  const pieData = costByType.map(item => ({
    name: item.label,
    value: item.cost,
  }));

  const barData = costByOrder.slice(0, 6);

  const topMaterials = [...consumptions]
    .sort((a, b) => b.totalCost - a.totalCost)
    .slice(0, 5);

  return (
    <Layout title="Витрати матеріалів" subtitle="Облік та аналітика витрат">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-600">Всього витрат</p>
                  <p className="text-2xl font-bold text-red-700">{totalCost.toLocaleString()} ₴</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Одиниць використано</p>
                  <p className="text-2xl font-bold text-gray-900">{totalQuantity.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#8b5cf6]/10 flex items-center justify-center">
                  <Package className="w-6 h-6 text-[#8b5cf6]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Замовлень з витратами</p>
                  <p className="text-2xl font-bold text-gray-900">{costByOrder.length}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#10b981]/10 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-[#10b981]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Середнє на замовлення</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {costByOrder.length > 0 
                      ? Math.round(totalCost / costByOrder.length).toLocaleString() 
                      : 0} ₴
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#f59e0b]/10 flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-[#f59e0b]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Витрати за типами матеріалів</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={90}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {pieData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                      formatter={(value: number) => [`${value.toLocaleString()} ₴`]}
                    />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Витрати по замовленнях</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="orderNumber" tick={{ fontSize: 10 }} stroke="#9ca3af" />
                    <YAxis 
                      tick={{ fontSize: 12 }} 
                      stroke="#9ca3af"
                      tickFormatter={(value) => `${value / 1000}к`}
                    />
                    <Tooltip 
                      contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                      formatter={(value: number) => [`${value.toLocaleString()} ₴`]}
                    />
                    <Bar dataKey="cost" fill="#e94560" radius={[4, 4, 0, 0]} name="Витрати" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="list" className="space-y-4">
          <TabsList className="bg-white border shadow-sm">
            <TabsTrigger value="list" className="gap-2">
              <Package className="w-4 h-4" />
              Список витрат
            </TabsTrigger>
            <TabsTrigger value="by-type" className="gap-2">
              <PieChart className="w-4 h-4" />
              По типах
            </TabsTrigger>
            <TabsTrigger value="by-order" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              По замовленнях
            </TabsTrigger>
          </TabsList>

          {/* List Tab */}
          <TabsContent value="list" className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="flex gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Пошук матеріалу..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full sm:w-[300px]"
                  />
                </div>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Тип" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Всі типи</SelectItem>
                    {Object.entries(typeLabels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedOrder} onValueChange={setSelectedOrder}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Замовлення" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Всі замовлення</SelectItem>
                    {mockOrders.map((order) => (
                      <SelectItem key={order.id} value={order.id}>
                        {order.orderNumber}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#e94560] hover:bg-[#d63d56]">
                    <Plus className="w-4 h-4 mr-2" />
                    Додати витрату
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Додати витрату матеріалів</DialogTitle>
                    <DialogDescription>
                      Зафіксувати використання матеріалів для замовлення
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Замовлення</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Виберіть замовлення" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockOrders.map((order) => (
                            <SelectItem key={order.id} value={order.id}>
                              {order.orderNumber}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Матеріал</label>
                        <Input placeholder="Назва матеріалу" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Тип</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Тип" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(typeLabels).map(([value, label]) => (
                              <SelectItem key={value} value={value}>
                                {label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Кількість</label>
                        <Input type="number" placeholder="0" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Одиниця</label>
                        <Input placeholder="метрів" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Ціна</label>
                        <Input type="number" placeholder="0" />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                      Скасувати
                    </Button>
                    <Button className="bg-[#e94560] hover:bg-[#d63d56]">
                      Додати
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-semibold">Матеріал</TableHead>
                      <TableHead className="font-semibold">Тип</TableHead>
                      <TableHead className="font-semibold">Замовлення</TableHead>
                      <TableHead className="font-semibold">Кількість</TableHead>
                      <TableHead className="font-semibold">Ціна</TableHead>
                      <TableHead className="font-semibold text-right">Сума</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredConsumptions.map((consumption) => {
                      const Icon = typeIcons[consumption.consumableType] || Package;
                      const color = typeColors[consumption.consumableType];
                      
                      return (
                        <TableRow key={consumption.id} className="hover:bg-gray-50/50">
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Icon className="w-4 h-4" style={{ color }} />
                              <span className="font-medium">{consumption.materialName}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="secondary"
                              style={{ 
                                backgroundColor: `${color}15`,
                                color: color
                              }}
                            >
                              {typeLabels[consumption.consumableType]}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">{consumption.orderNumber}</span>
                          </TableCell>
                          <TableCell>
                            {consumption.quantityUsed} {consumption.unit}
                          </TableCell>
                          <TableCell>
                            {consumption.unitPrice} ₴
                          </TableCell>
                          <TableCell className="text-right font-medium text-red-600">
                            {consumption.totalCost.toLocaleString()} ₴
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* By Type Tab */}
          <TabsContent value="by-type" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {costByType.map((item) => {
                const Icon = typeIcons[item.type] || Package;
                const color = typeColors[item.type];
                const percentage = (item.cost / totalCost) * 100;
                
                return (
                  <Card key={item.type} className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${color}15` }}
                        >
                          <Icon className="w-6 h-6" style={{ color }} />
                        </div>
                        <div>
                          <p className="font-semibold">{item.label}</p>
                          <p className="text-sm text-gray-500">{percentage.toFixed(1)}% від загальних</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Витрати</span>
                          <span className="font-semibold">{item.cost.toLocaleString()} ₴</span>
                        </div>
                        <Progress value={percentage} className="h-2" style={{ 
                          ['--tw-progress-percent' as string]: `${percentage}%`
                        }} />
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Кількість</span>
                          <span className="font-semibold">{item.quantity.toLocaleString()} од.</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* By Order Tab */}
          <TabsContent value="by-order" className="space-y-4">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {costByOrder.map((item, index) => {
                    const order = mockOrders.find(o => o.orderNumber === item.orderNumber);
                    const percentage = (item.cost / totalCost) * 100;
                    
                    return (
                      <div 
                        key={item.orderNumber}
                        className="flex items-center gap-4 p-4 rounded-lg bg-gray-50"
                      >
                        <div className="w-8 h-8 rounded-full bg-[#e94560] text-white flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium">{item.orderNumber}</span>
                            <span className="font-semibold text-red-600">{item.cost.toLocaleString()} ₴</span>
                          </div>
                          <Progress value={percentage} className="h-2" />
                          <p className="text-xs text-gray-500 mt-1">
                            {percentage.toFixed(1)}% від загальних витрат
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Top Materials */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold">Найвитратніші матеріали</CardTitle>
              <CardDescription>Топ 5 матеріалів за вартістю</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Експорт
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topMaterials.map((material, index) => {
                const percentage = (material.totalCost / totalCost) * 100;
                const Icon = typeIcons[material.consumableType] || Package;
                const color = typeColors[material.consumableType];
                
                return (
                  <div key={material.id} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${color}15` }}
                    >
                      <Icon className="w-5 h-5" style={{ color }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="font-medium">{material.materialName}</p>
                        <p className="font-semibold text-red-600">{material.totalCost.toLocaleString()} ₴</p>
                      </div>
                      <Progress value={percentage} className="h-1 mt-1" />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}