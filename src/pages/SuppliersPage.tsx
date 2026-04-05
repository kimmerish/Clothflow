import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
import { mockSuppliers, mockMaterials } from '@/data/mockData';
import type { Supplier, MaterialCategory } from '@/types';
import { cn } from '@/lib/utils';
import { 
  Plus, 
  Search, 
  Building2,
  Globe,
  Mail,
  Phone,
  MapPin,
  Trash2,
  Star,
  ExternalLink,
  Package,
  Filter,
  Link2
} from 'lucide-react';

const categoryLabels: Record<MaterialCategory, string> = {
  fabric: 'Тканини',
  accessory: 'Аксесуари',
  thread: 'Нитки',
  button: 'Гудзики',
  zipper: 'Блискавки',
  lace: 'Мереживо',
  rhinestone: 'Стrazy',
  beads: 'Бісер',
  other: 'Інше',
};

const categoryColors: Record<MaterialCategory, string> = {
  fabric: '#e94560',
  accessory: '#8b5cf6',
  thread: '#06b6d4',
  button: '#f59e0b',
  zipper: '#10b981',
  lace: '#ec4899',
  rhinestone: '#a855f7',
  beads: '#f97316',
  other: '#64748b',
};

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>(mockSuppliers);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  
  const [newSupplier, setNewSupplier] = useState({
    name: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    website: '',
    categories: [] as MaterialCategory[],
    notes: '',
  });

  const filteredSuppliers = suppliers.filter(supplier => 
    supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    supplier.contactPerson?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    supplier.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const supplierMaterials = selectedSupplier 
    ? mockMaterials.filter(m => m.supplier === selectedSupplier.name)
    : [];

  const handleCreateSupplier = () => {
    const supplier: Supplier = {
      id: `sup_${Date.now()}`,
      name: newSupplier.name,
      contactPerson: newSupplier.contactPerson,
      email: newSupplier.email,
      phone: newSupplier.phone,
      address: newSupplier.address,
      website: newSupplier.website,
      categories: newSupplier.categories,
      rating: 0,
      notes: newSupplier.notes,
      createdAt: new Date(),
    };
    setSuppliers([supplier, ...suppliers]);
    setIsCreateOpen(false);
    setNewSupplier({
      name: '',
      contactPerson: '',
      email: '',
      phone: '',
      address: '',
      website: '',
      categories: [],
      notes: '',
    });
  };

  const handleDeleteSupplier = (id: string) => {
    setSuppliers(suppliers.filter(s => s.id !== id));
  };

  const toggleCategory = (category: MaterialCategory) => {
    setNewSupplier(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn('w-4 h-4', i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300')}
      />
    ));
  };

  return (
    <Layout title="Постачальники" subtitle="Управління постачальниками матеріалів">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#e94560]/10 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-[#e94560]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{suppliers.length}</p>
                  <p className="text-sm text-gray-500">Постачальників</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#8b5cf6]/10 flex items-center justify-center">
                  <Package className="w-6 h-6 text-[#8b5cf6]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {suppliers.reduce((sum, s) => sum + s.categories.length, 0)}
                  </p>
                  <p className="text-sm text-gray-500">Категорій</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#10b981]/10 flex items-center justify-center">
                  <Star className="w-6 h-6 text-[#10b981]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {(suppliers.reduce((sum, s) => sum + s.rating, 0) / suppliers.length).toFixed(1)}
                  </p>
                  <p className="text-sm text-gray-500">Середній рейтинг</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#f59e0b]/10 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-[#f59e0b]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {suppliers.filter(s => s.website).length}
                  </p>
                  <p className="text-sm text-gray-500">З веб-сайтом</p>
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
              placeholder="Пошук постачальників..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full sm:w-[300px]"
            />
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#e94560] hover:bg-[#d63d56]">
                <Plus className="w-4 h-4 mr-2" />
                Додати постачальника
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Додати постачальника</DialogTitle>
                <DialogDescription>
                  Заповніть форму для додавання нового постачальника
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Назва компанії *</label>
                  <Input
                    value={newSupplier.name}
                    onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
                    placeholder="ТОВ 'Постачальник'"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Контактна особа</label>
                  <Input
                    value={newSupplier.contactPerson}
                    onChange={(e) => setNewSupplier({ ...newSupplier, contactPerson: e.target.value })}
                    placeholder="ПІБ менеджера"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        value={newSupplier.email}
                        onChange={(e) => setNewSupplier({ ...newSupplier, email: e.target.value })}
                        placeholder="email@company.com"
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Телефон</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        value={newSupplier.phone}
                        onChange={(e) => setNewSupplier({ ...newSupplier, phone: e.target.value })}
                        placeholder="+380 XX XXX XX XX"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Адреса</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      value={newSupplier.address}
                      onChange={(e) => setNewSupplier({ ...newSupplier, address: e.target.value })}
                      placeholder="м. Київ, вул. Хрещатик 1"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Веб-сайт</label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      value={newSupplier.website}
                      onChange={(e) => setNewSupplier({ ...newSupplier, website: e.target.value })}
                      placeholder="https://supplier.com"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Категорії товарів</label>
                  <div className="flex flex-wrap gap-2">
                    {(Object.keys(categoryLabels) as MaterialCategory[]).map((cat) => (
                      <Button
                        key={cat}
                        type="button"
                        variant={newSupplier.categories.includes(cat) ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => toggleCategory(cat)}
                        className={cn(
                          newSupplier.categories.includes(cat) && 'bg-[#e94560] hover:bg-[#d63d56]'
                        )}
                      >
                        {categoryLabels[cat]}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Нотатки</label>
                  <Input
                    value={newSupplier.notes}
                    onChange={(e) => setNewSupplier({ ...newSupplier, notes: e.target.value })}
                    placeholder="Додаткова інформація..."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                  Скасувати
                </Button>
                <Button 
                  className="bg-[#e94560] hover:bg-[#d63d56]"
                  onClick={handleCreateSupplier}
                  disabled={!newSupplier.name || !newSupplier.email}
                >
                  Додати
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Suppliers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSuppliers.map((supplier) => (
            <Card 
              key={supplier.id} 
              className="border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer"
              onClick={() => setSelectedSupplier(supplier)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#e94560] to-[#ff6b6b] flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{supplier.name}</CardTitle>
                      {supplier.contactPerson && (
                        <p className="text-sm text-gray-500">{supplier.contactPerson}</p>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteSupplier(supplier.id);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-1">
                  {renderStars(supplier.rating)}
                  <span className="text-sm text-gray-500 ml-2">{supplier.rating.toFixed(1)}</span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4 text-gray-400" />
                    {supplier.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4 text-gray-400" />
                    {supplier.phone}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {supplier.categories.map((cat) => (
                    <Badge
                      key={cat}
                      variant="secondary"
                      style={{ 
                        backgroundColor: `${categoryColors[cat]}15`,
                        color: categoryColors[cat]
                      }}
                    >
                      {categoryLabels[cat]}
                    </Badge>
                  ))}
                </div>

                {supplier.website && (
                  <a 
                    href={supplier.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-2 text-sm text-[#e94560] hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Відвідати сайт
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Supplier Details Modal */}
        {selectedSupplier && (
          <div 
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedSupplier(null)}
          >
            <Card 
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#e94560] to-[#ff6b6b] flex items-center justify-center">
                      <Building2 className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{selectedSupplier.name}</CardTitle>
                      {selectedSupplier.contactPerson && (
                        <p className="text-gray-500">{selectedSupplier.contactPerson}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {renderStars(selectedSupplier.rating)}
                    <span className="text-sm text-gray-500 ml-2">{selectedSupplier.rating.toFixed(1)}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Contact Info */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{selectedSupplier.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Телефон</p>
                      <p className="font-medium">{selectedSupplier.phone}</p>
                    </div>
                  </div>
                  {selectedSupplier.address && (
                    <div className="flex items-center gap-3 col-span-2">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Адреса</p>
                        <p className="font-medium">{selectedSupplier.address}</p>
                      </div>
                    </div>
                  )}
                  {selectedSupplier.website && (
                    <div className="flex items-center gap-3 col-span-2">
                      <Globe className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Веб-сайт</p>
                        <a 
                          href={selectedSupplier.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-[#e94560] hover:underline"
                        >
                          {selectedSupplier.website}
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* Categories */}
                <div>
                  <h3 className="font-semibold mb-3">Категорії товарів</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedSupplier.categories.map((cat) => (
                      <Badge
                        key={cat}
                        style={{ 
                          backgroundColor: `${categoryColors[cat]}15`,
                          color: categoryColors[cat]
                        }}
                      >
                        {categoryLabels[cat]}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                {selectedSupplier.notes && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Нотатки</p>
                    <p>{selectedSupplier.notes}</p>
                  </div>
                )}

                {/* Materials from this supplier */}
                <div>
                  <h3 className="font-semibold mb-3">Матеріали від постачальника</h3>
                  {supplierMaterials.length > 0 ? (
                    <div className="space-y-2">
                      {supplierMaterials.map((material) => (
                        <div key={material.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">{material.name}</p>
                            <p className="text-sm text-gray-500">{material.sku}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{material.unitPrice} ₴</p>
                            <p className="text-sm text-gray-500">{material.quantity} {material.unit}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">Немає матеріалів від цього постачальника</p>
                  )}
                </div>

                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setSelectedSupplier(null)}>
                    Закрити
                  </Button>
                  <Button className="bg-[#e94560] hover:bg-[#d63d56]">
                    <Link2 className="w-4 h-4 mr-2" />
                    Парсер цін
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