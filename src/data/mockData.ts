// Mock Data for FashionFlow

import type {
  Company,
  User,
  Order,
  ProductionOrder,
  Material,
  Product,
  Customer,
  Transaction,
  DashboardStats,
} from '@/types';

// Company
export const mockCompany: Company = {
  id: 'comp_1',
  name: 'FashionFlow Ukraine',
  logo: '',
  phone: '+380 44 123 4567',
  email: 'info@fashionflow.com',
  address: 'вул. Шевченка 15, Київ, Україна',
  createdAt: new Date('2024-01-01'),
};

// Users
export const mockUsers: User[] = [
  {
    id: 'user_1',
    email: 'admin@fashionflow.com',
    name: 'Олександр Шевченко',
    role: 'admin',
    companyId: 'comp_1',
    phone: '+380 50 111 1111',
    position: 'Директор',
    department: 'Management',
    createdAt: new Date('2024-01-01'),
  },
  {
    id: 'user_2',
    email: 'manager@fashionflow.com',
    name: 'Марія Коваленко',
    role: 'manager',
    companyId: 'comp_1',
    phone: '+380 50 222 2222',
    position: 'Менеджер виробництва',
    department: 'Production',
    createdAt: new Date('2024-02-15'),
  },
  {
    id: 'user_3',
    email: 'worker@fashionflow.com',
    name: 'Іван Бондаренко',
    role: 'worker',
    companyId: 'comp_1',
    phone: '+380 50 333 3333',
    position: 'Кравець',
    department: 'Sewing',
    createdAt: new Date('2024-03-01'),
  },
];

// Customers
export const mockCustomers: Customer[] = [
  {
    id: 'cust_1',
    name: 'Петро Василенко',
    email: 'petro@ retailer.ua',
    phone: '+380 67 111 1111',
    address: 'Одеса, Україна',
    type: 'company',
    companyName: 'RetailUА',
    totalOrders: 12,
    totalSpent: 156000,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 'cust_2',
    name: 'Анна Смирнова',
    email: 'anna@fashionboutique.com',
    phone: '+380 50 222 2222',
    address: 'Львів, Україна',
    type: 'company',
    companyName: 'Fashion Boutique',
    totalOrders: 8,
    totalSpent: 89000,
    createdAt: new Date('2024-02-20'),
  },
  {
    id: 'cust_3',
    name: 'Михайло Козак',
    email: 'mikhail.kozak@gmail.com',
    phone: '+380 93 333 3333',
    type: 'individual',
    totalOrders: 3,
    totalSpent: 15000,
    createdAt: new Date('2024-03-10'),
  },
  {
    id: 'cust_4',
    name: 'Тарас Шевчук',
    email: 'taras@clothes.com.ua',
    phone: '+380 44 444 4444',
    address: 'Київ, Україна',
    type: 'company',
    companyName: 'Clothes.com.ua',
    totalOrders: 25,
    totalSpent: 420000,
    createdAt: new Date('2023-11-05'),
  },
  {
    id: 'cust_5',
    name: 'Наталія Волощук',
    email: 'natalia@studio-fashion.com',
    phone: '+380 67 555 5555',
    address: 'Харків, Україна',
    type: 'company',
    companyName: 'Studio Fashion',
    totalOrders: 6,
    totalSpent: 72000,
    createdAt: new Date('2024-04-01'),
  },
];

