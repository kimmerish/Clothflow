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
  Supplier,
  TrainingLesson,
  OrderTraining,
  MaterialConsumption,
  ConsumableType,
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

// Suppliers
export const mockSuppliers: Supplier[] = [
  {
    id: 'sup_1',
    name: 'Текстиль Україна',
    contactPerson: 'Олексій Петренко',
    email: 'info@tekstyl.com.ua',
    phone: '+380 44 555 1234',
    address: 'вул. Хрещатик 10, Київ',
    website: 'https://tekstyl.com.ua',
    categories: ['fabric', 'thread'],
    rating: 4.8,
    notes: 'Провідний постачальник тканин в Україні',
    createdAt: new Date('2023-01-15'),
  },
  {
    id: 'sup_2',
    name: 'Silk World',
    contactPerson: 'Марія Коваленко',
    email: 'sales@silkworld.com',
    phone: '+380 32 555 5678',
    address: 'вул. Садова 25, Львів',
    website: 'https://silkworld.com',
    categories: ['fabric', 'lace'],
    rating: 4.5,
    notes: 'Спеціалізується на шовкових тканинах',
    createdAt: new Date('2023-03-20'),
  },
  {
    id: 'sup_3',
    name: 'Гудтекс',
    contactPerson: 'Ігор Бондаренко',
    email: 'order@gudtex.ua',
    phone: '+380 56 555 9012',
    address: 'пр. Гагаріна 100, Дніпро',
    categories: ['thread', 'button'],
    rating: 4.2,
    createdAt: new Date('2023-06-10'),
  },
  {
    id: 'sup_4',
    name: 'Фурнітура Плюс',
    contactPerson: 'Світлана Шевченко',
    email: 'info@furnitura.plus',
    phone: '+380 48 555 3456',
    address: 'вул. Дерибасівська 15, Одеса',
    website: 'https://furnitura.plus',
    categories: ['button', 'zipper', 'accessory', 'rhinestone', 'beads'],
    rating: 4.7,
    notes: 'Великий вибір фурнітури та декору',
    createdAt: new Date('2023-02-28'),
  },
  {
    id: 'sup_5',
    name: 'Мереживо Маркет',
    contactPerson: 'Наталія Волощук',
    email: 'sales@meretyvo.market',
    phone: '+380 57 555 7890',
    address: 'вул. Пушкінська 50, Харків',
    website: 'https://meretyvo.market',
    categories: ['lace'],
    rating: 4.6,
    notes: 'Спеціалізоване мереживо з Європи',
    createdAt: new Date('2023-08-05'),
  },
  {
    id: 'sup_6',
    name: 'Бісер Оптом',
    contactPerson: 'Андрій Козак',
    email: 'order@biseroptom.com',
    phone: '+380 61 555 2345',
    address: 'вул. Миру 30, Запоріжжя',
    categories: ['beads', 'rhinestone'],
    rating: 4.3,
    createdAt: new Date('2023-09-12'),
  },
];

