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
import { mockUsers } from '@/data/mockData';
import type { User, UserRole } from '@/types';
import { 
  Plus, 
  Search, 
  UserCog,
  Mail,
  Phone,
  Building2,
  Trash2,
  Edit,
  Users,
  Briefcase,
  Award,
  Activity
} from 'lucide-react';

const roleLabels: Record<UserRole, string> = {
  admin: 'Адмін',
  manager: 'Менеджер',
  worker: 'Працівник',
};

const roleColors: Record<UserRole, string> = {
  admin: '#e94560',
  manager: '#8b5cf6',
  worker: '#10b981',
};

const departmentOptions = [
  'Management',
  'Production',
  'Sewing',
  'Cutting',
  'Finishing',
  'Quality Control',
  'Warehouse',
  'Sales',
];

export default function StaffPage() {
  const [staff, setStaff] = useState<User[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<User | null>(null);
  
  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    role: 'worker' as UserRole,
  });

  const filteredStaff = staff.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleCreateStaff = () => {
    const user: User = {
      id: `user_${Date.now()}`,
      name: newStaff.name,
      email: newStaff.email,
      phone: newStaff.phone,
      position: newStaff.position,
      department: newStaff.department,
      role: newStaff.role,
      companyId: 'comp_1',
      createdAt: new Date(),
    };
    setStaff([user, ...staff]);
    setIsCreateOpen(false);
    setNewStaff({
      name: '',
      email: '',
      phone: '',
      position: '',
      department: '',
      role: 'worker',
    });
  };

  const handleDeleteStaff = (id: string) => {
    setStaff(staff.filter(u => u.id !== id));
  };

  const staffByRole = {
    admin: staff.filter(u => u.role === 'admin').length,
    manager: staff.filter(u => u.role === 'manager').length,
    worker: staff.filter(u => u.role === 'worker').length,
  };

  return (
    <Layout title="Персонал" subtitle="Управління співробітниками">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#e94560]/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-[#e94560]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{staff.length}</p>
                  <p className="text-sm text-gray-500">Всього співробітників</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#e94560]/10 flex items-center justify-center">
                  <UserCog className="w-6 h-6 text-[#e94560]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{staffByRole.admin}</p>
                  <p className="text-sm text-gray-500">Адміни</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#8b5cf6]/10 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-[#8b5cf6]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{staffByRole.manager}</p>
                  <p className="text-sm text-gray-500">Менеджери</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#10b981]/10 flex items-center justify-center">
                  <Activity className="w-6 h-6 text-[#10b981]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{staffByRole.worker}</p>
                  <p className="text-sm text-gray-500">Працівники</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Пошук співробітників..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full sm:w-[300px]"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Роль" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Всі ролі</SelectItem>
                <SelectItem value="admin">Адмін</SelectItem>
                <SelectItem value="manager">Менеджер</SelectItem>
                <SelectItem value="worker">Працівник</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#e94560] hover:bg-[#d63d56]">
                <Plus className="w-4 h-4 mr-2" />
                Додати співробітника
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Додати співробітника</DialogTitle>
                <DialogDescription>
                  Заповніть форму для додавання нового співробітника
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2 col-span-2">
                  <label className="text-sm font-medium">ПІБ</label>
                  <Input
                    value={newStaff.name}
                    onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                    placeholder="Іван Петренко"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      value={newStaff.email}
                      onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
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
                      value={newStaff.phone}
                      onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                      placeholder="+380 50 123 4567"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Посада</label>
                  <Input
                    value={newStaff.position}
                    onChange={(e) => setNewStaff({ ...newStaff, position: e.target.value })}
                    placeholder="Кравець"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Відділ</label>
                  <Select
                    value={newStaff.department}
                    onValueChange={(value) => setNewStaff({ ...newStaff, department: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Виберіть відділ" />
                    </SelectTrigger>
                    <SelectContent>
                      {departmentOptions.map((dept) => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 col-span-2">
                  <label className="text-sm font-medium">Роль</label>
                  <Select
                    value={newStaff.role}
                    onValueChange={(value) => setNewStaff({ ...newStaff, role: value as UserRole })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Адмін</SelectItem>
                      <SelectItem value="manager">Менеджер</SelectItem>
                      <SelectItem value="worker">Працівник</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                  Скасувати
                </Button>
                <Button 
                  className="bg-[#e94560] hover:bg-[#d63d56]"
                  onClick={handleCreateStaff}
                  disabled={!newStaff.name || !newStaff.email}
                >
                  Додати
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Staff Table */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Співробітник</TableHead>
                  <TableHead className="font-semibold">Контакти</TableHead>
                  <TableHead className="font-semibold">Посада</TableHead>
                  <TableHead className="font-semibold">Відділ</TableHead>
                  <TableHead className="font-semibold">Роль</TableHead>
                  <TableHead className="font-semibold">Дата прийому</TableHead>
                  <TableHead className="font-semibold text-right">Дії</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaff.map((user) => (
                  <TableRow key={user.id} className="hover:bg-gray-50/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium"
                          style={{ backgroundColor: roleColors[user.role] }}
                        >
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-3 h-3 text-gray-400" />
                        {user.phone || '-'}
                      </div>
                    </TableCell>
                    <TableCell>{user.position || '-'}</TableCell>
                    <TableCell>
                      {user.department && (
                        <Badge variant="outline">{user.department}</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        style={{ 
                          backgroundColor: `${roleColors[user.role]}15`,
                          color: roleColors[user.role]
                        }}
                      >
                        {roleLabels[user.role]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString('uk-UA')}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteStaff(user.id)}
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

        {/* Staff Details Modal */}
        {selectedStaff && (
          <div 
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedStaff(null)}
          >
            <Card 
              className="w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <CardHeader className="text-center">
                <div 
                  className="w-20 h-20 rounded-full mx-auto flex items-center justify-center text-white text-3xl font-bold mb-4"
                  style={{ backgroundColor: roleColors[selectedStaff.role] }}
                >
                  {selectedStaff.name.charAt(0)}
                </div>
                <CardTitle>{selectedStaff.name}</CardTitle>
                <p className="text-gray-500">{selectedStaff.position}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-sm">{selectedStaff.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Телефон</p>
                      <p className="font-medium text-sm">{selectedStaff.phone || '-'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Відділ</p>
                      <p className="font-medium text-sm">{selectedStaff.department || '-'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Роль</p>
                      <Badge 
                        style={{ 
                          backgroundColor: `${roleColors[selectedStaff.role]}15`,
                          color: roleColors[selectedStaff.role]
                        }}
                      >
                        {roleLabels[selectedStaff.role]}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button variant="outline" onClick={() => setSelectedStaff(null)}>
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