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
import { mockCustomers, mockOrders } from '@/data/mockData';
import type { Customer } from '@/types';
import { 
  Plus, 
  Search, 
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  Trash2,
  Edit,
  ShoppingBag,
  DollarSign,
  Calendar,
  MoreHorizontal
} from 'lucide-react';

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    type: 'individual' as 'company' | 'individual',
    companyName: '',
  });

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (customer.companyName && customer.companyName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getCustomerOrders = (customerId: string) => {
    return mockOrders.filter(o => o.customerId === customerId);
  };

  const handleCreateCustomer = () => {
    const customer: Customer = {
      id: `cust_${Date.now()}`,
      name: newCustomer.name,
      email: newCustomer.email,
      phone: newCustomer.phone,
      address: newCustomer.address,
      type: newCustomer.type,
      companyName: newCustomer.type === 'company' ? newCustomer.companyName : undefined,
      totalOrders: 0,
      totalSpent: 0,
      createdAt: new Date(),
    };
    setCustomers([customer, ...customers]);
    setIsCreateOpen(false);
    setNewCustomer({
      name: '',
      email: '',
      phone: '',
      address: '',
      type: 'individual',
      companyName: '',
    });
  };

  const handleDeleteCustomer = (id: string) => {
    setCustomers(customers.filter(c => c.id !== id));
  };

  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
  const avgOrderValue = customers.length > 0 ? totalRevenue / customers.reduce((sum, c) => sum + c.totalOrders, 0) : 0;

  return (
    <Layout title="Клієнти" subtitle="База клієнтів та контрагентів">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#e94560]/10 flex items-center justify-center">
                  <User className="w-6 h-6 text-[#e94560]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{customers.length}</p>
                  <p className="text-sm text-gray-500">Клієнтів</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#8b5cf6]/10 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-[#8b5cf6]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {customers.filter(c => c.type === 'company').length}
                  </p>
                  <p className="text-sm text-gray-500">Компаній</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#10b981]/10 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-[#10b981]" />
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900">
                    {(totalRevenue / 1000).toFixed(0)}к ₴
                  </p>
                  <p className="text-sm text-gray-500">Загальний дохід</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#f59e0b]/10 flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-[#f59e0b]" />
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900">
                    {avgOrderValue.toLocaleString()} ₴
                  </p>
                  <p className="text-sm text-gray-500">Середнє замовлення</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Пошук клієнтів..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full sm:w-[300px]"
            />
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#e94560] hover:bg-[#d63d56]">
                <Plus className="w-4 h-4 mr-2" />
                Додати клієнта
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Додати клієнта</DialogTitle>
                <DialogDescription>
                  Заповніть форму для додавання нового клієнта
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2 col-span-2">
                  <label className="text-sm font-medium">Тип клієнта</label>
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant={newCustomer.type === 'individual' ? 'default' : 'outline'}
                      onClick={() => setNewCustomer({ ...newCustomer, type: 'individual' })}
                      className="flex-1"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Фізична особа
                    </Button>
                    <Button
                      type="button"
                      variant={newCustomer.type === 'company' ? 'default' : 'outline'}
                      onClick={() => setNewCustomer({ ...newCustomer, type: 'company' })}
                      className="flex-1"
                    >
                      <Building2 className="w-4 h-4 mr-2" />
                      Компанія
                    </Button>
                  </div>
                </div>
                <div className="space-y-2 col-span-2">
                  <label className="text-sm font-medium">ПІБ / Назва компанії</label>
                  <Input
                    value={newCustomer.name}
                    onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                    placeholder={newCustomer.type === 'company' ? 'ТОВ "Ромашка"' : 'Іван Петренко'}
                  />
                </div>
                {newCustomer.type === 'company' && (
                  <div className="space-y-2 col-span-2">
                    <label className="text-sm font-medium">Компанія</label>
                    <Input
                      value={newCustomer.companyName}
                      onChange={(e) => setNewCustomer({ ...newCustomer, companyName: e.target.value })}
                      placeholder="ТОВ 'Ромашка'"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      value={newCustomer.email}
                      onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                      placeholder="email@example.com"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Телефон</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      value={newCustomer.phone}
                      onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                      placeholder="+380 50 123 4567"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2 col-span-2">
                  <label className="text-sm font-medium">Адреса</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      value={newCustomer.address}
                      onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
                      placeholder="м. Київ, вул. Хрещатик 1"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                  Скасувати
                </Button>
                <Button 
                  className="bg-[#e94560] hover:bg-[#d63d56]"
                  onClick={handleCreateCustomer}
                  disabled={!newCustomer.name || !newCustomer.email}
                >
                  Додати
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Customers Table */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Клієнт</TableHead>
                  <TableHead className="font-semibold">Контакти</TableHead>
                  <TableHead className="font-semibold">Тип</TableHead>
                  <TableHead className="font-semibold">Замовлень</TableHead>
                  <TableHead className="font-semibold">Сума</TableHead>
                  <TableHead className="font-semibold">Клієнт з</TableHead>
                  <TableHead className="font-semibold text-right">Дії</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id} className="hover:bg-gray-50/50 cursor-pointer"
                    onClick={() => setSelectedCustomer(customer)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#e94560] to-[#ff6b6b] flex items-center justify-center text-white font-medium">
                          {customer.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{customer.name}</p>
                          {customer.companyName && (
                            <p className="text-sm text-gray-500">{customer.companyName}</p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="w-3 h-3 text-gray-400" />
                          <span className="text-gray-600">{customer.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-3 h-3 text-gray-400" />
                          <span className="text-gray-600">{customer.phone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={customer.type === 'company' ? 'default' : 'secondary'}>
                        {customer.type === 'company' ? (
                          <><Building2 className="w-3 h-3 mr-1" />Компанія</>
                        ) : (
                          <><User className="w-3 h-3 mr-1" />ФОП</>
                        )}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{customer.totalOrders}</TableCell>
                    <TableCell className="font-medium">
                      {customer.totalSpent.toLocaleString()} ₴
                    </TableCell>
                    <TableCell className="text-gray-500">
                      {new Date(customer.createdAt).toLocaleDateString('uk-UA')}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteCustomer(customer.id);
                          }}
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

        {/* Customer Details Modal */}
        {selectedCustomer && (
          <div 
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCustomer(null)}
          >
            <Card 
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#e94560] to-[#ff6b6b] flex items-center justify-center text-white text-2xl font-bold">
                  {selectedCustomer.name.charAt(0)}
                </div>
                <div>
                  <CardTitle>{selectedCustomer.name}</CardTitle>
                  {selectedCustomer.companyName && (
                    <p className="text-gray-500">{selectedCustomer.companyName}</p>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Contact Info */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{selectedCustomer.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Телефон</p>
                      <p className="font-medium">{selectedCustomer.phone}</p>
                    </div>
                  </div>
                  {selectedCustomer.address && (
                    <div className="flex items-center gap-3 col-span-2">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Адреса</p>
                        <p className="font-medium">{selectedCustomer.address}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-[#e94560]/5 rounded-lg">
                    <p className="text-sm text-gray-500">Всього замовлень</p>
                    <p className="text-2xl font-bold text-[#e94560]">{selectedCustomer.totalOrders}</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-500">Всього витрачено</p>
                    <p className="text-2xl font-bold text-green-600">{selectedCustomer.totalSpent.toLocaleString()} ₴</p>
                  </div>
                </div>

                {/* Orders History */}
                <div>
                  <h3 className="font-semibold mb-3">Історія замовлень</h3>
                  <div className="space-y-2">
                    {getCustomerOrders(selectedCustomer.id).map((order) => (
                      <div 
                        key={order.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{order.orderNumber}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString('uk-UA')}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{order.totalAmount.toLocaleString()} ₴</p>
                          <Badge variant="secondary">{order.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button variant="outline" onClick={() => setSelectedCustomer(null)}>
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