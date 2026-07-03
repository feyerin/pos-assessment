# POS Cashier UI — Frontend Developer Assessment

Point of Sales (POS) Single Page Application built with **Vue 3**, **TypeScript**, **Pinia**, and **Tailwind CSS**.

This project was developed as part of a Frontend Developer technical assessment with a focus on building a responsive, scalable, and maintainable cashier interface. While the backend is simulated using **JSON Server**, the frontend architecture is designed to closely resemble a production-ready application by separating business logic, presentation, and API communication.

---

# Demo Features

| Assessment Requirement | Status | Implementation |
|------------------------|:------:|---------------|
| Display product catalog | ✅ | Product image, name, price, and stock information |
| Search products | ✅ | Real-time search using Pinia |
| Filter by category | ✅ | Category-based filtering |
| Add product to cart | ✅ | Cart management with quantity tracking |
| Increase / decrease quantity | ✅ | Quantity controls with stock validation |
| Prevent exceeding stock | ✅ | Quantity is limited to available inventory |
| Remove cart item | ✅ | Remove item from cart |
| Persistent cart | ✅ | Cart state stored in LocalStorage |
| Checkout process | ✅ | Mock REST API using JSON Server |
| Loading state | ✅ | Loading button during checkout |
| Success transaction | ✅ | Receipt state after successful checkout |
| Print receipt | ✅ | Browser print functionality |

---

# Features

## Product Catalog

- Display products with:
  - Product image
  - Product name
  - Price
  - Stock availability
- Search products by name
- Filter products by category
- Responsive product grid layout

---

## Cart Management

- Add products into cart
- Increase / decrease quantity
- Prevent quantity from exceeding available stock
- Remove products from cart
- Automatically calculate total items and total price
- Persist cart state using LocalStorage

---

## Checkout

- Simulate checkout using REST API
- Loading indicator while processing
- Success transaction state
- Receipt modal
- Print receipt functionality

---

# Tech Stack

- Vue 3
- TypeScript
- Vite
- Pinia
- Tailwind CSS
- Axios
- JSON Server
- Lucide Vue Next

---

# Architecture Decisions

## State Management (Pinia)

The application uses **Pinia** as the centralized state management solution to separate business logic from UI components.

### Product Store

Responsible for:

- Fetching products
- Product searching
- Category filtering

### Cart Store

Responsible for:

- Cart state
- Quantity management
- Stock validation
- Total calculation
- LocalStorage persistence

### Checkout Store

Responsible for:

- Checkout process
- Loading state
- Error handling
- Receipt state

### Toast Store

Responsible for:

- Global notification system
- Success feedback
- Error feedback

### Why Pinia?

Using Pinia provides several benefits:

- Centralized business logic
- Cleaner Vue components
- Better scalability
- Easier maintenance
- Predictable state flow

---

# Component-Based Architecture

The UI is composed of reusable components to improve maintainability and consistency.

### Product Components

- ProductGrid
- ProductCard
- CategoryList

### Cart Components

- CartSidebar
- CartItem
- ReceiptModal

### Shared UI Components

- LoadingButton
- SearchBar
- Toast
- HeaderBar

Benefits:

- Reusable UI
- Easier maintenance
- Better scalability
- Consistent design system

---

# Separation of Concerns

API communication is separated into dedicated service modules.

```
services/
├── productService.ts
└── checkoutService.ts
```

Components never communicate directly with Axios.

Benefits:

- Easier testing
- Cleaner UI components
- Better maintainability
- Easy backend replacement

---

# Type Safety

TypeScript is used across the entire application.

Shared interfaces are centralized inside the `types/` directory.

Examples:

- Product
- CartItem
- CheckoutPayload
- CheckoutResponse

This improves:

- Developer experience
- Autocomplete support
- Compile-time error checking
- Code readability

---

# User Experience Decisions

Several UI decisions were made to improve cashier workflow.

### Sticky Cart Sidebar

On desktop screens, the cart remains visible while browsing products, allowing cashiers to review orders without scrolling.

### Full Height Cart

The cart occupies the full viewport height, while only the product list inside the cart is scrollable. This keeps the checkout button visible at all times.

### Real-Time Search

Products are filtered instantly while typing to speed up product lookup.

### Category Filtering

Products can be narrowed by category to reduce scanning time.

### Stock Validation

Users cannot increase quantity beyond available stock.

### Loading Feedback

Checkout actions display loading states to prevent duplicate submissions.

### Responsive Layout

The application adapts across desktop, tablet, and mobile devices while maintaining usability.

---

# Data Flow

```
JSON Server API
        │
        ▼
 Product Service
        │
        ▼
  Product Store
        │
        ▼
  Product Components
        │
        ▼
    Cart Store
        │
        ▼
 Checkout Store
        │
        ▼
 Checkout Service
        │
        ▼
 Receipt / Toast
```

---

# Project Structure

```
pos-assessment/
│
├── frontend/
│   │
│   ├── src/
│   │
│   ├── api/              # Axios configuration
│   ├── components/       # Reusable UI components
│   ├── composables/      # Shared reusable logic
│   ├── router/           # Vue Router
│   ├── services/         # API abstraction
│   ├── stores/           # Pinia stores
│   ├── types/            # TypeScript interfaces
│   ├── utils/            # Helper utilities
│   └── views/            # Application pages
│
└── mock-api/
    └── db.json
```

---

# Mock API

The project uses **JSON Server** to simulate REST API interactions.

## Endpoints

| Method | Endpoint |
|---------|----------|
| GET | `/products` |
| POST | `/checkout` |

---

# Environment Variables

Create a `.env` file inside the frontend project.

```env
VITE_API_BASE_URL=http://localhost:3000
```

---

# Installation

## 1. Clone Repository

```bash
git clone <repository-url>
```

---

## 2. Start Mock API

```bash
cd mock-api
```

Install dependencies if needed.

```bash
npm install
```

Run JSON Server.

```bash
npx json-server --watch db.json --port 3000
```

API will be available at:

```
http://localhost:3000
```

---

## 3. Run Frontend

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

Run development server.

```bash
npm run dev
```

---

## 4. Production Build

```bash
npm run build
```

---

# Future Improvements

Possible enhancements for a production-ready POS system:

- User authentication
- Multiple payment methods
- Barcode scanner integration
- Order history
- Inventory management
- Customer management
- Keyboard shortcuts for cashier workflow
- End-to-end testing with Cypress

---

# Notes

This project emphasizes frontend engineering best practices rather than backend implementation.

Key areas of focus include:

- Clean architecture
- Centralized state management
- Component reusability
- Responsive UI
- Type safety
- Separation of concerns
- User experience for cashier workflows

Although the backend uses JSON Server for simulation purposes, the project structure is designed to support integration with a real REST API with minimal changes.