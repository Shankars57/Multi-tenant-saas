# Technical Specification

## 1. Project Structure

### Backend
```
backend/
  src/
    controllers/      # Handle incoming requests and responses
    models/           # Database models and schema definitions
    routes/           # API route definitions
    middleware/       # Authentication, authorization, logging
    utils/            # Helper functions (validation, formatting)
    config/           # Configuration files (env, DB connection)
  migrations/         # SQL migration files
  seeds/              # Seed data scripts
  tests/              # Unit and integration tests
```

### Frontend
```
frontend/
  src/
    components/       # Reusable UI components
    pages/            # Main application pages (Login, Dashboard, Projects, Users)
    services/         # API service calls
    utils/            # Helper functions (formatting, validation)
```

### Database
```
database/
  migrations/         # SQL migration files for schema setup
  seeds/              # SQL seed data for initial setup
```

### Documentation
```
docs/
  research.md         # Multi-tenancy analysis, stack justification, security considerations
  PRD.md              # Product Requirements Document
  architecture.md     # System architecture, ERD, API list
  technical-spec.md   # Technical specification and setup guide
  images/             # Diagrams and ERD images
```

---

## 2. Development Setup Guide

### Prerequisites
- Node.js v18+  
- PostgreSQL 14+  
- Docker & Docker Compose  
- Git

### Environment Variables
Required variables (stored in `.env` or `docker-compose.yml`):
- `DB_HOST`  
- `DB_PORT`  
- `DB_USER`  
- `DB_PASSWORD`  
- `DB_NAME`  
- `JWT_SECRET`  
- `PORT` (backend service port)

### Installation Steps
```bash
# Clone the repository
git clone https://github.com/Jnaneswari19/multi-tenant-saas-platform.git
cd multi-tenant-saas-platform

# Backend setup
cd backend
npm install

# Frontend setup
cd ../frontend
npm install
```

### Running Locally
```bash
# Start all services with Docker
docker-compose up -d
```

### Running Tests
```bash
cd backend
npm test
```

---


