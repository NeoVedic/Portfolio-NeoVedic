# NeoVedic - Premium IT Solutions Company Website

## Overview
A fashionable, premium company website for NeoVedic, offering IT solutions in Web Development, DevOps, Cloud Infrastructure, and Digital Marketing. The design is inspired by modern tech companies like DianApps, featuring bold gradients, smooth animations, and professional typography.

## Project Structure

### Frontend (React + TypeScript + Tailwind)
- **Home Page** (`/`): Hero section with animations, services overview, stats, about section, and contact form
- **Service Pages**:
  - Web Development (`/services/web-development`)
  - DevOps (`/services/devops`)
  - Cloud Infrastructure (`/services/cloud`)
  - Digital Marketing (`/services/marketing`)
- **Additional Pages**:
  - FAQ (`/faq`) - Frequently asked questions with accordion UI
  - Team (`/team`) - Leadership team showcase
  - Blog (`/blog`) - Blog listing page with all blog posts
  - Blog Detail (`/blog/:slug`) - Individual blog post page
  - Career (`/career`) - Job listings and application form
  - Contact (`/contact`) - Contact form
  - Services (`/services`) - Services overview
  - Clients (`/clients`) - Client showcase
  - Hire Resources (`/hire-resources`) - Resource augmentation

### Key Components
- `Navigation.tsx` - Sticky header with blur backdrop, responsive mobile menu
- `HeroSection.tsx` - Full-screen hero with gradient animations and stats
- `ServicesSection.tsx` - Service cards with hover effects
- `AboutSection.tsx` - Company values and technology stack
- `ContactSection.tsx` - Contact form with validation
- `Footer.tsx` - Multi-column footer with social links

### Backend (Express + TypeScript + MongoDB)
- **Full MongoDB Integration**: Complete CRUD operations for all entities
- **Admin Panel API Routes**: All admin endpoints for portfolios, team, services, blogs, leads, job applications
- **Authentication**: JWT-based admin authentication with bcrypt password hashing
- **Data Storage**: MongoDB with Mongoose models for all entities (portfolios, team members, services, blogs, contacts, job applications, admin users, activity logs)
- **Zod Validation**: Form data validation using Zod schemas
- **File Handling**: Resume uploads (base64 encoded, max 10MB, PDF/DOC/DOCX)
- **Dual Storage Mode**: Automatic fallback to in-memory storage if MongoDB is not configured
- **Express Configuration**: Body size limit increased to 10MB for file uploads

## Design System

### Colors
- Primary: Purple-blue gradient (260° hue)
- Secondary gradients for services:
  - Web Dev: Blue to Cyan
  - DevOps: Purple to Pink
  - Cloud: Emerald to Teal
  - Marketing: Orange to Red

### Typography
- Font Family: Inter (sans-serif), Space Grotesk (mono/accents)
- Scale: text-5xl to text-8xl for headlines

### Key Features
- Smooth scroll behavior
- Gradient text effects using background-clip
- Hover elevation system from index.css
- Responsive grid layouts
- Mobile-first design

## Technology Stack

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Wouter (routing)
- React Hook Form + Zod (forms)
- Shadcn UI components

### Backend
- Express.js
- TypeScript
- MongoDB with Mongoose (all data storage)
- Dual storage system: MongoDB (production) + MemStorage (fallback)
- JWT authentication
- Bcrypt password hashing
- Activity logging system

## Development

### Running the Application
```bash
npm run dev
```
Starts both frontend (Vite) and backend (Express) on the same port.

### Key Routes

**Public Website:**
- `/` - Home page
- `/faq` - FAQ page
- `/team` - Team page (leadership)
- `/portfolio` - Portfolio showcase
- `/blog` - Blog listing page
- `/blog/:slug` - Individual blog post page
- `/career` - Career opportunities and job application
- `/services` - Services overview
- `/services/web-development` - Web Development service page
- `/services/devops` - DevOps service page
- `/services/cloud` - Cloud Infrastructure service page
- `/services/marketing` - Digital Marketing service page
- `/contact` - Contact page
- `/clients` - Clients showcase
- `/hire-resources` - Resource augmentation

