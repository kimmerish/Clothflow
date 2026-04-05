import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
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
import { mockOrders, mockCustomers } from '@/data/mockData';
import type { Order, OrderStatus, OrderItem } from '@/types';
import { cn } from '@/lib/utils';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Package,
  Calendar,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  Clock
} from 'lucide-react';

const statusColors: Record<OrderStatus, string> = {
  new: '#f59e0b',
  confirmed: '#3b82f6',
  in_production: '#8b5cf6',
  quality_check: '#06b6d4',
  ready: '#10b981',
  shipped: '#6366f1',
  completed: '#22c55e',
  cancelled: '#ef4444',
};

const statusLabels: Record<OrderStatus, string> = {
  new: 'Нове',
  confirmed: 'Підтверджено',
  in_production: 'В роботі',
  quality_check: 'Перевірка',
  ready: 'Готове',
  shipped: 'Відвантажено',
  completed: 'Завершено',
  cancelled: 'Скасовано',
};

const statusOptions = Object.entries(statusLabels).map(([value, label]) => ({
  value,
  label,
}));

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // New order form state
  const [newOrder, setNewOrder] = useState({
    customerId: '',
    items: [{ productName: '', size: '', color: '', quantity: 1, unitPrice: 0 }],
    deadline: '',
    notes: '',
  });

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCreateOrder = () => {
    const orderNumber = `FF-2024-${String(orders.length + 1).padStart(3, '0')}`;
    const customer = mockCustomers.find(c => c.id === newOrder.customerId);
    
    const totalAmount = newOrder.items.reduce((sum, item) => 
      sum + (item.quantity * item.unitPrice), 0
    );

    const items: OrderItem[] = newOrder.items.map((item, index) => ({
      id: `item_${Date.now()}_${index}`,
      productId: `prod_${Date.now()}_${index}`,
      productName: item.productName,
      size: item.size,
      color: item.color,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      totalPrice: item.quantity * item.unitPrice,
    }));

    const order: Order = {
      id: `order_${Date.now()}`,
      orderNumber,
      customerId: newOrder.customerId,
      customerName: customer?.name || '',
      items,
      totalAmount,
      status: 'new',
      deadline: new Date(newOrder.deadline),
      createdAt: new Date(),
      notes: newOrder.notes,
    };

    setOrders([order, ...orders]);
    setIsCreateDialogOpen(false);
    setNewOrder({
      customerId: '',
      items: [{ productName: '', size: '', color: '', quantity: 1, unitPrice: 0 }],
      deadline: '',
      notes: '',
    });
  };

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const handleDeleteOrder = (orderId: string) => {
    setOrders(orders.filter(order => order.id !== orderId));
  };

  const addItem = () => {
    setNewOrder({
      ...newOrder,
      items: [...newOrder.items, { productName: '', size: '', color: '', quantity: 1, unitPrice: 0 }],
    });
  };

  const updateItem = (index: number, field: string, value: string | number) => {
    const updatedItems = [...newOrder.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setNewOrder({ ...newOrder, items: updatedItems });
  };

  const removeItem = (index: number) => {
    setNewOrder({
      ...newOrder,
      items: newOrder.items.filter((_, i) => i !== index),
    });
  };

  const viewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsViewDialogOpen(true);
  };

  return (
    <Layout title="Замовлення" subtitle="Управління замовленнями клієнтів">
      <div className="space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Пошук замовлень..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full sm:w-[300px]"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Статус" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Всі статуси</SelectItem>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#e94560] hover:bg-[#d63d56]">
                <Plus className="w-4 h-4 mr-2" />
                Нове замовлення
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Створити замовлення</DialogTitle>
                <DialogDescription>
                  Заповніть форму для створення нового замовлення
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Клієнт</label>
                  <Select 
                    value={newOrder.customerId} 
                    onValueChange={(value) => setNewOrder({ ...newOrder, customerId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Виберіть клієнта" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockCustomers.map((customer) => (
                        <SelectItem key={customer.id} value={customer.id}>
                          {customer.name} {customer.companyName && `(${customer.companyName})`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Товари</label>
                  {newOrder.items.map((item, index) => (
                    <div key={index} className="flex gap-2 items-end p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <Input
                          placeholder="Назва товару"
                          value={item.productName}
                          onChange={(e) => updateItem(index, 'productName', e.target.value)}
                          className="mb-2"
                        />
                      </div>
                      <div className="w-20">
                        <Input
                          placeholder="Розмір"
                          value={item.size}
                          onChange={(e) => updateItem(index, 'size', e.target.value)}
                          className="mb-2"
                        />
                      </div>
                      <div className="w-24">
                        <Input
                          placeholder="Колір"
                          value={item.color}
                          onChange={(e) => updateItem(index, 'color', e.target.value)}
                          className="mb-2"
                        />
                      </div>
                      <div className="w-20">
                        <Input
                          type="number"
                          placeholder="К-сть"
                          value={item.quantity}
                          onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 0)}
                          className="mb-2"
                        />
                      </div>
                      <div className="w-28">
                        <Input
                          type="number"
                          placeholder="Ціна"
                          value={item.unitPrice}
                          onChange={(e) => updateItem(index, 'unitPrice', parseInt(e.target.value) || 0)}
                          className="mb-2"
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" onClick={addItem} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Додати товар
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Дедлайн</label>
                    <Input
                      type="date"
                      value={newOrder.deadline}
                      onChange={(e) => setNewOrder({ ...newOrder, deadline: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Нотатки</label>
                    <Input
                      placeholder="Додаткові нотатки..."
                      value={newOrder.notes}
                      onChange={(e) => setNewOrder({ ...newOrder, notes: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Скасувати
                </Button>
                <Button 
                  className="bg-[#e94560] hover:bg-[#d63d56]"
                  onClick={handleCreateOrder}
                  disabled={!newOrder.customerId || newOrder.items[0].productName === ''}
                >
                  Створити замовлення
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Orders Table */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Номер</TableHead>
                  <TableHead className="font-semibold">Клієнт</TableHead>
                  <TableHead className="font-semibold">Товари</TableHead>
                  <TableHead className="font-semibold">Сума</TableHead>
                  <TableHead className="font-semibold">Статус</TableHead>
                  <TableHead className="font-semibold">Дедлайн</TableHead>
                  <TableHead className="font-semibold text-right">Дії</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedOrders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-gray-50/50">
                    <TableCell className="font-medium">{order.orderNumber}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Package className="w-4 h-4 text-gray-400" />
                        <span>{order.items.length} поз.</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {order.totalAmount.toLocaleString()} ₴
                    </TableCell>
                    <TableCell>
                      <Select
                        value={order.status}
                        onValueChange={(value) => handleStatusChange(order.id, value as OrderStatus)}
                      >
                        <SelectTrigger 
                          className="w-[140px] h-8"
                          style={{ 
                            backgroundColor: `${statusColors[order.status]}15`,
                            color: statusColors[order.status],
                            borderColor: 'transparent'
                          }}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {statusOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              <div className="flex items-center gap-2">
                                <div 
                                  className="w-2 h-2 rounded-full" 
                                  style={{ backgroundColor: statusColors[option.value as OrderStatus] }}
                                />
                                {option.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        {new Date(order.deadline).toLocaleDateString('uk-UA')}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => viewOrderDetails(order)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteOrder(order.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Pagination */}
        {filteredOrders.length > itemsPerPage && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Показано {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, filteredOrders.length)} з {filteredOrders.length} замовлень
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="icon"
                  onClick={() => setCurrentPage(page)}
                  className={currentPage === page ? "bg-[#e94560] hover:bg-[#d63d56]" : ""}
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Order Details Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Замовлення {selectedOrder?.orderNumber}</DialogTitle>
              <DialogDescription>
                Деталі замовлення від {selectedOrder?.customerName}
              </DialogDescription>
            </DialogHeader>
            {selectedOrder && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-500">Клієнт</p>
                    <p className="font-medium">{selectedOrder.customerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Дата створення</p>
                    <p className="font-medium">
                      {new Date(selectedOrder.createdAt).toLocaleDateString('uk-UA')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Дедлайн</p>
                    <p className="font-medium">
                      {new Date(selectedOrder.deadline).toLocaleDateString('uk-UA')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Статус</p>
                    <Badge 
                      style={{ 
                        backgroundColor: `${statusColors[selectedOrder.status]}15`,
                        color: statusColors[selectedOrder.status]
                      }}
                    >
                      {statusLabels[selectedOrder.status]}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Товари:</p>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Товар</TableHead>
                        <TableHead>Розмір</TableHead>
                        <TableHead>Колір</TableHead>
                        <TableHead>К-сть</TableHead>
                        <TableHead>Ціна</TableHead>
                        <TableHead className="text-right">Сума</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedOrder.items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.productName}</TableCell>
                          <TableCell>{item.size}</TableCell>
                          <TableCell>{item.color}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>{item.unitPrice} ₴</TableCell>
                          <TableCell className="text-right font-medium">
                            {item.totalPrice.toLocaleString()} ₴
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex justify-between items-center p-4 bg-[#e94560]/5 rounded-lg">
                  <p className="text-lg font-medium">Загальна сума:</p>
                  <p className="text-2xl font-bold text-[#e94560]">
                    {selectedOrder.totalAmount.toLocaleString()} ₴
                  </p>
                </div>

                {selectedOrder.notes && (
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Нотатки:</p>
                    <p>{selectedOrder.notes}</p>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}