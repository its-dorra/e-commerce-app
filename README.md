# Fashion Haven 🛍️

A modern, high-performance luxury e-commerce platform built with **Next.js 16 (App Router)**, **React 19**, **Drizzle ORM**, and **PostgreSQL**. The platform features end-to-end type safety, optimistic UI updates, on-demand cache revalidation with Next.js Cache Components, and role-based access control.

---

## ✨ Features

### 👤 Customer Experience

- **Catalog & Discovery**: Browse curated collections, filter by category, available sizes, and color palettes with dynamic sorting (price, popularity, title).
- **Product Details**: Immersive image gallery swiper, real-time inventory checks by size and color variant, and size guides.
- **Optimistic Shopping Cart**: Instant cart updates with slide-over bag and dedicated cart page powered by React 19 `useOptimistic` and `useTransition`.
- **Wishlist Management**: Real-time optimistic wishlist toggling on product detail pages and dedicated wishlist view.
- **Checkout & Order Flow**: Streamlined checkout with delivery address management, order placement, and confirmed order receipt.
- **Account Hub**: Comprehensive self-service portal to manage profile details, view order history with status tracking, and manage saved shipping addresses.

### 🛡️ Store Administration

- **Order Fulfillment**: Track incoming orders, review items and shipping destinations, accept orders (automatically updating inventory), or cancel orders (restoring stock).
- **Inventory Management**: Inventory tracking per size and color variant with automatic availability validation.
- **Catalog Management**: Add new products, configure color variants, upload images to Cloudinary, and adjust sizing prices.
- **Analytics**: Visual sales metrics and performance charts powered by Recharts.

---

## 🚀 Tech Stack

