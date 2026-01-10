# Computer Repair Shop Management System

Full-stack repair shop management application built with **Next.js 15** featuring type-safe **Server Actions**, real-time form validation, and role-based access control.

## Tech Stack

### Core Framework

- **Next.js 15.5.9** - App Router, React Server Components, Server Actions
- **React 19.2.3** - Latest React with enhanced server component support
- **TypeScript 5** - Full type safety across client and server

### Key Libraries

#### Server-Side

- **next-safe-action 8.0.11** - Type-safe server actions with validation and error handling
- **Drizzle ORM 0.45.1** - TypeScript ORM for PostgreSQL
- **@neondatabase/serverless 1.0.2** - Serverless PostgreSQL driver
- **Zod 4.3.5** - Runtime schema validation for forms and server actions
- **@kinde-oss/kinde-auth-nextjs 2.11.0** - Authentication with OAuth

#### Client-Side

- **React Hook Form 7.70.0** - Performant form state management
- **@hookform/resolvers 5.2.2** - Zod schema resolver for forms
- **Sonner 2.0.7** - Toast notifications
- **Radix UI** - Accessible headless UI components
- **next-themes 0.4.6** - Dark/light theme system
- **Lucide React 0.562.0** - Icon library

#### Styling

- **TailwindCSS 4** - Utility-first CSS framework
- **class-variance-authority 0.7.1** - Component variant system
- **tailwind-merge 3.4.0** - Merge Tailwind classes without conflicts

#### DevOps

- **@sentry/nextjs 10** - Error tracking and performance monitoring
- **drizzle-kit 0.31.8** - Database migrations and schema management

## Features

### Customer Management

- CRUD operations for customer records
- Contact information (email, phone, address)
- Customer notes and status (active/inactive)
- Manager-only customer deactivation

### Ticket Management

- Create/edit repair tickets linked to customers
- Track completion status and technician assignment
- View customer context within ticket forms
- Manager-only tech assignment capability

### Authentication & Authorization

- OAuth authentication via Kinde
- Role-based access control (manager/technician)
- Protected routes with middleware
- Session management

## Database Schema

PostgreSQL with Drizzle ORM

### Customers Table

- `id`, `firstName`, `lastName`
- `email`, `phone` (unique)
- `address1`, `address2`, `city`, `state`, `zip`
- `notes`, `active`
- `createdAt`, `updatedAt`

### Tickets Table

- `id`, `customerId` (FK → customers)
- `title`, `description`
- `completed`, `tech`
- `createdAt`, `updatedAt`

## Setup

### Prerequisites

- Node.js 20+
- pnpm 10+
- PostgreSQL (Neon serverless)

### Installation

```bash
# Install dependencies
pnpm install

# Configure environment variables
cp .env.example .env.local
# Add DATABASE_URL and Kinde credentials

# Run database migrations
pnpm db:generate
pnpm db:migrate

# Start development server
pnpm dev
```