// Orders
export const mockOrders: Order[] = [
  {
    id: 'order_1',
    orderNumber: 'FF-2024-001',
    customerId: 'cust_1',
    customerName: 'RetailUА',
    items: [
      { id: 'item_1', productId: 'prod_1', productName: 'Сукня вечірня', size: 'M', color: 'Чорний', quantity: 50, unitPrice: 1200, totalPrice: 60000 },
      { id: 'item_2', productId: 'prod_2', productName: 'Сукня вечірня', size: 'L', color: 'Чорний', quantity: 30, unitPrice: 1200, totalPrice: 36000 },
    ],
    totalAmount: 96000,
    status: 'in_production',
    deadline: new Date('2024-04-20'),
    createdAt: new Date('2024-03-15'),
    productionId: 'prod_order_1',
  },
  {
    id: 'order_2',
    orderNumber: 'FF-2024-002',
    customerId: 'cust_2',
    customerName: 'Fashion Boutique',
    items: [
      { id: 'item_3', productId: 'prod_3', productName: 'Блузка офісна', size: 'S', color: 'Білий', quantity: 100, unitPrice: 450, totalPrice: 45000 },
      { id: 'item_4', productId: 'prod_3', productName: 'Блузка офісна', size: 'M', color: 'Білий', quantity: 80, unitPrice: 450, totalPrice: 36000 },
    ],
    totalAmount: 81000,
    status: 'quality_check',
    deadline: new Date('2024-04-15'),
    createdAt: new Date('2024-03-20'),
    productionId: 'prod_order_2',
  },
  {
    id: 'order_3',
    orderNumber: 'FF-2024-003',
    customerId: 'cust_3',
    customerName: 'Михайло Козак',
    items: [
      { id: 'item_5', productId: 'prod_4', productName: 'Костюм чоловічий', size: '52', color: 'Сірий', quantity: 5, unitPrice: 3000, totalPrice: 15000 },
    ],
    totalAmount: 15000,
    status: 'new',
    deadline: new Date('2024-05-01'),
    createdAt: new Date('2024-04-01'),
  },
  {
    id: 'order_4',
    orderNumber: 'FF-2024-004',
    customerId: 'cust_4',
    customerName: 'Clothes.com.ua',
    items: [
      { id: 'item_6', productId: 'prod_5', productName: 'Пальто демісезонне', size: 'M', color: 'Бежевий', quantity: 200, unitPrice: 2500, totalPrice: 500000 },
    ],
    totalAmount: 500000,
    status: 'confirmed',
    deadline: new Date('2024-06-15'),
    createdAt: new Date('2024-04-05'),
  },
  {
    id: 'order_5',
    orderNumber: 'FF-2024-005',
    customerId: 'cust_5',
    customerName: 'Studio Fashion',
    items: [
      { id: 'item_7', productId: 'prod_6', productName: 'Спідниця міні', size: 'S', color: 'Червоний', quantity: 40, unitPrice: 600, totalPrice: 24000 },
      { id: 'item_8', productId: 'prod_6', productName: 'Спідниця міні', size: 'M', color: 'Червоний', quantity: 60, unitPrice: 600, totalPrice: 36000 },
    ],
    totalAmount: 60000,
    status: 'ready',
    deadline: new Date('2024-04-10'),
    createdAt: new Date('2024-03-25'),
    productionId: 'prod_order_3',
  },
  {
    id: 'order_6',
    orderNumber: 'FF-2024-006',
    customerId: 'cust_1',
    customerName: 'RetailUА',
    items: [
      { id: 'item_9', productId: 'prod_7', productName: 'Штани жіночі', size: 'M', color: 'Синій', quantity: 80, unitPrice: 800, totalPrice: 64000 },
    ],
    totalAmount: 64000,
    status: 'shipped',
    deadline: new Date('2024-04-01'),
    createdAt: new Date('2024-03-01'),
    productionId: 'prod_order_4',
  },
  {
    id: 'order_7',
    orderNumber: 'FF-2024-007',
    customerId: 'cust_2',
    customerName: 'Fashion Boutique',
    items: [
      { id: 'item_10', productId: 'prod_8', productName: 'Ремінь жіночий', size: 'OneSize', color: 'Коричневий', quantity: 150, unitPrice: 200, totalPrice: 30000 },
    ],
    totalAmount: 30000,
    status: 'completed',
    deadline: new Date('2024-03-20'),
    createdAt: new Date('2024-02-15'),
  },
  {
    id: 'order_8',
    orderNumber: 'FF-2024-008',
    customerId: 'cust_4',
    customerName: 'Clothes.com.ua',
    items: [
      { id: 'item_11', productId: 'prod_9', productName: 'Куртка шкільна', size: '140', color: 'Темно-синій', quantity: 300, unitPrice: 1800, totalPrice: 540000 },
    ],
    totalAmount: 540000,
    status: 'completed',
    deadline: new Date('2024-02-28'),
    createdAt: new Date('2024-01-20'),
  },
];

