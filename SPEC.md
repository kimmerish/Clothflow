# SPEC.md - FashionFlow - SaaS система управління виробництвом одягу

## 1. Project Overview

**Назва проекту:** FashionFlow  
**Тип:** SaaS веб-додаток для управління швейним виробництвом  
**Опис:** Комплексна система для автоматизації бізнес-процесів швейного підприємства - від прийому замовлень до відвантаження готової продукції.  
**Цільова аудиторія:** Власники швейних фабрик, цехів, майстерень, менеджери виробництва, технологи, кравці

---

## 2. UI/UX Specification

### 2.1 Layout Structure

**Глобальна структура:**
- Sidebar навігація (ліворуч, 280px, згортається до 72px)
- Top header (64px висота)
- Main content area (адаптивна)
- Floating action buttons

**Сторінки:**
- `/` - Login/Register
- `/dashboard` - Головна dashboard
- `/orders` - Замовлення
- `/orders/:id` - Деталі замовлення
- `/production` - Виробництво
- `/production/:id` - Картка виробництва
- `/inventory` - Склад
- `/inventory/materials` - Матеріали
- `/inventory/products` - Готова продукція
- `/customers` - Клієнти
- `/staff` - Персонал
- `/finance` - Фінанси
- `/settings` - Налаштування

### 2.2 Visual Design

**Color Palette:**
```css
--primary: #1a1a2e          /* Deep Navy - основний */
--primary-light: #16213e   /* Darker Navy */
--accent: #e94560           /* Coral Red - акцент */
--accent-secondary: #0f3460 /* Royal Blue */
--success: #10b981          /* Emerald */
--warning: #f59e0b          /* Amber */
--danger: #ef4444           /* Red */
--surface: #f8fafc          /* Light surface */
--surface-dark: #0f172a     /* Dark mode surface */
--text-primary: #1e293b     /* Slate 800 */
--text-secondary: #64748b  /* Slate 500 */
--border: #e2e8f0           /* Slate 200 */
```

**Typography:**
- Headings: "Playfair Display", serif - 32px/28px/24px/20px
- Body: "Inter Variable", sans-serif - 16px/14px/12px
- Monospace (коди): "JetBrains Mono", monospace

**Spacing System:**
- Base unit: 4px
- Common: 8px, 12px, 16px, 24px, 32px, 48px

**Visual Effects:**
- Card shadows: `0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)`
- Hover glow: `0 0 20px rgba(233, 69, 96, 0.2)`
- Border radius: 8px (cards), 6px (buttons), 12px (modals)
- Glassmorphism на sidebar: `backdrop-filter: blur(12px)`

### 2.3 Components

**Navigation:**
- Sidebar з іконками Lucide
- Активний стан: фон + left border accent
- Hover: subtle glow effect

**Cards:**
- Стандартний card з hover ефектом
- Stat cards з іконкою та трендом
- Product cards з image placeholder

**Tables:**
- Striped rows
- Sortable columns
- Pagination
- Row hover highlight

**Forms:**
- Floating labels
- Input з border-bottom style
- Validation states з іконками

**Buttons:**
- Primary: Coral Red fill
- Secondary: Outline
- Ghost: Transparent з hover
- Icon buttons з tooltip

**Status Badges:**
- Status-specific colors
- Dot indicator + text

---

## 3. Functionality Specification

### 3.1 Authentication

**Функції:**
- Реєстрація компанії (назва, email, пароль)
- Login для співробітників
- Role-based access: Admin, Manager, Worker
- Забудовуються тестові дані для демонстрації

**Demo Accounts:**
- Admin: admin@fashionflow.com / admin123
- Manager: manager@fashionflow.com / manager123
- Worker: worker@fashionflow.com / worker123

### 3.2 Dashboard

**Метрики:**
- Замовлення цього місяця (кількість + сума)
- Виробничі замовлення в роботі
- Склад: низький запас матеріалів
- Дохід за тиждень/місяць
- Графіки: динаміка замовлень, виробництво

**Швидкі дії:**
- Створити замовлення
- Додати матеріал
- Переглянути критичні замовлення

### 3.3 Orders Management (Замовлення)

**CRUD операції:**
- Створити замовлення (клієнт, товари, кількість, ціна, дедлайн)
- Перегляд списку з фільтрами (статус, дата, клієнт)
- Редагування замовлення
- Зміна статусу

**Статуси замовлень:**
1. New (Нове)
2. Confirmed (Підтверджено)
3. In Production (В роботі)
4. Quality Check (Перевірка якості)
5. Ready (Готове)
6. Shipped (Відвантажено)
7. Completed (Завершено)
8. Cancelled (Скасовано)

**Деталі замовлення:**
- Клієнт
- Товари з розмірами/кольорами
- Timeline стадій
- Пов'язані виробничі замовлення
- Фінансова інформація

### 3.4 Production Management (Виробництво)

**Виробничі замовлення:**
- Створення з замовлення клієнта
- Розподіл по цехах/роботах
- Додавання операцій

**Операції виробництва:**
- Крій
- Пошив
- Волого-теплова обробка
- Контроль якості
- Упаковка

**Kanban дошка:**
- Колонки за стадіями
- Drag & drop карток
- Assign працівників

### 3.5 Inventory (Склад)

**Матеріали:**
- Тканини, фурнітура, аксесуари
- Одиниці виміру (метри, штуки, рулони)
- Мінімальний запас (alerts)
- Прихід/витрата

**Готова продукція:**
- Артикули
- Розміри, кольори
- Штрих-коди

### 3.6 Customers (Клієнти)

**CRUD:**
- Компанії/приватні особи
- Контакти
- Історія замовлень
- Бонусна система

### 3.7 Staff (Персонал)

**Працівники:**
- ПІБ, посада, контакти
- Цех/відділ
- Статистика продуктивності

### 3.8 Finance (Фінанси)

**Модулі:**
- Прибутки від замовлень
- Витрати на матеріали
- Зарплатня (базова)
- Звіти: доходи/витрати, прибутковість

---

## 4. Data Structure (Mock Data)

### Компанія
```typescript
{
  id: string;
  name: string;
  logo?: string;
  phone: string;
  email: string;
  address: string;
  createdAt: Date;
}
```

### Замовлення
```typescript
{
  id: string;
  orderNumber: string;
  customerId: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  deadline: Date;
  createdAt: Date;
  productionId?: string;
}
```

### Виробництво
```typescript
{
  id: string;
  orderId: string;
  operations: ProductionOperation[];
  workers: string[];
  status: ProductionStatus;
  startDate: Date;
  estimatedEndDate: Date;
}
```

---

## 5. Acceptance Criteria

1. ✅ Dashboard відображає ключові метрики з графіками
2. ✅ CRUD для замовлень працює коректно
3. ✅ Production kanban дозволяє змінювати статуси
4. ✅ Inventory показує залишки з alerts
5. ✅ Customers CRUD функціонує
6. ✅ Staff CRUD функціонує
7. ✅ Finance показує базову статистику
8. ✅ Навігація працює між усіма сторінками
9. ✅ Адаптивний дизайн на mobile/desktop
10. ✅拜 Animations та мікровзаємодії працюють