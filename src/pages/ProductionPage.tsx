import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  mockProductionOrders, 
  mockOrders, 
  mockGarmentModels,
  mockProcessTemplates,
  mockSizeTables,
  mockUsers,
  mockFittingStages,
  productionRoleLabels,
  productionRoleColors,
} from '@/data/mockData';
import type { 
  ProductionOrder, 
  ProductionStatus, 
  ProductionType,
  ProductionOperation,
  ProductionRole,
  SizeGradation,
  FittingStage,
  GarmentModel,
} from '@/types';
import { cn } from '@/lib/utils';
import { 
  Plus, 
  Factory,
  Clock,
  CheckCircle2,
  AlertCircle,
  Pause,
  Play,
  Package,
  Scissors,
  RotateCcw,
  ClipboardCheck,
  Box,
  Calendar,
  Users,
  Settings,
  ChevronRight,
  Eye,
  Ruler,
  Layers,
  Shirt,
  Maximize2,
  Minimize2,
  Ruler as RulerIcon,
  User,
  Image,
  FileText,
  ClipboardList,
  Edit3,
  Save,
  X,
  GripVertical,
  Trash2,
  UserCircle
} from 'lucide-react';

const statusConfig: Record<ProductionStatus, { label: string; color: string; icon: React.ElementType }> = {
  planned: { label: 'Заплановано', color: '#64748b', icon: Clock },
  in_progress: { label: 'В роботі', color: '#8b5cf6', icon: Play },
  quality_check: { label: 'Перевірка', color: '#06b6d4', icon: ClipboardCheck },
  completed: { label: 'Завершено', color: '#10b981', icon: CheckCircle2 },
  on_hold: { label: 'Призупинено', color: '#f59e0b', icon: Pause },
};

const operationIcons: Record<string, React.ElementType> = {
  design: Edit3,
  pattern: RulerIcon,
  tech_process: FileText,
  cutting: Scissors,
  sewing: Shirt,
  fitting: User,
  finishing: RotateCcw,
  quality_control: ClipboardCheck,
  packaging: Package,
};

const operationLabels: Record<string, string> = {
  design: 'Дизайн',
  pattern: 'Викрійка',
  tech_process: 'Технологія',
  cutting: 'Крій',
  sewing: 'Пошив',
  fitting: 'Примірка',
  finishing: 'ВТО',
  quality_control: 'Контроль',
  packaging: 'Пакування',
};

const operationColors: Record<string, string> = {
  design: '#e94560',
  pattern: '#8b5cf6',
  tech_process: '#06b6d4',
  cutting: '#f59e0b',
  sewing: '#10b981',
  fitting: '#f97316',
  finishing: '#ec4899',
  quality_control: '#64748b',
  packaging: '#a855f7',
};