// Training Lessons
export const mockTrainingLessons: TrainingLesson[] = [
  {
    id: 'lesson_1',
    title: 'Основи крою тканин',
    description: 'Базові техніки розкрою тканин для різних типів одягу',
    category: 'cutting',
    content: `# Основи крою тканин

## Підготовка тканини
1. Перед розкроєм тканину необхідно:
   - Випрати та висушити
   - Прасувати
   - Дати відлежатися 24 години

## Розмітка
- Використовуйте крейду або водорозчинні маркери
- Обов'язково враховуйте напрямок нитки
- Залишайте припуски на шви (1-1.5 см)

## Розкрій
- Ножиці тримайте під кутом 45°
- Ріжте по напрямку волокон
- Для кількох шарів використовуйте роторний ніж`,
    duration: 45,
    order: 1,
  },
  {
    id: 'lesson_2',
    title: 'Техніка пошиву на різних машинах',
    description: 'Робота на промислових швейних машинах',
    category: 'sewing',
    content: `# Техніка пошиву

## Підбір голки
- Для бавовни: голка №80-90
- Для синтетики: голка №75-85
- Для шовку: голка №60-70

## Налаштування машини
1. Натяг нитки
2. Зусилля притиску лапки
3. Довжина стібка

## Типові операції
- Пряма строчка
- Зигзаг
- Оверлочний шов`,
    duration: 60,
    order: 2,
  },
  {
    id: 'lesson_3',
    title: 'Волого-теплова обробка (ВТО)',
    description: 'Прасування та формування виробу',
    category: 'finishing',
    content: `# ВТО - Волого-теплова обробка

## Обладнання
- Прасувальна дошка
- Парогенератор
- Універсальний рукав

## Температурні режими
- Бавовна: 200°C
- Поліестер: 150°C
- Шовк: 110°C
- Вовна: 160°C (з парою)

## Техніка
1. Прасуйте з виворітного боку
2. Використовуйте проутюжник
3. Для рельєфних деталей - через лляну тканину`,
    duration: 30,
    order: 3,
  },
  {
    id: 'lesson_4',
    title: 'Контроль якості виробу',
    description: 'Стандарти перевірки готової продукції',
    category: 'quality',
    content: `# Контроль якості

## Етапи перевірки
1. **Візуальний огляд**
   - Рівність швів
   - Симетричність
   - Відсутність плям

2. **Перевірка строчок**
   - Міцність
   - Рівномірність
   - Відсутність пропусків

3. **Вимірювання**
   - Відповідність розмірній сітці
   - Допуски ±1 см

## Документація
- Фото дефектів
- Акт перевірки
- Рішення про допуск/відбракування`,
    duration: 25,
    order: 4,
  },
  {
    id: 'lesson_5',
    title: 'Робота з мереживом',
    description: 'Техніки обробки та пошиву мереживних тканин',
    category: 'materials',
    content: `# Робота з мереживом

## Види мережива
- Тюлеве
- Кісейне
- Шаніль
- Гіпюр

## Підготовка
1. Обробка країв (зигзагом)
2. Зміцнення прокладкою
3. Правильне поєднання візерунку

## Пошив
- Дрібні стібки
- М'який натяг нитки
- Використання спеціальної лапки

## Догляд
- Ручне прання
- Зберігання в підвішеному стані`,
    duration: 40,
    order: 5,
  },
  {
    id: 'lesson_6',
    title: 'Пришивання страз та бісеру',
    description: 'Техніки декорування виробів',
    category: 'materials',
    content: `# Пришивання страз та бісеру

## Стrazy
- Термостразы (прасування)
- Пришивні (стібки)
- Самоклейні

## Бісер
- Розміри: №10, №8, №6
- Способи нанизування
- Мереживо з бісеру

## Інструменти
- Бісерна голка
- Мононить
- Наперсток

## Техніка
1. Закріплення нитки
2. Рівномірний натяг
3. Фіксування кінця`,
    duration: 35,
    order: 6,
  },
  {
    id: 'lesson_7',
    title: 'Вибір фурнітури для виробу',
    description: 'Типи фурнітури та їх застосування',
    category: 'materials',
    content: `# Вибір фурнітури

## Гудзики
- Пластикові
- Металеві
- Дерев'яні
- Перламутрові

## Блискавки
- Металеві
- Пластикові
- Потайні
- Тракторні

## Кнопки та гачки
- За的类型
- Способи кріплення

## Критерії вибору
1. Відповідність стилю
2. Міцність
3. Практичність`,
    duration: 30,
    order: 7,
  },
];