### Frontend & Core

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack, Cache Components & Partial Prerendering)
- **Library**: [React 19](https://react.dev/) (with React Compiler)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with `tailwindcss-animate`
- **Component Primitives**: [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Carousels**: [Embla Carousel](https://www.embla-carousel.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)
- **UI State**: [Zustand](https://zustand-demo.pmnd.rs/) (for client navigation state)

### Backend, Database & APIs

- **Database**: [PostgreSQL](https://www.postgresql.org/) (via `pg` pool)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/) with [Drizzle Kit](https://orm.drizzle.team/kit-docs/overview) for migrations
- **Server Actions**: Type-safe Server Actions with [`next-safe-action`](https://next-safe-action.dev/)
- **Data Caching & Invalidation**: Next.js Cache Components (`"use cache"`, `cacheTag`, `updateTag`)
- **Media Storage**: [Cloudinary](https://cloudinary.com/) (image uploads and optimization)

### Authentication & Validation

- **Authentication**: [Better Auth](https://www.better-auth.com/) with PostgreSQL Drizzle adapter
  - Email & Password authentication
  - Google OAuth social login
  - Role-based authorization (`user` & `admin`)
- **Forms**: [TanStack React Form](https://tanstack.com/form)
- **Validation**: [Zod](https://zod.dev/) & `zod-form-data`
- **Environment**: Type-safe schema validation via [`@t3-oss/env-nextjs`](https://env.t3.gg/)

---

## 🏗️ Architecture & Data Caching

```
┌─────────────────────────────────────────────────────────────┐
│                    Next.js 16 App Router                    │
│                                                             │
│   RSC Server Components            Client Components        │
│   ("use cache" + cacheTag)     (useOptimistic + transition) │
└──────────────┬───────────────────────────────┬──────────────┘
               │                               │
               ▼                               ▼
┌──────────────────────────────┐ ┌─────────────────────────────┐
│   Data Access Layer (DAL)    │ │ Server Actions              │
│   - PostgreSQL Queries       │ │ (next-safe-action)          │
│   - Granular Cache Tags      │ │ - Calls updateTag(tag)      │
│   - Inventory Transactions   │ │ - Immediate Read-Your-Writes│
└──────────────┬───────────────┘ └─────────────┬───────────────┘
               │                               │
               └───────────────┬───────────────┘
                               ▼
               ┌───────────────────────────────┐
               │    PostgreSQL Database (pg)   │
               │    Managed with Drizzle ORM   │
               └───────────────────────────────┘
```

- **Read-Your-Own-Writes**: Mutations executed via Server Actions trigger `updateTag(...)` on surgical cache tags (`user:${userId}:carts`, `id:${productId}:products`, `user:${userId}:orders`), instantly invalidating both the server data cache and the browser's router cache.
- **Optimistic Interactions**: Interactive features (cart quantity adjustments, item removals, wishlist toggles) update the interface instantaneously using React 19 `useOptimistic` within `startTransition`, reconciling automatically once the server action completes.
- **Partial Prerendering (PPR)**: Dynamic segments (authentication guards, user-specific carts, wishlist states) stream through `<Suspense>` boundaries while the static layout shell renders instantly.

---

## 📁 Project Structure

```
├── app/
│   ├── (auth)/                 # Authentication routes (login, sign-up)
│   ├── (user)/                 # Customer-facing routes (shop, cart, checkout, account)
│   │   ├── account/            # Account hub (orders, addresses, wishlist, profile)
│   │   ├── cart/               # Full cart view
│   │   ├── checkout/           # Checkout flow
│   │   ├── orders/             # Order confirmation & success
│   │   └── products/           # Catalog & product detail pages
│   ├── admin/                  # Admin dashboard & management routes
│   └── api/                    # API route handlers (Better Auth, webhooks)
├── lib/
│   ├── components/             # Shared UI components & skeletons
│   ├── features/               # Feature-based domain modules
│   │   ├── cart/               # Cart components, types, and logic
│   │   ├── orders/             # Order cards and listings
│   │   ├── products/           # Product filters, cards, swipers, and details
│   │   ├── user/               # Profile and address forms, sidebars
│   │   └── wishlist/           # Wishlist containers and item cards
│   └── providers/              # React context providers
├── server/
│   ├── actions/                # Type-safe Server Actions (cart, orders, wishlist, address)
│   ├── data-access/            # Data Access Layer & cache utilities
│   ├── db/                     # Drizzle schema definitions, relations, and seeds
│   └── auth.ts                 # Better Auth server configuration
└── next.config.ts              # Next.js configuration (PPR, staleTimes, compiler)
```

---

## 🛠️ Getting Started

### Prerequisites

- **Node.js** (v20 or later) or **Bun**
- **PostgreSQL** instance running locally or hosted (e.g. Neon, Supabase, Railway)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/e-commerce-app.git
cd e-commerce-app
```

### 2. Install dependencies

```bash
npm install
# or
bun install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/fashion_haven"

# Application
BASE_URL="http://localhost:3000"

# Better Auth
BETTER_AUTH_SECRET="your-secure-random-secret"
BETTER_AUTH_URL="http://localhost:3000"

# Google OAuth (Optional for social login)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Cloudinary (For image uploads)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

### 4. Database Setup & Migrations

```bash
# Generate migrations
npm run db:generate

# Apply migrations to PostgreSQL
npm run db:migrate

# (Optional) Seed initial products and categories
npm run db:seed
```

### 5. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

| Command               | Description                                           |
| :-------------------- | :---------------------------------------------------- |
| `npm run dev`         | Runs the Next.js development server with Turbopack    |
| `npm run build`       | Compiles the production build                         |
| `npm run start`       | Starts the production server                          |
| `npm run lint`        | Runs ESLint checks                                    |
| `npm run db:generate` | Generates Drizzle migration files from schemas        |
| `npm run db:migrate`  | Applies pending migrations to the PostgreSQL database |
| `npm run db:studio`   | Opens Drizzle Studio GUI for database inspection      |
| `npm run db:seed`     | Seeds the database with demo products and categories  |

---

## 📄 License

This project is licensed under the MIT License.
