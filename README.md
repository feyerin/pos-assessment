# POS Cashier UI — Frontend Developer Assessment

Point of Sales (POS) Single Page Application built using Vue 3, TypeScript, Pinia, Tailwind CSS, and JSON Server.

---

# Features

## Product Catalog

* Display product list with:

  * Product image
  * Product name
  * Price
  * Stock availability
* Search products
* Filter products by category

---

## Cart Management

* Add product to cart
* Increase/decrease quantity
* Prevent quantity from exceeding available stock
* Remove item from cart
* Persistent cart using LocalStorage

---

## Checkout System

* Checkout simulation using REST API
* Success transaction state
* Receipt modal after checkout
* Print receipt functionality

---

# Tech Stack

* Vue 3
* TypeScript
* Vite
* Pinia
* Tailwind CSS
* Axios
* JSON Server
* Lucide Vue Next

---

# Frontend Architecture Decisions

## 1. State Management with Pinia

Pinia is used as centralized state management to separate business logic from UI components.

### Stores

### `product store`

Responsible for:

* product fetching
* search functionality
* category filtering

### `cart store`

Responsible for:

* cart state
* quantity management
* stock validation
* LocalStorage persistence

### `checkout store`

Responsible for:

* checkout process
* loading/error states
* receipt state management

### `toast store`

Responsible for:

* global notification system
* success/error feedback

This separation improves:

* scalability
* maintainability
* code readability

---

## 2. Component-Based Architecture

The application is built using reusable UI components such as:

* ProductCard
* CartItem
* LoadingButton
* CategoryCard
* ReceiptModal
* SearchInput

This approach improves:

* consistency
* reusability
* scalability
* cleaner UI structure

---

## 3. Separation of Concerns

API logic is separated into service layer:

* `productService.ts`
* `checkoutService.ts`

This keeps API/data-fetching logic independent from presentation/UI components.

---

## 4. Type Safety

TypeScript is used throughout:

* stores
* services
* composables
* component props

Custom interfaces and types are centralized inside the `types/` directory.

---

## 5. Persistent Cart

Cart state is persisted using LocalStorage to preserve transaction state during page refresh and improve user experience.

---

# Project Structure

```bash id="rj6wvm"
pos-assessment/
│
├── frontend/
│   │
│   ├── src/
│   │   │
│   │   ├── api/
│   │   │   └── axios.ts
│   │   │
│   │   ├── components/
│   │   │   ├── cart/
│   │   │   ├── layout/
│   │   │   ├── product/
│   │   │   └── ui/
│   │   │
│   │   ├── composables/
│   │   │
│   │   ├── router/
│   │   │
│   │   ├── services/
│   │   │
│   │   ├── stores/
│   │   │
│   │   ├── types/
│   │   │
│   │   ├── utils/
│   │   │
│   │   └── views/
│   │
│   └── package.json
│
└── mock-api/
    └── db.json
```

---

# Mock API

This project uses JSON Server as mock REST API.

## API Endpoints

```bash id="h1y2wt"
GET    /products
POST   /checkout
```

---

# Mock API Configuration

## API Base URL

```env id="wdx8eu"
VITE_API_BASE_URL=http://localhost:3000
```

---

# Installation & Setup

## 1. Clone Repository

```bash id="cimjma"
git clone <repository-url>
```

---

## 2. Run Mock API Server

Open terminal and move into the `mock-api` directory:

```bash id="fe9d4n"
cd mock-api
```

Run JSON Server:

```bash id="wxazg8"
npx json-server --watch db.json --port 3000
```

Mock API will run at:

```bash id="lfx98f"
http://localhost:3000
```

---

## 3. Run Frontend Application

Open another terminal and move into the `frontend` directory:

```bash id="xih1o4"
cd frontend
```

Install dependencies:

```bash id="lnw8r1"
npm install
```

Run development server:

```bash id="hkkc3r"
npm run dev
```

---

## 4. Build Production

```bash id="c49jzj"
npm run build
```

---

# Notes

* This project focuses on frontend architecture, state management, reusable component design, and user experience.
* JSON Server is used to simulate backend API interaction.
* Receipt printing uses browser print window functionality.