// Order Training
export const mockOrderTraining: OrderTraining[] = [
  {
    id: 'train_1',
    orderId: 'order_1',
    orderNumber: 'FF-2024-001',
    status: 'completed',
    requiredLessons: ['lesson_1', 'lesson_2', 'lesson_3', 'lesson_4'],
    progress: [
      { lessonId: 'lesson_1', lessonTitle: 'Основи крою тканин', completed: true, completedAt: new Date('2024-03-16'), score: 95 },
      { lessonId: 'lesson_2', lessonTitle: 'Техніка пошиву', completed: true, completedAt: new Date('2024-03-17'), score: 88 },
      { lessonId: 'lesson_3', lessonTitle: 'ВТО', completed: true, completedAt: new Date('2024-03-18'), score: 92 },
      { lessonId: 'lesson_4', lessonTitle: 'Контроль якості', completed: true, completedAt: new Date('2024-03-19'), score: 100 },
    ],
    startedAt: new Date('2024-03-16'),
    completedAt: new Date('2024-03-19'),
    score: 93.75,
    attempts: 1,
  },
  {
    id: 'train_2',
    orderId: 'order_4',
    orderNumber: 'FF-2024-004',
    status: 'in_progress',
    requiredLessons: ['lesson_1', 'lesson_2', 'lesson_5', 'lesson_6', 'lesson_7'],
    progress: [
      { lessonId: 'lesson_1', lessonTitle: 'Основи крою тканин', completed: true, completedAt: new Date('2024-04-06'), score: 90 },
      { lessonId: 'lesson_2', lessonTitle: 'Техніка пошиву', completed: true, completedAt: new Date('2024-04-07'), score: 85 },
      { lessonId: 'lesson_5', lessonTitle: 'Робота з мереживом', completed: false },
      { lessonId: 'lesson_6', lessonTitle: 'Пришивання страз', completed: false },
      { lessonId: 'lesson_7', lessonTitle: 'Вибір фурнітури', completed: false },
    ],
    startedAt: new Date('2024-04-06'),
    attempts: 1,
  },
];

