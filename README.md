# TrendyWear 🛍️

A modern, premium e-commerce web application with a clean, minimal aesthetic. Built with a scalable, production-ready architecture combining a fast Next.js frontend and a robust, containerized backend.

**Live Demo:** _coming soon_
**Repo:** [github.com/nikhilbishnoi007/trendywear](#)

---

## ✨ Overview

TrendyWear is a full-stack e-commerce platform focused on performance, scalability, and a premium shopping experience. The frontend delivers a fast, responsive, animation-rich UI with an original minimal aesthetic, while the backend is engineered around industry-standard scalability practices — caching, load balancing, and containerized deployment on the cloud.

---

## 🖥️ Frontend

| Tech | Purpose |
|------|---------|
| **Next.js 14 (App Router)** | Routing, SSR/SSG, optimized image handling |
| **TypeScript** | Type-safe components, interfaces for `Product`, `CartItem`, etc. |
| **Tailwind CSS** | Utility-first styling, minimal black/white/gray palette with accent color || **Framer Motion** | Hover animations, cart drawer slide transitions |
| **React Context / useState** | Client-side cart state management |

### Design Language
- Full-bleed hero imagery, generous whitespace
- Minimal sans-serif typography
- Subtle hover/zoom effects on product cards
- Fully responsive, mobile-first layout

### Key Frontend Features
- 🧭 Sticky navbar (transparent → solid on scroll)
- 🏠 Hero section with CTA
- 🧱 Responsive product grid with hover "Quick Add"
- 🔍 Product detail page with image gallery, size/color selectors
- 🛒 Slide-in cart drawer with subtotal & checkout CTA
- 💳 Checkout page (UI only — shipping form, order summary, payment method selection)
- 🗂️ Category/listing page with filters (price, size, color) and sort options
- 🦶 Footer with newsletter signup and link columns

---

## ⚙️ Backend

| Tech | Purpose |
|------|---------|
| **Express.js** | REST API server, business logic, routing |
| **MongoDB** | Primary database for products, users, orders |
| **Redis** | Caching layer for faster reads (sessions, product data, cart) |
| **API Gateway** | Single entry point routing requests to backend services |
| **Nginx** | Reverse proxy & load balancing for horizontal scalability |
| **Docker** | Full project (client + server) containerized for consistent dev/prod environments |
| **AWS** | Cloud hosting and infrastructure (EC2/ECS, S3, etc.) |

> Backend is under active development — architecture is designed to scale horizontally, with more advanced components (e.g. message queues, search indexing, CI/CD pipelines) planned as the project grows.

---

## 📁 Project Structure

```
trendywear/
├── client/
│   ├── app/                  # Next.js App Router pages
│   │   ├── page.tsx
│   │   ├── product/[id]/
│   │   ├── category/[slug]/
│   │   └── checkout/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── CartDrawer.tsx
│   │   └── Footer.tsx
│   ├── context/
│   │   └── CartContext.tsx
│   ├── data/
│   │   └── mockProducts.ts
│   ├── types/
│   │   └── index.ts
│   └── Dockerfile
├── server/
│   ├── src/
│   │   ├── routes/           # Express route handlers
│   │   ├── controllers/
│   │   ├── models/           # MongoDB (Mongoose) schemas
│   │   ├── middleware/
│   │   └── config/           # Redis, DB connection configs
│   └── Dockerfile
├── nginx/
│   └── nginx.conf             # Reverse proxy / API Gateway config
├── docker-compose.yml          # Orchestrates frontend + backend + Redis + Mongo + Nginx
└── README.md
```

---

## 🚀 Getting Started

Entire project (frontend + backend + Redis + MongoDB + Nginx) is fully containerized and runs with a single command.

### Prerequisites
- Docker & Docker Compose installed

### Run the Project
```bash
git clone https://github.com/nikhilbishnoi007/trendywear.git
cd trendywear
docker-compose up --build
```

This spins up:
- **Frontend** (Next.js) container
- **Backend** (Express.js) container
- **Redis** container
- **Nginx** container (reverse proxy / API Gateway routing)

Visit `http://localhost` (or the port configured in `docker-compose.yml`)

---

## 🗺️ Roadmap
- [ ] Connect frontend to live backend API
- [ ] Add authentication (JWT-based)
- [ ] Integrate payment gateway
- [ ] Add product search with Redis caching
- [ ] Set up CI/CD pipeline
- [ ] Deploy on AWS (ECS/EC2 + Nginx load balancer)

---

## 👤 Author

**Nikhil Bishnoi**
Full-Stack Developer | [Portfolio](https://updatedportfolio-iota.vercel.app) | [LinkedIn](https://linkedin.com/in/nikhilbishnoi92568) | [GitHub](https://github.com/nikhilbishnoi007)

---

## 📄 License
This project is licensed under the MIT License.