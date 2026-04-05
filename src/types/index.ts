// Types for FashionFlow - Fashion Manufacturing SaaS

export type UserRole = 'admin' | 'manager' | 'worker';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  companyId: string;
  avatar?: string;
  phone?: string;
  position?: string;
  department?: string;
  createdAt: Date;
}

export interface Company {
  id: string;
  name: string;
  logo?: string;
  phone: string;
  email: string;
  address: string;
  createdAt: Date;
}

// Order Types
export type OrderStatus = 
  | 'new' 
  | 'confirmed' 
  | 'in_production' 
  | 'quality_check' 
  | 'ready' 
  | 'shipped' 
  | 'completed' 
  | 'cancelled';

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  size: string;
  color: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  deadline: Date;
  createdAt: Date;
  productionId?: string;
  notes?: string;
}

// Production Types
export type ProductionStatus = 
  | 'planned' 
  | 'in_progress' 
  | 'quality_check' 
  | 'completed' 
  | 'on_hold';

export type OperationType = 
  | 'cutting' 
  | 'sewing' 
  | 'finishing' 
  | 'quality_control' 
  | 'packaging';

export interface ProductionOperation {
  id: string;
  type: OperationType;
  name: string;
  status: ProductionStatus;
  assignedTo?: string;
  startDate?: Date;
  endDate?: Date;
  notes?: string;
}

export interface ProductionOrder {
  id: string;
  orderId: string;
  orderNumber: string;
  operations: ProductionOperation[];
  workers: string[];
  status: ProductionStatus;
  startDate: Date;
  estimatedEndDate: Date;
  actualEndDate?: Date;
  progress: number;
}

// Inventory Types
export type MaterialCategory = 'fabric' | 'accessory' | 'thread' | 'button' | 'zipper' | 'other';

export interface Material {
  id: string;
  name: string;
  sku: string;
  category: MaterialCategory;
  unit: 'meter' | 'piece' | 'roll' | 'pack';
  quantity: number;
  minQuantity: number;
  unitPrice: number;
  supplier?: string;
  color?: string;
  lastRestocked?: Date;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  sizes: string[];
  colors: string[];
  quantity: number;
  unitPrice: number;
  imageUrl?: string;
}

export interface InventoryTransaction {
  id: string;
  type: 'in' | 'out';
  itemId: string;
  itemType: 'material' | 'product';
  quantity: number;
  date: Date;
  notes?: string;
}

// Customer Types
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  type: 'company' | 'individual';
  companyName?: string;
  totalOrders: number;
  totalSpent: number;
  createdAt: Date;
}

// Finance Types
export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
  date: Date;
  orderId?: string;
}

export interface FinanceReport {
  period: 'day' | 'week' | 'month' | 'year';
  totalIncome: number;
  totalExpenses: number;
  profit: number;
  transactions: Transaction[];
}

// Dashboard Types
export interface DashboardStats {
  ordersThisMonth: number;
  ordersAmountThisMonth: number;
  productionInProgress: number;
  lowStockMaterials: number;
  weeklyRevenue: number[];
  monthlyRevenue: number;
  orderStatusBreakdown: Record<OrderStatus, number>;
}

// Supplier Types
export interface Supplier {
  id: string;
  name: string;
  contactPerson?: string;
  email: string;
  phone: string;
  address?: string;
  website?: string;
  categories: MaterialCategory[];
  rating: number;
  notes?: string;
  createdAt: Date;
}

export interface SupplierProduct {
  id: string;
  supplierId: string;
  name: string;
  sku?: string;
  category: MaterialCategory;
  price: number;
  unit: string;
  imageUrl?: string;
  description?: string;
  url?: string;
  available: boolean;
  lastUpdated: Date;
}

// Training Types
export interface TrainingLesson {
  id: string;
  title: string;
  description: string;
  category: 'cutting' | 'sewing' | 'finishing' | 'quality' | 'materials';
  content: string;
  videoUrl?: string;
  duration?: number;
  order: number;
}

export interface TrainingProgress {
  lessonId: string;
  lessonTitle: string;
  completed: boolean;
  completedAt?: Date;
  score?: number;
}

export interface OrderTraining {
  id: string;
  orderId: string;
  orderNumber: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  requiredLessons: string[];
  progress: TrainingProgress[];
  startedAt?: Date;
  completedAt?: Date;
  score?: number;
  attempts: number;
}

// Material Consumption Types
export type ConsumableType = 'fabric' | 'accessory' | 'lace' | 'rhinestone' | 'beads' | 'thread' | 'other';

export interface MaterialConsumption {
  id: string;
  orderId: string;
  orderNumber: string;
  productionOrderId?: string;
  materialId?: string;
  materialName: string;
  consumableType: ConsumableType;
  quantityUsed: number;
  unit: string;
  unitPrice: number;
  totalCost: number;
  date: Date;
  workerId?: string;
  workerName?: string;
  notes?: string;
}

export interface ConsumptionReport {
  period: { start: Date; end: Date };
  byType: Record<ConsumableType, { quantity: number; cost: number }>;
  byOrder: { orderId: string; orderNumber: string; totalCost: number }[];
  totalQuantity: number;
  totalCost: number;
  topMaterials: { name: string; quantity: number; cost: number }[];
}

// Parsed Material (from supplier websites)
export interface ParsedMaterial {
  id: string;
  name: string;
  price: number;
  unit: string;
  currency: string;
  imageUrl?: string;
  description?: string;
  sourceUrl: string;
  supplierName: string;
  category?: MaterialCategory;
  sku?: string;
  available: boolean;
  parsedAt: Date;
}