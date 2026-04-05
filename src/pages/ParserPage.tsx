import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
import { mockSuppliers } from '@/data/mockData';
import type { ParsedMaterial, MaterialCategory } from '@/types';
import { cn } from '@/lib/utils';
import { 
  Link2,
  Search,
  Loader2,
  ExternalLink,
  Plus,
  Trash2,
  Copy,
  CheckCircle2,
  AlertCircle,
  Image,
  DollarSign,
  Package,
  ShoppingCart,
  Globe,
  Sparkles,
  ArrowRight,
  RefreshCw
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

const supplierPresets = [
  { name: 'Текстиль Україна', url: 'tekstyl.com.ua', categories: ['fabric', 'thread'] },
  { name: 'Silk World', url: 'silkworld.com', categories: ['fabric', 'lace'] },
  { name: 'Гудтекс', url: 'gudtex.ua', categories: ['thread', 'button'] },
  { name: 'Фурнітура Плюс', url: 'furnitura.plus', categories: ['button', 'zipper', 'accessory', 'rhinestone', 'beads'] },
  { name: 'Мереживо Маркет', url: 'meretyvo.market', categories: ['lace'] },
];

// Demo parsed results
const demoParsedMaterials: ParsedMaterial[] = [
  {
    id: 'parsed_1',
    name: 'Шовк натуральний чорний',
    price: 850,
    unit: 'метр',
    currency: 'UAH',
    imageUrl: 'https://picsum.photos/seed/silk1/300/300',
    description: 'Преміум шовк 100% натуральний. Ширина 150 см.',
    sourceUrl: 'https://silkworld.com/product/silk-black',
    supplierName: 'Silk World',
    category: 'fabric',
    sku: 'SLK-BLK-001',
    available: true,
    parsedAt: new Date(),
  },
  {
    id: 'parsed_2',
    name: 'Мереживо гіпюр біле',
    price: 320,
    unit: 'метр',
    currency: 'UAH',
    imageUrl: 'https://picsum.photos/seed/lace1/300/300',
    description: 'Гіпюр європейський. Ширина 90 см. Склад: 100% поліестер.',
    sourceUrl: 'https://meretyvo.market/hypur-white',
    supplierName: 'Мереживо Маркет',
    category: 'lace',
    sku: 'HYP-WHT-002',
    available: true,
    parsedAt: new Date(),
  },
  {
    id: 'parsed_3',
    name: 'Стrazy Swarovski SS20',
    price: 12,
    unit: 'штука',
    currency: 'UAH',
    imageUrl: 'https://picsum.photos/seed/rhinestone1/300/300',
    description: 'Кристали Swarovski кольору Crystal. Розмір SS20 (4.8 мм).',
    sourceUrl: 'https://furnitura.plus/swarovski-ss20',
    supplierName: 'Фурнітура Плюс',
    category: 'rhinestone',
    sku: 'SW-SS20-CRY',
    available: true,
    parsedAt: new Date(),
  },
  {
    id: 'parsed_4',
    name: 'Нитки армовані чорні 5000м',
    price: 85,
    unit: 'штука',
    currency: 'UAH',
    imageUrl: 'https://picsum.photos/seed/thread1/300/300',
    description: 'Нитки швейні армовані. Для промислових машин. 5000м.',
    sourceUrl: 'https://gudtex.ua/thread-arm-black',
    supplierName: 'Гудтекс',
    category: 'thread',
    sku: 'THR-ARM-BLK-5K',
    available: true,
    parsedAt: new Date(),
  },
  {
    id: 'parsed_5',
    name: 'Бісер чеський №10 кольоровий',
    price: 4.5,
    unit: 'грам',
    currency: 'UAH',
    imageUrl: 'https://picsum.photos/seed/beads1/300/300',
    description: 'Бісер Preciosa (Чехія). Розмір №10. Набір 20 кольорів.',
    sourceUrl: 'https://furnitura.plus/beads-preciosa',
    supplierName: 'Фурнітура Плюс',
    category: 'beads',
    sku: 'BDS-PRC-10-SET',
    available: true,
    parsedAt: new Date(),
  },
];

export default function ParserPage() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [parsedMaterials, setParsedMaterials] = useState<ParsedMaterial[]>(demoParsedMaterials);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [isAddToInventoryOpen, setIsAddToInventoryOpen] = useState(false);

  const handleParse = async () => {
    if (!url) return;
    
    setIsLoading(true);
    
    // Simulate parsing delay
    setTimeout(() => {
      // In real app, this would call a backend service to parse the URL
      const newMaterial: ParsedMaterial = {
        id: `parsed_${Date.now()}`,
        name: 'Новий матеріал (парсинг)',
        price: Math.floor(Math.random() * 500) + 50,
        unit: 'метр',
        currency: 'UAH',
        imageUrl: `https://picsum.photos/seed/${Date.now()}/300/300`,
        description: 'Матеріал знайдено на сайті постачальника',
        sourceUrl: url,
        supplierName: 'Невідомий',
        category: 'fabric',
        available: true,
        parsedAt: new Date(),
      };
      
      setParsedMaterials([newMaterial, ...parsedMaterials]);
      setIsLoading(false);
      setUrl('');
    }, 2000);
  };

  const toggleSelect = (id: string) => {
    setSelectedMaterials(prev =>
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const addToInventory = () => {
    // In real app, this would add materials to inventory
    console.log('Adding to inventory:', selectedMaterials);
    setSelectedMaterials([]);
    setIsAddToInventoryOpen(false);
  };

  const selectAll = () => {
    if (selectedMaterials.length === parsedMaterials.length) {
      setSelectedMaterials([]);
    } else {
      setSelectedMaterials(parsedMaterials.map(m => m.id));
    }
  };

  return (
    <Layout title="Парсер матеріалів" subtitle="Імпорт даних про матеріали з сайтів постачальників">
      <div className="space-y-6">
        {/* URL Input */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-[#e94560]/5 to-transparent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#e94560]" />
              Парсер цін постачальників
            </CardTitle>
            <CardDescription>
              Вставте URL сторінки товару або каталогу щоб автоматично отримати інформацію про матеріал
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="https://supplier.com/product/..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="pl-10 h-12 text-lg"
                />
              </div>
              <Button 
                onClick={handleParse}
                disabled={!url || isLoading}
                className="h-12 px-6 bg-[#e94560] hover:bg-[#d63d56]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Парсинг...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-2" />
                    Розпарсити
                  </>
                )}
              </Button>
            </div>

            {/* Supplier Presets */}
            <div>
              <p className="text-sm text-gray-500 mb-2">Популярні магазини:</p>
              <div className="flex flex-wrap gap-2">
                {supplierPresets.map((preset) => (
                  <Button
                    key={preset.name}
                    variant="outline"
                    size="sm"
                    onClick={() => setUrl(`https://${preset.url}`)}
                    className="text-sm"
                  >
                    <Globe className="w-3 h-3 mr-1" />
                    {preset.name}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">
              Знайдено матеріалів: {parsedMaterials.length}
            </h2>
            <p className="text-sm text-gray-500">
              Вибрано: {selectedMaterials.length}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={selectAll}>
              {selectedMaterials.length === parsedMaterials.length ? 'Зняти виділення' : 'Вибрати всі'}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setParsedMaterials([])}
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Очистити
            </Button>
            <Button 
              size="sm"
              className="bg-[#e94560] hover:bg-[#d63d56]"
              disabled={selectedMaterials.length === 0}
              onClick={() => setIsAddToInventoryOpen(true)}
            >
              <Plus className="w-4 h-4 mr-1" />
              Додати до складу ({selectedMaterials.length})
            </Button>
          </div>
        </div>

        {/* Materials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {parsedMaterials.map((material) => {
            const isSelected = selectedMaterials.includes(material.id);
            
            return (
              <Card 
                key={material.id}
                className={cn(
                  "border-0 shadow-lg transition-all cursor-pointer",
                  isSelected && "ring-2 ring-[#e94560] shadow-xl"
                )}
                onClick={() => toggleSelect(material.id)}
              >
                <div className="relative">
                  <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                    {material.imageUrl ? (
                      <img 
                        src={material.imageUrl} 
                        alt={material.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Image className="w-12 h-12 text-gray-300" />
                      </div>
                    )}
                  </div>
                  <div className={cn(
                    "absolute top-2 right-2 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                    isSelected 
                      ? "bg-[#e94560] border-[#e94560]" 
                      : "bg-white border-gray-300"
                  )}>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                  {material.available ? (
                    <Badge className="absolute top-2 left-2 bg-green-500">В наявності</Badge>
                  ) : (
                    <Badge className="absolute top-2 left-2 bg-red-500">Немає</Badge>
                  )}
                </div>
                
                <CardContent className="p-4 space-y-3">
                  <div>
                    <Badge variant="secondary" className="text-xs mb-2">
                      {material.supplierName}
                    </Badge>
                    <CardTitle className="text-base line-clamp-2">
                      {material.name}
                    </CardTitle>
                  </div>

                  {material.description && (
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {material.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-[#e94560]">
                        {material.price.toLocaleString()} ₴
                      </p>
                      <p className="text-xs text-gray-500">за {material.unit}</p>
                    </div>
                    <div className="text-right">
                      {material.sku && (
                        <p className="text-xs font-mono text-gray-400">{material.sku}</p>
                      )}
                      <p className="text-xs text-gray-400">
                        {new Date(material.parsedAt).toLocaleDateString('uk-UA')}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      asChild
                    >
                      <a href={material.sourceUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Сайт
                      </a>
                    </Button>
                    <Button variant="outline" size="sm">
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {parsedMaterials.length === 0 && (
          <Card className="border-2 border-dashed border-gray-200">
            <CardContent className="py-16 text-center">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                Немає матеріалів
              </h3>
              <p className="text-gray-500 mb-4">
                Вставте URL товару щоб розпарсити його
              </p>
              <div className="flex justify-center gap-2">
                <Button variant="outline" onClick={() => setParsedMaterials(demoParsedMaterials)}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Завантажити демо дані
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Add to Inventory Dialog */}
        <Dialog open={isAddToInventoryOpen} onOpenChange={setIsAddToInventoryOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Додати до складу</DialogTitle>
              <DialogDescription>
                Додати вибрані матеріали до вашого складу
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {selectedMaterials.map(id => {
                const material = parsedMaterials.find(m => m.id === id);
                if (!material) return null;
                
                return (
                  <div key={id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    {material.imageUrl && (
                      <img 
                        src={material.imageUrl} 
                        alt={material.name}
                        className="w-12 h-12 rounded object-cover"
                      />
                    )}
                    <div className="flex-1">
                      <p className="font-medium">{material.name}</p>
                      <p className="text-sm text-gray-500">{material.supplierName}</p>
                    </div>
                    <p className="font-semibold text-[#e94560]">
                      {material.price.toLocaleString()} ₴
                    </p>
                  </div>
                );
              })}
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Постачальник</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Виберіть постачальника" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockSuppliers.map((supplier) => (
                      <SelectItem key={supplier.id} value={supplier.id}>
                        {supplier.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Кількість для замовлення</label>
                <Input type="number" placeholder="1" defaultValue="1" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddToInventoryOpen(false)}>
                Скасувати
              </Button>
              <Button className="bg-[#e94560] hover:bg-[#d63d56]" onClick={addToInventory}>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Додати до складу
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}