// Material Consumption
export const mockMaterialConsumption: MaterialConsumption[] = [
  // FF-2024-001 - Суконня вечірня (80 шт)
  { id: 'cons_1', orderId: 'order_1', orderNumber: 'FF-2024-001', productionOrderId: 'prod_order_1', materialId: 'mat_1', materialName: 'Базова тканина чорна', consumableType: 'fabric', quantityUsed: 120, unit: 'метрів', unitPrice: 120, totalCost: 14400, date: new Date('2024-03-16'), workerId: 'user_3', workerName: 'Іван Бондаренко' },
  { id: 'cons_2', orderId: 'order_1', orderNumber: 'FF-2024-001', materialName: 'Підкладкова тканина', consumableType: 'fabric', quantityUsed: 60, unit: 'метрів', unitPrice: 80, totalCost: 4800, date: new Date('2024-03-16') },
  { id: 'cons_3', orderId: 'order_1', orderNumber: 'FF-2024-001', materialName: 'Мереживо декоративне', consumableType: 'lace', quantityUsed: 25, unit: 'метрів', unitPrice: 180, totalCost: 4500, date: new Date('2024-03-17'), workerId: 'user_3', workerName: 'Іван Бондаренко' },
  { id: 'cons_4', orderId: 'order_1', orderNumber: 'FF-2024-001', materialName: 'Стrazy Swarovski', consumableType: 'rhinestone', quantityUsed: 320, unit: 'штук', unitPrice: 15, totalCost: 4800, date: new Date('2024-03-18'), workerId: 'user_3', workerName: 'Іван Бондаренко' },
  { id: 'cons_5', orderId: 'order_1', orderNumber: 'FF-2024-001', materialName: 'Бісер чеський', consumableType: 'beads', quantityUsed: 800, unit: 'грам', unitPrice: 2.5, totalCost: 2000, date: new Date('2024-03-18') },
  { id: 'cons_6', orderId: 'order_1', orderNumber: 'FF-2024-001', materialId: 'mat_4', materialName: 'Нитки чорні 1000м', consumableType: 'thread', quantityUsed: 8, unit: 'штук', unitPrice: 45, totalCost: 360, date: new Date('2024-03-19'), workerId: 'user_3', workerName: 'Іван Бондаренко' },
  { id: 'cons_7', orderId: 'order_1', orderNumber: 'FF-2024-001', materialId: 'mat_6', materialName: 'Гудзики пластикові 20мм', consumableType: 'accessory', quantityUsed: 320, unit: 'штук', unitPrice: 2.5, totalCost: 800, date: new Date('2024-03-19') },
  
  // FF-2024-002 - Блузки (180 шт)
  { id: 'cons_8', orderId: 'order_2', orderNumber: 'FF-2024-002', productionOrderId: 'prod_order_2', materialId: 'mat_2', materialName: 'Базова тканина біла', consumableType: 'fabric', quantityUsed: 180, unit: 'метрів', unitPrice: 115, totalCost: 20700, date: new Date('2024-03-21'), workerId: 'user_4', workerName: 'Петро Коваленко' },
  { id: 'cons_9', orderId: 'order_2', orderNumber: 'FF-2024-002', materialName: 'Кружево для коміра', consumableType: 'lace', quantityUsed: 36, unit: 'метрів', unitPrice: 95, totalCost: 3420, date: new Date('2024-03-22') },
  { id: 'cons_10', orderId: 'order_2', orderNumber: 'FF-2024-002', materialId: 'mat_5', materialName: 'Нитки білі 1000м', consumableType: 'thread', quantityUsed: 12, unit: 'штук', unitPrice: 45, totalCost: 540, date: new Date('2024-03-23'), workerId: 'user_4', workerName: 'Петро Коваленко' },
  
  // FF-2024-006 - Штани жіночі (80 шт)
  { id: 'cons_11', orderId: 'order_6', orderNumber: 'FF-2024-006', productionOrderId: 'prod_order_4', materialName: 'Денім синій', consumableType: 'fabric', quantityUsed: 96, unit: 'метрів', unitPrice: 150, totalCost: 14400, date: new Date('2024-03-02'), workerId: 'user_3', workerName: 'Іван Бондаренко' },
  { id: 'cons_12', orderId: 'order_6', orderNumber: 'FF-2024-006', materialName: 'Підкладка', consumableType: 'fabric', quantityUsed: 40, unit: 'метрів', unitPrice: 60, totalCost: 2400, date: new Date('2024-03-02') },
  { id: 'cons_13', orderId: 'order_6', orderNumber: 'FF-2024-006', materialId: 'mat_8', materialName: 'Замок блискавка 50см', consumableType: 'accessory', quantityUsed: 80, unit: 'штук', unitPrice: 35, totalCost: 2800, date: new Date('2024-03-03'), workerId: 'user_3', workerName: 'Іван Бондаренко' },
  { id: 'cons_14', orderId: 'order_6', orderNumber: 'FF-2024-006', materialName: 'Гудзики металеві', consumableType: 'accessory', quantityUsed: 160, unit: 'штук', unitPrice: 8, totalCost: 1280, date: new Date('2024-03-03') },
  
  // FF-2024-008 - Куртки шкільні (300 шт)
  { id: 'cons_15', orderId: 'order_8', orderNumber: 'FF-2024-008', materialName: 'Тканина для курток', consumableType: 'fabric', quantityUsed: 450, unit: 'метрів', unitPrice: 180, totalCost: 81000, date: new Date('2024-01-22'), workerId: 'user_3', workerName: 'Іван Бондаренко' },
  { id: 'cons_16', orderId: 'order_8', orderNumber: 'FF-2024-008', materialName: 'Підкладка шкільна', consumableType: 'fabric', quantityUsed: 300, unit: 'метрів', unitPrice: 70, totalCost: 21000, date: new Date('2024-01-22') },
  { id: 'cons_17', orderId: 'order_8', orderNumber: 'FF-2024-008', materialName: 'Флізелін', consumableType: 'accessory', quantityUsed: 150, unit: 'метрів', unitPrice: 25, totalCost: 3750, date: new Date('2024-01-23') },
  { id: 'cons_18', orderId: 'order_8', orderNumber: 'FF-2024-008', materialName: 'Блискавки тракторні', consumableType: 'accessory', quantityUsed: 300, unit: 'штук', unitPrice: 28, totalCost: 8400, date: new Date('2024-01-23') },
  { id: 'cons_19', orderId: 'order_8', orderNumber: 'FF-2024-008', materialName: 'Нитки армовані', consumableType: 'thread', quantityUsed: 45, unit: 'штук', unitPrice: 65, totalCost: 2925, date: new Date('2024-01-24') },
];

// Helper functions for consumption
export const getConsumptionByType = (type: ConsumableType) =>
  mockMaterialConsumption.filter(c => c.consumableType === type);

export const getConsumptionByOrder = (orderId: string) =>
  mockMaterialConsumption.filter(c => c.orderId === orderId);

export const getTotalConsumptionCost = () =>
  mockMaterialConsumption.reduce((sum, c) => sum + c.totalCost, 0);

export const getConsumptionByPeriod = (start: Date, end: Date) =>
  mockMaterialConsumption.filter(c => c.date >= start && c.date <= end);