// Production Orders
export const mockProductionOrders: ProductionOrder[] = [
  {
    id: 'prod_order_1',
    orderId: 'order_1',
    orderNumber: 'FF-2024-001',
    operations: [
      { id: 'op_1', type: 'cutting', name: 'Крій', status: 'completed', startDate: new Date('2024-03-16'), endDate: new Date('2024-03-18') },
      { id: 'op_2', type: 'sewing', name: 'Пошив', status: 'in_progress', assignedTo: 'user_3', startDate: new Date('2024-03-19') },
      { id: 'op_3', type: 'finishing', name: 'ВТО', status: 'planned' },
      { id: 'op_4', type: 'quality_control', name: 'Контроль якості', status: 'planned' },
      { id: 'op_5', type: 'packaging', name: 'Пакування', status: 'planned' },
    ],
    workers: ['user_3', 'user_4'],
    status: 'in_progress',
    startDate: new Date('2024-03-16'),
    estimatedEndDate: new Date('2024-04-18'),
    progress: 40,
  },
  {
    id: 'prod_order_2',
    orderId: 'order_2',
    orderNumber: 'FF-2024-002',
    operations: [
      { id: 'op_6', type: 'cutting', name: 'Крій', status: 'completed', startDate: new Date('2024-03-21'), endDate: new Date('2024-03-22') },
      { id: 'op_7', type: 'sewing', name: 'Пошив', status: 'completed', startDate: new Date('2024-03-23'), endDate: new Date('2024-04-01') },
      { id: 'op_8', type: 'finishing', name: 'ВТО', status: 'completed', startDate: new Date('2024-04-02'), endDate: new Date('2024-04-03') },
      { id: 'op_9', type: 'quality_control', name: 'Контроль якості', status: 'in_progress', assignedTo: 'user_5' },
      { id: 'op_10', type: 'packaging', name: 'Пакування', status: 'planned' },
    ],
    workers: ['user_3', 'user_4', 'user_5'],
    status: 'quality_check',
    startDate: new Date('2024-03-21'),
    estimatedEndDate: new Date('2024-04-14'),
    progress: 80,
  },
  {
    id: 'prod_order_3',
    orderId: 'order_5',
    orderNumber: 'FF-2024-005',
    operations: [
      { id: 'op_11', type: 'cutting', name: 'Крій', status: 'completed' },
      { id: 'op_12', type: 'sewing', name: 'Пошив', status: 'completed' },
      { id: 'op_13', type: 'finishing', name: 'ВТО', status: 'completed' },
      { id: 'op_14', type: 'quality_control', name: 'Контроль якості', status: 'completed' },
      { id: 'op_15', type: 'packaging', name: 'Пакування', status: 'completed' },
    ],
    workers: ['user_4'],
    status: 'completed',
    startDate: new Date('2024-03-26'),
    estimatedEndDate: new Date('2024-04-08'),
    actualEndDate: new Date('2024-04-09'),
    progress: 100,
  },
  {
    id: 'prod_order_4',
    orderId: 'order_6',
    orderNumber: 'FF-2024-006',
    operations: [
      { id: 'op_16', type: 'cutting', name: 'Крій', status: 'completed' },
      { id: 'op_17', type: 'sewing', name: 'Пошив', status: 'completed' },
      { id: 'op_18', type: 'finishing', name: 'ВТО', status: 'completed' },
      { id: 'op_19', type: 'quality_control', name: 'Контроль якості', status: 'completed' },
      { id: 'op_20', type: 'packaging', name: 'Пакування', status: 'completed' },
    ],
    workers: ['user_3'],
    status: 'completed',
    startDate: new Date('2024-03-02'),
    estimatedEndDate: new Date('2024-03-30'),
    actualEndDate: new Date('2024-03-31'),
    progress: 100,
  },
];

// Materials
export const mockMaterials: Material[] = [
  { id: 'mat_1', name: 'Базова тканина чорна', sku: 'FAB-001', category: 'fabric', unit: 'meter', quantity: 2500, minQuantity: 500, unitPrice: 120, supplier: 'Текстиль Україна' },
  { id: 'mat_2', name: 'Базова тканина біла', sku: 'FAB-002', category: 'fabric', unit: 'meter', quantity: 1800, minQuantity: 500, unitPrice: 115, supplier: 'Текстиль Україна' },
  { id: 'mat_3', name: 'Шовкова тканина бежева', sku: 'FAB-003', category: 'fabric', unit: 'meter', quantity: 300, minQuantity: 100, unitPrice: 350, supplier: 'Silk World' },
  { id: 'mat_4', name: 'Нитки чорні 1000м', sku: 'THR-001', category: 'thread', unit: 'piece', quantity: 150, minQuantity: 50, unitPrice: 45, supplier: 'Гудтекс' },
  { id: 'mat_5', name: 'Нитки білі 1000м', sku: 'THR-002', category: 'thread', unit: 'piece', quantity: 80, minQuantity: 50, unitPrice: 45, supplier: 'Гудтекс' },
  { id: 'mat_6', name: 'Гудзики пластикові 20мм', sku: 'BTN-001', category: 'button', unit: 'piece', quantity: 2000, minQuantity: 500, unitPrice: 2.5, supplier: 'Фурнітура Плюс' },
  { id: 'mat_7', name: 'Гудзики металеві 15мм', sku: 'BTN-002', category: 'button', unit: 'piece', quantity: 300, minQuantity: 200, unitPrice: 8, supplier: 'Фурнітура Плюс' },
  { id: 'mat_8', name: 'Замок блискавка 50см', sku: 'ZIP-001', category: 'zipper', unit: 'piece', quantity: 450, minQuantity: 100, unitPrice: 35, supplier: 'ZipFast' },
  { id: 'mat_9', name: 'Замок блискавка 70см', sku: 'ZIP-002', category: 'zipper', unit: 'piece', quantity: 80, minQuantity: 100, unitPrice: 45, supplier: 'ZipFast', lastRestocked: new Date('2024-02-15') },
  { id: 'mat_10', name: 'Рукав резиновий', sku: 'ACC-001', category: 'accessory', unit: 'meter', quantity: 50, minQuantity: 30, unitPrice: 25, supplier: 'Текстиль Україна' },
];

