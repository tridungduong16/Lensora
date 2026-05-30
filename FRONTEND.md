# Frontend Architecture

## Project Type

Eyewear E-Commerce Storefront

A modern online store for eyeglasses, sunglasses, and accessories focused on premium shopping experience, SEO, and mobile-first design.

---

# Tech Stack

## Framework

* Next.js 15
* React 19
* TypeScript

## Styling

* TailwindCSS

## Components

* shadcn/ui
* Radix UI
* Lucide Icons

## State Management

* Zustand
* TanStack Query

## Forms

* React Hook Form
* Zod

## Animation

* Framer Motion

## Analytics

* PostHog
* Google Analytics

---

# Folder Structure

```text
src/

├── app/
│
├── components/
│   ├── ui/
│   ├── layout/
│   ├── product/
│   ├── cart/
│   └── marketing/
│
├── services/
│
├── stores/
│
├── hooks/
│
├── lib/
│
├── types/
│
└── styles/
```

---

# Pages

```text
/

├── Home
├── Shop
├── Eyeglasses
├── Sunglasses
├── Collections
├── Product Detail
├── Cart
├── Checkout
├── Account
├── Orders
├── About
├── Contact
└── FAQ
```

---

# Product Components

```text
components/product/

├── product-card.tsx
├── product-grid.tsx
├── product-gallery.tsx
├── product-info.tsx
├── product-price.tsx
├── product-review.tsx
├── related-products.tsx
└── product-filter.tsx
```

---

# Cart Components

```text
components/cart/

├── cart-item.tsx
├── cart-summary.tsx
├── checkout-form.tsx
└── order-summary.tsx
```

---

# Marketing Components

```text
components/marketing/

├── hero.tsx
├── featured-products.tsx
├── collections.tsx
├── testimonials.tsx
├── newsletter.tsx
└── faq.tsx
```

---

# Services

```text
services/

├── products.service.ts
├── cart.service.ts
├── checkout.service.ts
├── customer.service.ts
└── search.service.ts
```

---

# Global Stores

```text
stores/

├── cart.store.ts
├── wishlist.store.ts
├── user.store.ts
└── ui.store.ts
```

---

# Key Features

* Product Catalog
* Product Search
* Product Filters
* Wishlist
* Shopping Cart
* Checkout
* Customer Accounts
* Order Tracking
* Reviews & Ratings
* Mobile Responsive
* SEO Optimized

---

# Future Features

* Virtual Try-On
* Face Shape Analysis
* AI Product Recommendation
* Prescription Upload
* Loyalty Program
* Gift Cards
* Mobile App

```
```
