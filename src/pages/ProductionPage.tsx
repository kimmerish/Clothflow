import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockProductionOrders, mockOrders } from '@/data/mockData';
import type { ProductionOrder, ProductionStatus, ProductionOperation, OperationType } from '@/types';
import { cn } from '@/lib/utils';
import { 
  Plus, 
  Clock,
  Factory,
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
  ChevronRight,
  ArrowRight
} from 'lucide-react';

const statusConfig: Record<ProductionStatus, { label: string; color: string; icon: React.ElementType }> = {
  planned: { label: 'Заплановано', color: '#64748b', icon: Clock },
  in_progress: { label: 'В роботі', color: '#8b5cf6', icon: Play },
  quality_check: { label: 'Перевірка', color: '#06b6d4', icon: ClipboardCheck },
  completed: { label: 'Завершено', color: '#10b981', icon: CheckCircle2 },
  on_hold: { label: 'Призупинено', color: '#f59e0b', icon: Pause },
};

const operationIcons: Record<OperationType, React.ElementType> = {
  cutting: Scissors,
  sewing: Factory,
  finishing: RotateCcw,
  quality_control: ClipboardCheck,
  packaging: Package,
};

const operationLabels: Record<OperationType, string> = {
  cutting: 'Крій',
  sewing: 'Пошив',
  finishing: 'ВТО',
  quality_control: 'Контроль',
  packaging: 'Пакування',
};

const operationColors: Record<OperationType, string> = {
  cutting: '#e94560',
  sewing: '#8b5cf6',
  finishing: '#06b6d4',
  quality_control: '#f59e0b',
  packaging: '#10b981',
};

const columns: ProductionStatus[] = ['planned', 'in_progress', 'quality_check', 'completed'];

export default function ProductionPage() {
  const [productionOrders, setProductionOrders] = useState<ProductionOrder[]>(mockProductionOrders);
  const [selectedOrder, setSelectedOrder] = useState<ProductionOrder | null>(null);

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

  const handleOperationComplete = (orderId: string, operationId: string) => {
    setProductionOrders(orders =>
      orders.map(order => {
        if (order.id !== orderId) return order;
        
        const updatedOperations = order.operations.map(op => {
          if (op.id !== operationId) return op;
          return { 
            ...op, 
            status: 'completed' as ProductionStatus,
            endDate: new Date()
          };
        });

        const completedCount = updatedOperations.filter(op => op.status === 'completed').length;
        const progress = Math.round((completedCount / updatedOperations.length) * 100);

        return { ...order, operations: updatedOperations, progress };
      })
    );
  };

  return (
    <Layout title="Виробництво" subtitle="Управління виробничими замовленнями">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Object.entries(statusConfig).map(([status, config]) => {
            const count = productionOrders.filter(o => o.status === status).length;
            const Icon = config.icon;
            
            return (
              <Card key={status} className="border-0 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${config.color}15` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: config.color }} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold" style={{ color: config.color }}>{count}</p>
                      <p className="text-xs text-gray-500">{config.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {columns.map((columnStatus) => {
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
                  {columnOrders.map((order) => (
                    <Card 
                      key={order.id} 
                      className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="font-semibold text-gray-900">{order.orderNumber}</p>
                            <p className="text-xs text-gray-500">
                              {mockOrders.find(o => o.id === order.orderId)?.customerName}
                            </p>
                          </div>
                          <Badge 
                            variant="outline"
                            className="text-xs"
                          >
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

                        {/* Operations */}
                        <div className="flex items-center gap-1 mb-3">
                          {order.operations.map((op, index) => {
                            const OpIcon = operationIcons[op.type];
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
                        </div>

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

                        {/* Quick Actions */}
                        {columnStatus !== 'completed' && (
                          <div className="flex gap-2 mt-3">
                            {columnStatus === 'planned' && (
                              <Button 
                                size="sm" 
                                className="flex-1 bg-purple-600 hover:bg-purple-700"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  moveToColumn(order.id, 'in_progress');
                                }}
                              >
                                <Play className="w-3 h-3 mr-1" />
                                Почати
                              </Button>
                            )}
                            {columnStatus === 'in_progress' && (
                              <Button 
                                size="sm" 
                                className="flex-1 bg-cyan-600 hover:bg-cyan-700"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  moveToColumn(order.id, 'quality_check');
                                }}
                              >
                                <ClipboardCheck className="w-3 h-3 mr-1" />
                                на перевірку
                              </Button>
                            )}
                            {columnStatus === 'quality_check' && (
                              <Button 
                                size="sm" 
                                className="flex-1 bg-green-600 hover:bg-green-700"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  moveToColumn(order.id, 'completed');
                                }}
                              >
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                Завершити
                              </Button>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                  
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

        {/* Order Details Modal */}
        {selectedOrder && (
          <div 
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedOrder(null)}
          >
            <Card 
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Виробниче замовлення {selectedOrder.orderNumber}</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">
                    Замовлення: {mockOrders.find(o => o.id === selectedOrder.orderId)?.orderNumber}
                  </p>
                </div>
                <Badge 
                  style={{ 
                    backgroundColor: `${statusConfig[selectedOrder.status].color}15`,
                    color: statusConfig[selectedOrder.status].color
                  }}
                >
                  {statusConfig[selectedOrder.status].label}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Progress */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500">Загальний прогрес</span>
                    <span className="font-medium">{selectedOrder.progress}%</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#e94560] to-[#ff6b6b] rounded-full transition-all"
                      style={{ width: `${selectedOrder.progress}%` }}
                    />
                  </div>
                </div>

                {/* Operations Timeline */}
                <div className="space-y-3">
                  <h3 className="font-semibold">Операції</h3>
                  {selectedOrder.operations.map((operation, index) => {
                    const OpIcon = operationIcons[operation.type];
                    const isCompleted = operation.status === 'completed';
                    const isInProgress = operation.status === 'in_progress';
                    
                    return (
                      <div 
                        key={operation.id}
                        className={cn(
                          "flex items-center gap-4 p-3 rounded-lg border",
                          isCompleted ? "bg-green-50 border-green-200" : 
                          isInProgress ? "bg-purple-50 border-purple-200" :
                          "bg-gray-50 border-gray-200"
                        )}
                      >
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: isCompleted ? '#10b981' : isInProgress ? '#8b5cf6' : '#e2e8f0' }}
                        >
                          <OpIcon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{operation.name}</p>
                            {isCompleted && (
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                            )}
                          </div>
                          <p className="text-xs text-gray-500">
                            {operationLabels[operation.type]}
                          </p>
                        </div>
                        {operation.startDate && (
                          <div className="text-xs text-gray-500 text-right">
                            <p>Початок:</p>
                            <p>{new Date(operation.startDate).toLocaleDateString('uk-UA')}</p>
                          </div>
                        )}
                        {operation.endDate && (
                          <div className="text-xs text-gray-500 text-right">
                            <p>Кінець:</p>
                            <p>{new Date(operation.endDate).toLocaleDateString('uk-UA')}</p>
                          </div>
                        )}
                        {!isCompleted && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleOperationComplete(selectedOrder.id, operation.id)}
                          >
                            <CheckCircle2 className="w-4 h-4 mr-1" />
                            Виконано
                          </Button>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-500">Дата початку</p>
                    <p className="font-medium">
                      {new Date(selectedOrder.startDate).toLocaleDateString('uk-UA')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Планова дата завершення</p>
                    <p className="font-medium">
                      {new Date(selectedOrder.estimatedEndDate).toLocaleDateString('uk-UA')}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button variant="outline" onClick={() => setSelectedOrder(null)}>
                    Закрити
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
}