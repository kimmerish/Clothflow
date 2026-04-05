// Types for FashionFlow - Fashion Manufacturing SaaS

// Production Roles (Real manufacturing cycle)
export type ProductionRole = 
  | 'designer'           // Дизайнер - розробка моделей
  | 'pattern_maker'      // Конструктор - побудова викрійок
  | 'technologist'       // Технолог - розробка технології
  | 'cutter'             // Розкрійник - крій тканини
  | 'seamstress'         // Швачка - пошив
  | 'finisher'           // Закрійник - ВТО (волого-теплова обробка)
  | 'qc_inspector'       // Контролер якості - перевірка
  | 'packer';            // Пакувальник - упаковка

export type UserRole = 'admin' | 'manager' | 'worker' | ProductionRole;

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
  productionRole?: ProductionRole;
  specialties?: string[];
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

export type ProductionType = 'serial' | 'individual';

export type OperationType = 
  | 'design'             // Дизайн
  | 'pattern'            // Побудова викрійки
  | 'tech_process'       // Розробка технології
  | 'cutting'            // Крій
  | 'sewing'             // Пошив
  | 'fitting'            // Примірка (для індивідуальних)
  | 'finishing'          // ВТО
  | 'quality_control'     // Контроль якості
  | 'packaging';         // Пакування

export interface ProductionOperation {
  id: string;
  type: OperationType;
  name: string;
  description?: string;
  status: ProductionStatus;
  assignedTo?: string;
  assignedToName?: string;
  role?: ProductionRole;
  startDate?: Date;
  endDate?: Date;
  estimatedDuration?: number; // в хвилинах
  notes?: string;
}

// Garment Preview
export interface GarmentPreview {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  sketchUrl?: string;
  technicalDrawing?: string;
  measurements?: GarmentMeasurements;
  createdAt: Date;
  updatedAt: Date;
}

// Measurements for individual garments
export interface GarmentMeasurements {
  // Верхня частина
  bust?: number;           // Обхват грудей
  waist?: number;          // Обхват талії
  hips?: number;           // Обхват стегон
  chestWidth?: number;     // Ширина по груді
  backWidth?: number;      // Ширина спини
  shoulderWidth?: number;   // Ширина плечей
  frontLength?: number;    // Довжина переду
  backLength?: number;      // Довжина спини
  sleeveLength?: number;    // Довжина рукава
  armholeDepth?: number;    // Глибина пройми
  neckCircumference?: number; // Обхват шиї
  
  // Нижня частина
  waistHeight?: number;    // Зріст до талії
  inseam?: number;         // Довжина штанини
  outseam?: number;        // Бічна довжина
  thighCircumference?: number; // Обхват стегна
  kneeCircumference?: number;  // Обхват коліна
  calfCircumference?: number; // Обхват литки
  ankleCircumference?: number; // Обхват щиколотки
  
  // Загальні
  height?: number;        // Зріст
  weight?: number;         // Вага
  garmentLength?: number;  // Загальна довжина виробу
}

// Fitting Stage (для індивідуальних виробів)
export type FittingStatus = 'scheduled' | 'in_progress' | 'completed' | 'cancelled';

export interface FittingStage {
  id: string;
  orderId: string;
  productionOrderId: string;
  stageNumber: number;
  name: string;
  description?: string;
  scheduledDate?: Date;
  actualDate?: Date;
  status: FittingStatus;
  notes?: string;
  changesRequired?: string[];
  approved: boolean;
  fittingPhotos?: string[];
}

// Size Gradation (для серійних моделей)
export interface SizeGradation {
  size: string;
  code: string;           // XS, S, M, L, XL, XXL
  chestCircumference?: number;
  waistCircumference?: number;
  hipsCircumference?: number;
  backLength?: number;
  sleeveLength?: number;
  shoulderWidth?: number;
  garmentLength?: number;
  quantity: number;
}

export interface SizeTable {
  id: string;
  name: string;
  description?: string;
  baseSize: string;        // Базовий розмір для градації
  gradations: SizeGradation[];
  createdAt: Date;
}

// Production Process Template
export interface ProductionProcessTemplate {
  id: string;
  name: string;
  description?: string;
  type: ProductionType;
  operations: ProductionOperation[];
  estimatedTime: number;    // в хвилинах на один виріб
  createdAt: Date;
}

// Individual Order Parameters
export interface CustomerParameters {
  customerId: string;
  customerName: string;
  measurements: GarmentMeasurements;
  preferences?: string;
  fittingSchedule: FittingStage[];
  totalFittings: number;
}

// Serial Order Parameters
export interface SerialParameters {
  sizeTableId?: string;
  sizeTable?: SizeTable;
  totalQuantity: number;
  perSizeBreakdown: Record<string, number>;
}

// Garment Model (Design Reference)
export interface GarmentModel {
  id: string;
  name: string;
  sku: string;
  description: string;
  type: ProductionType;
  previewUrl?: string;
  technicalDrawingUrl?: string;
  sizeTableId?: string;
  processTemplateId?: string;
  basePrice: number;
  materials: string[];     // IDs required materials
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductionOrder {
  id: string;
  orderId: string;
  orderNumber: string;
  
  // Production Type
  type: ProductionType;
  
  // Items
  garmentModelId?: string;
  garmentModel?: GarmentModel;
  
  // Serial Production
  serialParams?: SerialParameters;
  
  // Individual Production
  individualParams?: CustomerParameters;
  
  // Operations
  operations: ProductionOperation[];
  
  // Workers
  workers: string[];
  workerAssignments: { userId: string; userName: string; role: ProductionRole; operationIds: string[] }[];
  
  // Timeline
  status: ProductionStatus;
  startDate: Date;
  estimatedEndDate: Date;
  actualEndDate?: Date;
  progress: number;
  
  // Preview
  preview?: GarmentPreview;
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