// Products (Finished Goods)
export const mockProducts: Product[] = [
  { id: 'prod_1', name: 'Сукня вечірня', sku: 'DRS-001', category: 'Dresses', sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Чорний', 'Червоний', 'Білий'], quantity: 0, unitPrice: 1200 },
  { id: 'prod_2', name: 'Блузка офісна', sku: 'BLZ-001', category: 'Tops', sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Білий', 'Бежевий', 'Сірий'], quantity: 180, unitPrice: 450 },
  { id: 'prod_3', name: 'Костюм чоловічий', sku: 'SUT-001', category: 'Suits', sizes: ['48', '50', '52', '54', '56'], colors: ['Сірий', 'Чорний', 'Синій'], quantity: 5, unitPrice: 3000 },
  { id: 'prod_4', name: 'Пальто демісезонне', sku: 'COT-001', category: 'Outerwear', sizes: ['S', 'M', 'L', 'XL', 'XXL'], colors: ['Бежевий', 'Чорний', 'Сірий'], quantity: 200, unitPrice: 2500 },
  { id: 'prod_5', name: 'Спідниця міні', sku: 'SKT-001', category: 'Skirts', sizes: ['XS', 'S', 'M', 'L'], colors: ['Червоний', 'Чорний', 'Синій'], quantity: 100, unitPrice: 600 },
  { id: 'prod_6', name: 'Штани жіночі', sku: 'PNT-001', category: 'Pants', sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Синій', 'Чорний', 'Білий'], quantity: 0, unitPrice: 800 },
  { id: 'prod_7', name: 'Ремінь жіночий', sku: 'BLT-001', category: 'Accessories', sizes: ['OneSize'], colors: ['Коричневий', 'Чорний'], quantity: 150, unitPrice: 200 },
  { id: 'prod_8', name: 'Куртка шкільна', sku: 'JKT-001', category: 'Outerwear', sizes: ['122', '128', '134', '140', '146'], colors: ['Темно-синій', 'Чорний'], quantity: 300, unitPrice: 1800 },
];

// Transactions
export const mockTransactions: Transaction[] = [
  { id: 'trans_1', type: 'income', category: 'Замовлення', amount: 96000, description: 'Оплата за замовлення FF-2024-001', date: new Date('2024-03-16'), orderId: 'order_1' },
  { id: 'trans_2', type: 'income', category: 'Замовлення', amount: 81000, description: 'Оплата за замовлення FF-2024-002', date: new Date('2024-03-21'), orderId: 'order_2' },
  { id: 'trans_3', type: 'expense', category: 'Матеріали', amount: 35000, description: 'Закупка тканин', date: new Date('2024-03-10') },
  { id: 'trans_4', type: 'expense', category: 'Зарплата', amount: 85000, description: 'Зарплатня за березень', date: new Date('2024-03-31') },
  { id: 'trans_5', type: 'expense', category: 'Оренда', amount: 25000, description: 'Оренда приміщення', date: new Date('2024-04-01') },
  { id: 'trans_6', type: 'income', category: 'Замовлення', amount: 64000, description: 'Оплата за замовлення FF-2024-006', date: new Date('2024-04-02'), orderId: 'order_6' },
  { id: 'trans_7', type: 'expense', category: 'Комунальні', amount: 12000, description: 'Комунальні послуги', date: new Date('2024-04-03') },
  { id: 'trans_8', type: 'income', category: 'Замовлення', amount: 540000, description: 'Оплата за замовлення FF-2024-008', date: new Date('2024-02-25'), orderId: 'order_8' },
];

// Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  ordersThisMonth: 5,
  ordersAmountThisMonth: 769000,
  productionInProgress: 2,
  lowStockMaterials: 3,
  weeklyRevenue: [45000, 62000, 38000, 81000, 55000, 72000, 48000],
  monthlyRevenue: 771000,
  orderStatusBreakdown: {
    new: 1,
    confirmed: 1,
    in_production: 1,
    quality_check: 1,
    ready: 1,
    shipped: 1,
    completed: 2,
    cancelled: 0,
  },
};

// Staff (Workers)
export const mockStaff = mockUsers.filter(u => u.role === 'worker' || u.role === 'manager');

export const getOrdersByStatus = (status: OrderStatus) => 
  mockOrders.filter(o => o.status === status);

export const getLowStockMaterials = () =>
  mockMaterials.filter(m => m.quantity <= m.minQuantity);