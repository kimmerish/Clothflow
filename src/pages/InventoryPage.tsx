import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { mockMaterials, mockProducts } from '@/data/mockData';
import type { Material, Product, MaterialCategory } from '@/types';
import { cn } from '@/lib/utils';
import { 
  Plus, 
  Search, 
  Package, 
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Edit,
  Trash2,
  Filter,
  Scissors,
  Tag,
  RotateCcw,
  Archive,
  Box
} from 'lucide-react';

const categoryLabels: Record<MaterialCategory, string> = {
  fabric: 'Тканина',
  accessory: 'Аксесуар',
  thread: 'Нитки',
  button: 'Гудзики',
  zipper: 'Блискавка',
  other: 'Інше',
};

const categoryColors: Record<MaterialCategory, string> = {
  fabric: '#e94560',
  accessory: '#8b5cf6',
  thread: '#06b6d4',
  button: '#f59e0b',
  zipper: '#10b981',
  other: '#64748b',
};

export default function InventoryPage() {
  const [materials, setMaterials] = useState<Material[]>(mockMaterials);
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isCreateMaterialOpen, setIsCreateMaterialOpen] = useState(false);
  const [isCreateProductOpen, setIsCreateProductOpen] = useState(false);
  
  const [newMaterial, setNewMaterial] = useState<Partial<Material>>({
    name: '',
    sku: '',
    category: 'fabric',
    unit: 'meter',
    quantity: 0,
    minQuantity: 10,
    unitPrice: 0,
    supplier: '',
  });

  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    sku: '',
    category: '',
    sizes: [],
    colors: [],
    quantity: 0,
    unitPrice: 0,
  });

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = 
      material.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || material.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const lowStockMaterials = materials.filter(m => m.quantity <= m.minQuantity);
  const totalMaterialsValue = materials.reduce((sum, m) => sum + (m.quantity * m.unitPrice), 0);
  const totalProductsValue = products.reduce((sum, p) => sum + (p.quantity * p.unitPrice), 0);

  const handleCreateMaterial = () => {
    const material: Material = {
      id: `mat_${Date.now()}`,
      name: newMaterial.name || '',
      sku: newMaterial.sku || '',
      category: newMaterial.category as MaterialCategory,
      unit: newMaterial.unit as Material['unit'],
      quantity: newMaterial.quantity || 0,
      minQuantity: newMaterial.minQuantity || 10,
      unitPrice: newMaterial.unitPrice || 0,
      supplier: newMaterial.supplier,
      lastRestocked: new Date(),
    };
    setMaterials([material, ...materials]);
    setIsCreateMaterialOpen(false);
    setNewMaterial({
      name: '',
      sku: '',
      category: 'fabric',
      unit: 'meter',
      quantity: 0,
      minQuantity: 10,
      unitPrice: 0,
      supplier: '',
    });
  };

  const handleCreateProduct = () => {
    const product: Product = {
      id: `prod_${Date.now()}`,
      name: newProduct.name || '',
      sku: newProduct.sku || '',
      category: newProduct.category || '',
      sizes: newProduct.sizes || [],
      colors: newProduct.colors || [],
      quantity: newProduct.quantity || 0,
      unitPrice: newProduct.unitPrice || 0,
    };
    setProducts([product, ...products]);
    setIsCreateProductOpen(false);
    setNewProduct({
      name: '',
      sku: '',
      category: '',
      sizes: [],
      colors: [],
      quantity: 0,
      unitPrice: 0,
    });
  };

  const handleDeleteMaterial = (id: string) => {
    setMaterials(materials.filter(m => m.id !== id));
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <Layout title="Склад" subtitle="Управління матеріалами та продукцією">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#e94560]/10 flex items-center justify-center">
                  <Scissors className="w-6 h-6 text-[#e94560]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{materials.length}</p>
                  <p className="text-sm text-gray-500">Найменувань матеріалів</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-orange-600">{lowStockMaterials.length}</p>
                  <p className="text-sm text-gray-500">Низький запас</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#10b981]/10 flex items-center justify-center">
                  <Box className="w-6 h-6 text-[#10b981]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{products.length}</p>
                  <p className="text-sm text-gray-500">Найменувань продукції</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#8b5cf6]/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-[#8b5cf6]" />
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900">
                    {(totalMaterialsValue / 1000).toFixed(0)}к ₴
                  </p>
                  <p className="text-sm text-gray-500">Вартість запасів</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="materials" className="space-y-4">
          <TabsList className="bg-white border shadow-sm">
            <TabsTrigger value="materials" className="gap-2">
              <Scissors className="w-4 h-4" />
              Матеріали
            </TabsTrigger>
            <TabsTrigger value="products" className="gap-2">
              <Package className="w-4 h-4" />
              Готова продукція
            </TabsTrigger>
          </TabsList>

          {/* Materials Tab */}
          <TabsContent value="materials" className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="flex gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Пошук матеріалів..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full sm:w-[300px]"
                  />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Категорія" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Всі категорії</SelectItem>
                    {Object.entries(categoryLabels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Dialog open={isCreateMaterialOpen} onOpenChange={setIsCreateMaterialOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#e94560] hover:bg-[#d63d56]">
                    <Plus className="w-4 h-4 mr-2" />
                    Додати матеріал
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Додати матеріал</DialogTitle>
                    <DialogDescription>
                      Заповніть форму для додавання нового матеріалу
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="space-y-2 col-span-2">
                      <label className="text-sm font-medium">Назва</label>
                      <Input
                        value={newMaterial.name}
                        onChange={(e) => setNewMaterial({ ...newMaterial, name: e.target.value })}
                        placeholder="Назва матеріалу"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">SKU</label>
                      <Input
                        value={newMaterial.sku}
                        onChange={(e) => setNewMaterial({ ...newMaterial, sku: e.target.value })}
                        placeholder="FAB-001"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Категорія</label>
                      <Select
                        value={newMaterial.category}
                        onValueChange={(value) => setNewMaterial({ ...newMaterial, category: value as MaterialCategory })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(categoryLabels).map(([value, label]) => (
                            <SelectItem key={value} value={value}>{label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Одиниця</label>
                      <Select
                        value={newMaterial.unit}
                        onValueChange={(value) => setNewMaterial({ ...newMaterial, unit: value as Material['unit'] })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="meter">Метр</SelectItem>
                          <SelectItem value="piece">Штука</SelectItem>
                          <SelectItem value="roll">Рулон</SelectItem>
                          <SelectItem value="pack">Пачка</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Мін. запас</label>
                      <Input
                        type="number"
                        value={newMaterial.minQuantity}
                        onChange={(e) => setNewMaterial({ ...newMaterial, minQuantity: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Ціна за од.</label>
                      <Input
                        type="number"
                        value={newMaterial.unitPrice}
                        onChange={(e) => setNewMaterial({ ...newMaterial, unitPrice: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                    <div className="space-y-2 col-span-2">
                      <label className="text-sm font-medium">Постачальник</label>
                      <Input
                        value={newMaterial.supplier}
                        onChange={(e) => setNewMaterial({ ...newMaterial, supplier: e.target.value })}
                        placeholder="Назва постачальника"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCreateMaterialOpen(false)}>
                      Скасувати
                    </Button>
                    <Button 
                      className="bg-[#e94560] hover:bg-[#d63d56]"
                      onClick={handleCreateMaterial}
                      disabled={!newMaterial.name || !newMaterial.sku}
                    >
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
                      <TableHead className="font-semibold">SKU</TableHead>
                      <TableHead className="font-semibold">Назва</TableHead>
                      <TableHead className="font-semibold">Категорія</TableHead>
                      <TableHead className="font-semibold">Кількість</TableHead>
                      <TableHead className="font-semibold">Мін. запас</TableHead>
                      <TableHead className="font-semibold">Ціна</TableHead>
                      <TableHead className="font-semibold">Постачальник</TableHead>
                      <TableHead className="font-semibold text-right">Дії</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMaterials.map((material) => (
                      <TableRow 
                        key={material.id} 
                        className={cn(
                          "hover:bg-gray-50/50",
                          material.quantity <= material.minQuantity && "bg-orange-50/50"
                        )}
                      >
                        <TableCell className="font-mono text-sm">{material.sku}</TableCell>
                        <TableCell className="font-medium">{material.name}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="secondary"
                            style={{ 
                              backgroundColor: `${categoryColors[material.category]}15`,
                              color: categoryColors[material.category]
                            }}
                          >
                            {categoryLabels[material.category]}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className={material.quantity <= material.minQuantity ? "text-orange-600 font-medium" : ""}>
                              {material.quantity.toLocaleString()} {material.unit}
                            </span>
                            {material.quantity <= material.minQuantity && (
                              <AlertTriangle className="w-4 h-4 text-orange-500" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{material.minQuantity} {material.unit}</TableCell>
                        <TableCell>{material.unitPrice} ₴</TableCell>
                        <TableCell className="text-gray-500">{material.supplier || '-'}</TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteMaterial(material.id)}
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
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Пошук продукції..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full sm:w-[300px]"
                />
              </div>
              <Dialog open={isCreateProductOpen} onOpenChange={setIsCreateProductOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#e94560] hover:bg-[#d63d56]">
                    <Plus className="w-4 h-4 mr-2" />
                    Додати виріб
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Додати виріб</DialogTitle>
                    <DialogDescription>
                      Заповніть форму для додавання нового виробу
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="space-y-2 col-span-2">
                      <label className="text-sm font-medium">Назва</label>
                      <Input
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        placeholder="Назва виробу"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">SKU</label>
                      <Input
                        value={newProduct.sku}
                        onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                        placeholder="DRS-001"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Категорія</label>
                      <Input
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                        placeholder="Сукні"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Кількість</label>
                      <Input
                        type="number"
                        value={newProduct.quantity}
                        onChange={(e) => setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Ціна</label>
                      <Input
                        type="number"
                        value={newProduct.unitPrice}
                        onChange={(e) => setNewProduct({ ...newProduct, unitPrice: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCreateProductOpen(false)}>
                      Скасувати
                    </Button>
                    <Button 
                      className="bg-[#e94560] hover:bg-[#d63d56]"
                      onClick={handleCreateProduct}
                      disabled={!newProduct.name || !newProduct.sku}
                    >
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
                      <TableHead className="font-semibold">SKU</TableHead>
                      <TableHead className="font-semibold">Назва</TableHead>
                      <TableHead className="font-semibold">Категорія</TableHead>
                      <TableHead className="font-semibold">Розміри</TableHead>
                      <TableHead className="font-semibold">Кольори</TableHead>
                      <TableHead className="font-semibold">Кількість</TableHead>
                      <TableHead className="font-semibold">Ціна</TableHead>
                      <TableHead className="font-semibold text-right">Дії</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product) => (
                      <TableRow key={product.id} className="hover:bg-gray-50/50">
                        <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell className="text-gray-500">{product.category}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {product.sizes.slice(0, 3).map((size) => (
                              <Badge key={size} variant="outline" className="text-xs">
                                {size}
                              </Badge>
                            ))}
                            {product.sizes.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{product.sizes.length - 3}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {product.colors.slice(0, 2).map((color) => (
                              <Badge key={color} variant="outline" className="text-xs">
                                {color}
                              </Badge>
                            ))}
                            {product.colors.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{product.colors.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={product.quantity === 0 ? "text-red-600 font-medium" : ""}>
                            {product.quantity} шт.
                          </span>
                        </TableCell>
                        <TableCell>{product.unitPrice} ₴</TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteProduct(product.id)}
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
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}