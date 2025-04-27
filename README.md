🛠️ Handyman App — Monorepo
A full-stack handyman marketplace app built with NestJS, PostgreSQL, Expo (React Native + Web), and Docker.

📁 Project Structure
handyman-app/
├── apps/
│   ├── frontend/             # Expo app (mobile + web)
├── services/
│   ├── auth/                 # Authentication service (NestJS + Prisma)
│   ├── user/                 # User management service
│   ├── booking/              # Booking service
│   ├── chat/                 # Chat service
│   ├── review/               # Reviews and ratings service
│   ├── payment/              # Payments and billing service
│   └── notification/         # Push/email notification service
├── shared/                   # Shared types, interfaces, utilities
├── docker-compose.yml        # Docker setup for local development
└── README.md

🚀 Tech Stack
Frontend: Expo (React Native for mobile + web)

Backend: NestJS (TypeScript)

Database: PostgreSQL

ORM: Prisma

Authentication: JWT

DevOps: Docker, Docker Compose

🐳 Running Locally
Prerequisites
Docker

Node.js

Yarn or npm

Step 1 — Start the backend services

docker-compose up --build
This will spin up:

PostgreSQL database

Auth service (NestJS)

📌 More microservices like user, booking, etc. will be added as development progresses.

Step 2 — Start the frontend app
Navigate into the frontend app:

cd apps/frontend
yarn install
yarn start
or with Expo CLI:

npx expo start
You can run it:

In the browser

On an iOS/Android simulator

On your physical device with the Expo Go app

📦 Planned Features
User authentication (login/signup with JWT)

Service booking system

In-app chat between users and service providers

Ratings and reviews

Payment integration

Push and email notifications

Admin dashboard (later)

🏗️ Future Improvements
CI/CD pipelines

Production-ready Docker deployment

Real-time notifications with WebSockets

Microservices event-driven communication (NATS / Kafka)

🤝 Contributing
Coming soon!
For now, feel free to fork and explore