**Admin Panel:**
- `/admin/login` - Admin authentication
- `/admin/dashboard` - Admin overview with statistics
- `/admin/leads` - Contact form submissions
- `/admin/job-applications` - Career application submissions
- `/admin/portfolio` - Manage portfolio projects
- `/admin/team` - Manage team members
- `/admin/services` - Manage services
- `/admin/blogs` - Manage blog posts

## Recent Changes
- **2025-10-28**: Complete MongoDB Storage Implementation & Admin Panel Integration
  - **Full MongoStorage Implementation**: Implemented all CRUD methods for all entities
  - **New Mongoose Models**: Created models for AdminUser, Portfolio, TeamMember, Service, ActivityLog (Blog and ContactSubmission already existed)
  - **Admin User Management**: Implemented authentication with bcrypt password hashing, default admin user seeding (admin@neovedic.com / admin123)
  - **Portfolio Management**: Full CRUD operations with visibility toggle
  - **Team Management**: CRUD operations with order management
  - **Service Management**: CRUD operations with features array and order management
  - **Blog Management**: CRUD operations with publish/unpublish functionality, slug-based retrieval
  - **Activity Logging**: Complete activity log system for audit trail
  - **Dashboard Stats**: Aggregated statistics using MongoDB countDocuments
  - **Null Safety**: Proper undefined-to-null conversion for all optional fields to match TypeScript contracts
  - **Data Synchronization**: Admin panel now displays all existing MongoDB data (portfolios, team members, services, blogs)
  - **Job Applications Admin Page**: Created admin interface for viewing and managing career applications with CSV export
  
- **2025-10-22**: PostgreSQL to MongoDB Migration
  - Completely migrated from PostgreSQL/Drizzle to MongoDB/Mongoose
  - Converted shared schema from Drizzle to plain Zod validation schemas
  - Removed all PostgreSQL dependencies (@neondatabase/serverless, drizzle-kit, drizzle-orm, drizzle-zod, connect-pg-simple)
  - Deleted drizzle.config.ts and db:push script
  - MongoDB now handles all persistent storage (contact forms, job applications, blog posts)
  - Successfully tested MongoDB connection and data persistence
  - Application automatically falls back to in-memory storage if MongoDB is unavailable

- **2025-10-15**: Blog Section & Bug Fixes
  - Implemented complete blog section with MongoDB integration
  - Created Blog listing page (`/blog`) displaying all blog posts in grid layout
  - Created Blog detail page (`/blog/:slug`) for individual blog posts
  - Added Blog link to navigation menu
  - Fixed "Apply Now" button functionality on Career page
  - Fixed PayloadTooLargeError by increasing Express body size limit to 10MB
  - Enhanced resume file upload handling (now supports up to 10MB files)

- **2025-10-15**: MongoDB Integration & New Pages
  - Added FAQ page with accordion UI and comprehensive Q&A
  - Created Team page showcasing leadership (Manish Sharma - CEO, Himanshu Bhargava - CTO, Prerak Khunteta - CMO)
  - Integrated MongoDB for persistent storage of career applications
  - Set up Mongoose models and connection with secure secret management
  - Enhanced error handling for API routes (proper 400/500 status codes)
  - Career application form now saves to MongoDB with resume file support

- **2025-10-12**: Transformed to multi-page architecture with dashboard hero design
  - Created dedicated pages: Services, Contact, Career, Clients, Hire Resources
  - Redesigned hero section with animated 3D ball (floating up/down animation)
  - Updated to split-layout dashboard format inspired by DianApps
  - Implemented "AI-First Digital Partner" messaging
  - Enhanced navigation with dropdown and mobile menu
  - Created all service detail pages with comprehensive content
  - Implemented contact form with backend integration
  - Designed premium UI with gradients and animations
  - Set up proper SEO metadata

## User Preferences
- Fashionable, modern design inspired by DianApps
- Bold gradients and animations
- Professional typography
- Comprehensive service pages with detailed information
- Premium aesthetic with glassmorphism effects
