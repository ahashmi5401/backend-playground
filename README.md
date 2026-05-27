# Backend Playground 🚀

A learning-focused backend engineering repository for exploring modern server-side development concepts using TypeScript, Node.js, and related technologies.

This repository will evolve continuously as I learn, experiment, and build backend systems ranging from basic APIs to scalable production-style architectures.

---

## 📚 Learning Roadmap

| Topic | Status |
|---|---|
| NodeJS & TypeScript Core | 🟡 In Progress |
| ExpressJS | 🟡 In Progress |
| MongoDB (Mongoose) | 🔲 Planned |
| Security and Authentication (JWT/OAuth) | 🔲 Planned |
| Multer - Media Uploading | 🔲 Planned |
| PostgreSQL & TypeORM / Prisma | 🔲 Planned |
| NestJS Architecture | 🔲 Planned |
| Sockets / Real-time Communication | 🔲 Planned |
| GraphQL | 🔲 Planned |
| Payment Integration | 🔲 Planned |
| Scalable Systems - Caching (Redis) | 🔲 Planned |
| Scalable Systems - Messaging Queues | 🔲 Planned |
| NodeJS Optimization & Profiling | 🔲 Planned |
| Docker - Containerization | 🔲 Planned |
| CI / CD Pipelines | 🔲 Planned |
| Node Production & Cloud Deployment | 🔲 Planned |

---

## 📌 Status Legend

| Symbol | Meaning |
|---|---|
| 🟢 | Completed |
| 🟡 | In Progress |
| 🔲 | Planned |
| 🔴 | Needs Revision |

---

## 🎯 Repository Goals

- Learn backend engineering and TypeScript server-side fundamentals
- Transition from flexible REST frameworks (Express) to heavily structured enterprise architectures (NestJS)
- Master both NoSQL (MongoDB) and Relational (PostgreSQL) data design with type-safe ORMs
- Explore real-time, event-driven, and asynchronous messaging architectures
- Practice containerization, deployment, and performance optimization workflows

---

## 🛠️ Tech Stack (Planned)

- Node.js & TypeScript
- Express.js & NestJS
- MongoDB & PostgreSQL
- Prisma / TypeORM
- GraphQL & Socket.IO
- Redis (Caching) & RabbitMQ/Kafka (Message Queues)
- Passport.js / JWT Authentication
- Docker
- GitHub Actions (CI/CD)

---

## 📂 Project Structure

*Note: As this repository transitions into NestJS projects, the structure will evolve from a traditional MVC pattern to a modular architecture (`*.module.ts`, `*.controller.ts`, `*.service.ts`).*

```bash
src/
├── routes/          # Express routing (Phase 1)
├── controllers/     # Request handlers
├── models/          # Database schemas / Entities
├── middlewares/     # Auth, logging, error handling
├── modules/         # NestJS Feature Modules (Phase 2)
├── config/          # Environment variables and DB configs
└── app.ts           # Application entry point