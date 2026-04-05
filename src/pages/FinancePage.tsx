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
import { mockTransactions, mockOrders } from '@/data/mockData';
import type { Transaction } from '@/types';
import { 
  Plus, 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  Calendar,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Briefcase,
  Receipt,
  CreditCard,
  Package,
  Users,
  FileText,
  PieChart,
  BarChart3
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from 'recharts';

const categoryIcons: Record<string, React.ElementType> = {
  'Замовлення': DollarSign,
  'Матеріали': Package,
  'Зарплата': Users,
  'Оренда': Briefcase,
  'Комунальні': CreditCard,
  'Інше': Receipt,
};

const expenseCategories = ['Матеріали', 'Зарплата', 'Оренда', 'Комунальні', 'Інше'];
const incomeCategories = ['Замовлення', 'Інше'];

export default function FinancePage() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  
  const [newTransaction, setNewTransaction] = useState({
    type: 'expense' as 'income' | 'expense',
    category: '',
    amount: 0,
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  const filteredTransactions = transactions.filter(t => 
    typeFilter === 'all' || t.type === typeFilter
  );

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const profit = totalIncome - totalExpenses;

  const handleCreateTransaction = () => {
    const transaction: Transaction = {
      id: `trans_${Date.now()}`,
      type: newTransaction.type,
      category: newTransaction.category,
      amount: newTransaction.amount,
      description: newTransaction.description,
      date: new Date(newTransaction.date),
    };
    setTransactions([transaction, ...transactions]);
    setIsCreateOpen(false);
    setNewTransaction({
      type: 'expense',
      category: '',
      amount: 0,
      description: '',
      date: new Date().toISOString().split('T')[0],
    });
  };

  // Chart Data
  const monthlyIncome = [
    { month: 'Січ', income: 450000, expense: 280000 },
    { month: 'Лют', income: 520000, expense: 310000 },
    { month: 'Бер', income: 480000, expense: 290000 },
    { month: 'Кві', income: 610000, expense: 340000 },
  ];

  const categoryData = transactions.reduce((acc, t) => {
    const existing = acc.find(item => item.name === t.category);
    if (existing) {
      existing.value += t.amount;
    } else {
      acc.push({ name: t.category, value: t.amount });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  const COLORS = ['#e94560', '#8b5cf6', '#10b981', '#f59e0b', '#06b6d4', '#64748b'];

  return (
    <Layout title="Фінанси" subtitle="Фінансовий облік та звітність">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600">Дохід</p>
                  <p className="text-2xl font-bold text-green-700">{totalIncome.toLocaleString()} ₴</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <ArrowUpRight className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-600">Витрати</p>
                  <p className="text-2xl font-bold text-red-700">{totalExpenses.toLocaleString()} ₴</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                  <ArrowDownRight className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-[#e94560]/5 to-[#e94560]/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Прибуток</p>
                  <p className="text-2xl font-bold text-gray-900">{profit.toLocaleString()} ₴</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#e94560]/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-[#e94560]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Рентабельність</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {totalIncome > 0 ? Math.round((profit / totalIncome) * 100) : 0}%
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#8b5cf6]/10 flex items-center justify-center">
                  <PieChart className="w-6 h-6 text-[#8b5cf6]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Динаміка доходів та витрат</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyIncome}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#9ca3af" />
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
                      formatter={(value: number) => [`${value.toLocaleString()} ₴`]}
                    />
                    <Legend />
                    <Bar dataKey="income" name="Дохід" fill="#10b981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="expense" name="Витрати" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Структура витрат</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={categoryData.filter(d => d.value > 0)}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        borderRadius: 8, 
                        border: 'none', 
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
                      }}
                      formatter={(value: number) => [`${value.toLocaleString()} ₴`]}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transactions */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Операції</CardTitle>
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#e94560] hover:bg-[#d63d56]">
                  <Plus className="w-4 h-4 mr-2" />
                  Додати операцію
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Додати фінансову операцію</DialogTitle>
                  <DialogDescription>
                    Заповніть форму для додавання нової операції
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant={newTransaction.type === 'income' ? 'default' : 'outline'}
                      onClick={() => setNewTransaction({ ...newTransaction, type: 'income', category: '' })}
                      className="flex-1"
                    >
                      <ArrowUpRight className="w-4 h-4 mr-2" />
                      Дохід
                    </Button>
                    <Button
                      type="button"
                      variant={newTransaction.type === 'expense' ? 'default' : 'outline'}
                      onClick={() => setNewTransaction({ ...newTransaction, type: 'expense', category: '' })}
                      className="flex-1"
                    >
                      <ArrowDownRight className="w-4 h-4 mr-2" />
                      Витрата
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Категория</label>
                    <Select
                      value={newTransaction.category}
                      onValueChange={(value) => setNewTransaction({ ...newTransaction, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Виберіть категорію" />
                      </SelectTrigger>
                      <SelectContent>
                        {(newTransaction.type === 'income' ? incomeCategories : expenseCategories).map((cat) => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Сума</label>
                    <Input
                      type="number"
                      value={newTransaction.amount}
                      onChange={(e) => setNewTransaction({ ...newTransaction, amount: parseInt(e.target.value) || 0 })}
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Опис</label>
                    <Input
                      value={newTransaction.description}
                      onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                      placeholder="Опис операції"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Дата</label>
                    <Input
                      type="date"
                      value={newTransaction.date}
                      onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                    Скасувати
                  </Button>
                  <Button 
                    className="bg-[#e94560] hover:bg-[#d63d56]"
                    onClick={handleCreateTransaction}
                    disabled={!newTransaction.category || !newTransaction.amount}
                  >
                    Додати
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Тип" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Всі операції</SelectItem>
                  <SelectItem value="income">Доходи</SelectItem>
                  <SelectItem value="expense">Витрати</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Дата</TableHead>
                  <TableHead className="font-semibold">Тип</TableHead>
                  <TableHead className="font-semibold">Категория</TableHead>
                  <TableHead className="font-semibold">Опис</TableHead>
                  <TableHead className="font-semibold text-right">Сума</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => {
                  const Icon = categoryIcons[transaction.category] || Receipt;
                  return (
                    <TableRow key={transaction.id} className="hover:bg-gray-50/50">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {new Date(transaction.date).toLocaleDateString('uk-UA')}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={transaction.type === 'income' ? 'default' : 'destructive'}
                          className={transaction.type === 'income' ? 'bg-green-600' : ''}
                        >
                          {transaction.type === 'income' ? 'Дохід' : 'Витрата'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-gray-400" />
                          {transaction.category}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600">{transaction.description}</TableCell>
                      <TableCell className="text-right font-medium">
                        <span className={transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                          {transaction.type === 'income' ? '+' : '-'}{transaction.amount.toLocaleString()} ₴
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}