export default function ProductionPage() {
  const [productionOrders, setProductionOrders] = useState<ProductionOrder[]>(mockProductionOrders);
  const [selectedOrder, setSelectedOrder] = useState<ProductionOrder | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingOperations, setEditingOperations] = useState<ProductionOperation[]>([]);
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');

  const productionStaff = mockUsers.filter(u => 
    ['designer', 'pattern_maker', 'technologist', 'cutter', 'seamstress', 'finisher', 'qc_inspector', 'packer'].includes(u.role as string)
  );

  const moveToColumn = (orderId: string, newStatus: ProductionStatus) => {
    setProductionOrders(orders => 
      orders.map(order => 
        order.id === orderId 
          ? { 
              ...order, 
              status: newStatus,
              progress: newStatus === 'completed' ? 100 : newStatus === 'quality_check' ? 80 : newStatus === 'in_progress' ? 40 : 0
            } 
          : order
      )
    );
  };

  const openEditor = (order: ProductionOrder) => {
    setSelectedOrder(order);
    setEditingOperations([...order.operations]);
    setIsEditOpen(true);
  };

  const updateOperation = (opId: string, updates: Partial<ProductionOperation>) => {
    setEditingOperations(ops =>
      ops.map(op => op.id === opId ? { ...op, ...updates } : op)
    );
  };

  const saveOperations = () => {
    if (!selectedOrder) return;
    
    setProductionOrders(orders =>
      orders.map(order =>
        order.id === selectedOrder.id
          ? { ...order, operations: editingOperations }
          : order
      )
    );
    setIsEditOpen(false);
  };

  const getFittingStages = (orderId: string) => {
    return mockFittingStages.filter(f => f.orderId === orderId);
  };

  const getOrderType = (orderId: string): ProductionType => {
    // For demo: order_3 is individual
    return orderId === 'order_3' ? 'individual' : 'serial';
  };

  const getOrderGradations = (orderId: string): SizeGradation[] | null => {
    const order = mockOrders.find(o => o.id === orderId);
    if (!order) return null;
    
    const sizeTable = mockSizeTables[0]; // Demo: use first table
    return sizeTable.gradations.map(g => ({
      ...g,
      quantity: order.items.reduce((sum, item) => {
        if (item.size === g.size || item.size === g.code) {
          return sum + item.quantity;
        }
        return sum;
      }, 0)
    }));
  };

  return (
    <Layout title="Виробництво" subtitle="Управління виробничими замовленнями">
      <div className="space-y-6">
        {/* Stats & Controls */}
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
            {Object.entries(statusConfig).map(([status, config]) => {
              const count = productionOrders.filter(o => o.status === status).length;
              const Icon = config.icon;
              
              return (
                <Card key={status} className="border-0 shadow-md">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${config.color}15` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: config.color }} />
                      </div>
                      <div>
                        <p className="text-xl font-bold" style={{ color: config.color }}>{count}</p>
                        <p className="text-xs text-gray-500">{config.label}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'kanban' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('kanban')}
              className={viewMode === 'kanban' ? 'bg-[#e94560] hover:bg-[#d63d56]' : ''}
            >
              <Layers className="w-4 h-4 mr-1" />
              Канбан
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'bg-[#e94560] hover:bg-[#d63d56]' : ''}
            >
              <ClipboardList className="w-4 h-4 mr-1" />
              Список
            </Button>
          </div>
        </div>

        {/* Kanban View */}
        {viewMode === 'kanban' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {(['planned', 'in_progress', 'quality_check', 'completed'] as ProductionStatus[]).map((columnStatus) => {
              const config = statusConfig[columnStatus];
              const columnOrders = productionOrders.filter(o => o.status === columnStatus);
              const Icon = config.icon;
              
              return (
                <div key={columnStatus} className="flex flex-col">
                  <div 
                    className="flex items-center gap-2 p-3 rounded-t-xl"
                    style={{ backgroundColor: `${config.color}15` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: config.color }} />
                    <span className="font-semibold" style={{ color: config.color }}>
                      {config.label}
                    </span>
                    <Badge 
                      variant="secondary" 
                      className="ml-auto bg-white"
                      style={{ color: config.color }}
                    >
                      {columnOrders.length}
                    </Badge>
                  </div>
                  
                  <div className="flex-1 bg-gray-50 rounded-b-xl p-3 space-y-3 min-h-[400px]">
                    {columnOrders.map((order) => {
                      const orderData = mockOrders.find(o => o.id === order.orderId);
                      const type = getOrderType(order.orderId);
                      const fittings = getFittingStages(order.orderId);
                      
                      return (
                        <Card 
                          key={order.id} 
                          className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                          onClick={() => openEditor(order)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="font-semibold text-gray-900">{order.orderNumber}</p>
                                  <Badge 
                                    variant="outline" 
                                    className="text-xs"
                                    style={{ 
                                      borderColor: type === 'serial' ? '#10b981' : '#f59e0b',
                                      color: type === 'serial' ? '#10b981' : '#f59e0b'
                                    }}
                                  >
                                    {type === 'serial' ? 'Серія' : 'Інд.'}
                                  </Badge>
                                </div>
                                <p className="text-xs text-gray-500">
                                  {orderData?.customerName}
                                </p>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {order.progress}%
                              </Badge>
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-3">
                              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className="h-full rounded-full transition-all"
                                  style={{ 
                                    width: `${order.progress}%`,
                                    backgroundColor: config.color
                                  }}
                                />
                              </div>
                            </div>

                            {/* Operations Mini View */}
                            <div className="flex items-center gap-1 mb-3 flex-wrap">
                              {order.operations.slice(0, 5).map((op) => {
                                const OpIcon = operationIcons[op.type] || Settings;
                                return (
                                  <div
                                    key={op.id}
                                    className={cn(
                                      "w-6 h-6 rounded-full flex items-center justify-center",
                                      op.status === 'completed' 
                                        ? "bg-green-500" 
                                        : op.status === 'in_progress'
                                          ? "bg-purple-500"
                                          : "bg-gray-200"
                                    )}
                                    title={operationLabels[op.type]}
                                  >
                                    <OpIcon className="w-3 h-3 text-white" />
                                  </div>
                                );
                              })}
                              {order.operations.length > 5 && (
                                <span className="text-xs text-gray-400">+{order.operations.length - 5}</span>
                              )}
                            </div>

                            {/* Fitting indicator for individual */}
                            {type === 'individual' && fittings.length > 0 && (
                              <div className="mb-3 p-2 bg-orange-50 rounded-lg">
                                <p className="text-xs text-orange-600 font-medium flex items-center gap-1">
                                  <User className="w-3 h-3" />
                                  Примірки: {fittings.filter(f => f.status === 'completed').length}/{fittings.length}
                                </p>
                              </div>
                            )}

                            {/* Size gradation for serial */}
                            {type === 'serial' && (
                              <div className="mb-3 p-2 bg-blue-50 rounded-lg">
                                <p className="text-xs text-blue-600 font-medium flex items-center gap-1">
                                  <RulerIcon className="w-3 h-3" />
                                  Градація розмірів
                                </p>
                              </div>
                            )}

                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(order.estimatedEndDate).toLocaleDateString('uk-UA')}
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {order.workers.length}
                              </div>
                            </div>

                            {columnStatus !== 'completed' && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="w-full mt-3 text-xs"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openEditor(order);
                                }}
                              >
                                <Settings className="w-3 h-3 mr-1" />
                                Редагувати
                              </Button>
                            )}
                          </CardContent>
                        </Card>
                      );
                    })}
                    
                    {columnOrders.length === 0 && (
                      <div className="flex items-center justify-center h-32 text-gray-400 text-sm">
                        Немає замовлень
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* List View */
          <Card className="border-0 shadow-lg">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold">Замовлення</TableHead>
                    <TableHead className="font-semibold">Тип</TableHead>
                    <TableHead className="font-semibold">Статус</TableHead>
                    <TableHead className="font-semibold">Прогрес</TableHead>
                    <TableHead className="font-semibold">Операції</TableHead>
                    <TableHead className="font-semibold text-right">Дії</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productionOrders.map((order) => {
                    const orderData = mockOrders.find(o => o.id === order.orderId);
                    const type = getOrderType(order.orderId);
                    const config = statusConfig[order.status];
                    
                    return (
                      <TableRow key={order.id} className="hover:bg-gray-50/50">
                        <TableCell>
                          <div>
                            <p className="font-medium">{order.orderNumber}</p>
                            <p className="text-sm text-gray-500">{orderData?.customerName}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline"
                            style={{ 
                              borderColor: type === 'serial' ? '#10b981' : '#f59e0b',
                              color: type === 'serial' ? '#10b981' : '#f59e0b'
                            }}
                          >
                            {type === 'serial' ? 'Серійний' : 'Індивідуальний'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="secondary"
                            style={{ 
                              backgroundColor: `${config.color}15`,
                              color: config.color
                            }}
                          >
                            {config.label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={order.progress} className="h-2 w-20" />
                            <span className="text-sm font-medium">{order.progress}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">
                            {order.operations.filter(o => o.status === 'completed').length}/{order.operations.length}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => openEditor(order)}
                          >
                            <Settings className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Production Editor Modal */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedOrder && (
              <>
                <DialogHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <DialogTitle>Виробниче замовлення {selectedOrder.orderNumber}</DialogTitle>
                      <DialogDescription>
                        Редагування виробничого процесу
                      </DialogDescription>
                    </div>
                    <Badge 
                      variant="outline"
                      style={{ 
                        borderColor: getOrderType(selectedOrder.orderId) === 'serial' ? '#10b981' : '#f59e0b',
                        color: getOrderType(selectedOrder.orderId) === 'serial' ? '#10b981' : '#f59e0b'
                      }}
                    >
                      {getOrderType(selectedOrder.orderId) === 'serial' ? 'Серійний' : 'Індивідуальний'}
                    </Badge>
                  </div>
                </DialogHeader>

                <div className="space-y-6">
                  {/* Garment Preview */}
                  <Card className="border-0 bg-gray-50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        Прев'ю виробу
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-4">
                        <div className="w-40 h-48 bg-white rounded-lg border-2 border-dashed flex items-center justify-center overflow-hidden">
                          <img 
                            src="https://picsum.photos/seed/dress2/200/300" 
                            alt="Preview" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="p-2 bg-white rounded">
                              <p className="text-gray-500">Модель:</p>
                              <p className="font-medium">Сукня вечірня "Рококо"</p>
                            </div>
                            <div className="p-2 bg-white rounded">
                              <p className="text-gray-500">Артикул:</p>
                              <p className="font-medium">GM-DR-001</p>
                            </div>
                            <div className="p-2 bg-white rounded">
                              <p className="text-gray-500">Тканина:</p>
                              <p className="font-medium">Базова тканина чорна</p>
                            </div>
                            <div className="p-2 bg-white rounded">
                              <p className="text-gray-500">Колір:</p>
                              <p className="font-medium">Чорний</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Serial: Size Gradations */}
                  {getOrderType(selectedOrder.orderId) === 'serial' && (
                    <Card className="border-0 bg-blue-50/50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                          <RulerIcon className="w-4 h-4 text-blue-600" />
                          Градація розмірів
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                          {getOrderGradations(selectedOrder.orderId)?.filter(g => g.quantity > 0).map((g) => (
                            <div key={g.size} className="p-2 bg-white rounded-lg text-center">
                              <p className="font-bold text-lg">{g.size}</p>
                              <p className="text-xs text-gray-500">Розмір {g.code}</p>
                              <p className="text-sm font-medium text-blue-600">{g.quantity} шт</p>
                            </div>
                          ))}
                        </div>
                        {(!getOrderGradations(selectedOrder.orderId)?.filter(g => g.quantity > 0).length) && (
                          <p className="text-sm text-gray-500 text-center py-4">
                            Градація не визначена
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  )}

                  {/* Individual: Measurements & Fittings */}
                  {getOrderType(selectedOrder.orderId) === 'individual' && (
                    <>
                      <Card className="border-0 bg-orange-50/50">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base flex items-center gap-2">
                            <UserCircle className="w-4 h-4 text-orange-600" />
                            Параметри замовника
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <div className="p-2 bg-white rounded-lg">
                              <p className="text-xs text-gray-500">Обхват грудей</p>
                              <p className="font-medium">92 см</p>
                            </div>
                            <div className="p-2 bg-white rounded-lg">
                              <p className="text-xs text-gray-500">Обхват талії</p>
                              <p className="font-medium">72 см</p>
                            </div>
                            <div className="p-2 bg-white rounded-lg">
                              <p className="text-xs text-gray-500">Обхват стегон</p>
                              <p className="font-medium">96 см</p>
                            </div>
                            <div className="p-2 bg-white rounded-lg">
                              <p className="text-xs text-gray-500">Зріст</p>
                              <p className="font-medium">168 см</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-0 bg-orange-50/50">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base flex items-center gap-2">
                            <UserCircle className="w-4 h-4 text-orange-600" />
                            Етапи примірок
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {getFittingStages(selectedOrder.orderId).map((fitting, index) => (
                              <div 
                                key={fitting.id}
                                className={cn(
                                  "flex items-center justify-between p-3 rounded-lg border",
                                  fitting.status === 'completed' && "bg-green-50 border-green-200",
                                  fitting.status === 'in_progress' && "bg-blue-50 border-blue-200",
                                  fitting.status === 'scheduled' && "bg-white border-gray-200"
                                )}
                              >
                                <div className="flex items-center gap-3">
                                  <div className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold",
                                    fitting.status === 'completed' && "bg-green-500",
                                    fitting.status === 'in_progress' && "bg-blue-500",
                                    fitting.status === 'scheduled' && "bg-gray-400"
                                  )}>
                                    {index + 1}
                                  </div>
                                  <div>
                                    <p className="font-medium">{fitting.name}</p>
                                    <p className="text-xs text-gray-500">{fitting.description}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  {fitting.scheduledDate && (
                                    <Badge variant="outline" className="text-xs">
                                      {new Date(fitting.scheduledDate).toLocaleDateString('uk-UA')}
                                    </Badge>
                                  )}
                                  {fitting.approved && (
                                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </>
                  )}

                  {/* Production Operations */}
                  <Card className="border-0">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Settings className="w-4 h-4" />
                        Виробничі операції
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {editingOperations.map((op, index) => {
                          const OpIcon = operationIcons[op.type] || Settings;
                          const color = operationColors[op.type] || '#64748b';
                          const role = op.role as ProductionRole;
                          
                          return (
                            <div 
                              key={op.id}
                              className={cn(
                                "flex items-center gap-3 p-3 rounded-lg border transition-all",
                                op.status === 'completed' && "bg-green-50 border-green-200",
                                op.status === 'in_progress' && "bg-purple-50 border-purple-200",
                                op.status === 'planned' && "bg-gray-50 border-gray-200"
                              )}
                            >
                              <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
                              
                              <div 
                                className="w-10 h-10 rounded-lg flex items-center justify-center"
                                style={{ backgroundColor: `${color}15` }}
                              >
                                <OpIcon className="w-5 h-5" style={{ color }} />
                              </div>
                              
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <p className="font-medium">{op.name}</p>
                                  <Badge 
                                    variant="secondary" 
                                    className="text-xs"
                                    style={{ 
                                      backgroundColor: `${productionRoleColors[role] || '#64748b'}15`,
                                      color: productionRoleColors[role] || '#64748b'
                                    }}
                                  >
                                    {productionRoleLabels[role] || op.role}
                                  </Badge>
                                </div>
                                {op.description && (
                                  <p className="text-xs text-gray-500">{op.description}</p>
                                )}
                              </div>

                              <div className="flex items-center gap-2">
                                <Select
                                  value={op.status}
                                  onValueChange={(value) => updateOperation(op.id, { status: value as ProductionStatus })}
                                >
                                  <SelectTrigger className="w-[130px] h-8">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="planned">Заплановано</SelectItem>
                                    <SelectItem value="in_progress">В роботі</SelectItem>
                                    <SelectItem value="quality_check">Перевірка</SelectItem>
                                    <SelectItem value="completed">Завершено</SelectItem>
                                    <SelectItem value="on_hold">Призупинено</SelectItem>
                                  </SelectContent>
                                </Select>

                                <Select
                                  value={op.assignedTo || ''}
                                  onValueChange={(value) => updateOperation(op.id, { 
                                    assignedTo: value,
                                    assignedToName: productionStaff.find(s => s.id === value)?.name
                                  })}
                                >
                                  <SelectTrigger className="w-[150px] h-8">
                                    <SelectValue placeholder="Виконавець" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {productionStaff.map((staff) => (
                                      <SelectItem key={staff.id} value={staff.id}>
                                        {staff.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                    Скасувати
                  </Button>
                  <Button 
                    className="bg-[#e94560] hover:bg-[#d63d56]"
                    onClick={saveOperations}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Зберегти
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}