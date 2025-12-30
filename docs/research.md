
## 1. Multi-Tenancy Analysis

### Approach 1: Shared Database + Shared Schema
- **Pros:**
  - Cost-effective and easy to manage
  - Simple deployment and scaling
  - Single schema reduces overhead
- **Cons:**
  - Complex isolation logic required
  - Higher risk of accidental data leaks
  - Harder to enforce strict compliance

### Approach 2: Shared Database + Separate Schema
- **Pros:**
  - Better isolation compared to shared schema
  - Easier to enforce tenant-specific constraints
  - Moderate complexity in management
- **Cons:**
  - Schema proliferation with many tenants
  - More complex migrations and upgrades
  - Performance tuning harder across multiple schemas

### Approach 3: Separate Database per Tenant
- **Pros:**
  - Strongest isolation and security
  - Easier compliance with regulations
  - Independent scaling per tenant
- **Cons:**
  - Expensive in terms of resources
  - Difficult to maintain and upgrade
  - Complex orchestration for many tenants

### Chosen Approach
We will use **Shared Database + Shared Schema with tenant_id column**.  
This balances scalability, cost, and isolation. Each record will be tagged with `tenant_id`, ensuring strict separation of data while keeping infrastructure manageable.

---

## 2. Technology Stack Justification

### Backend Framework
- **Chosen:** Node.js with Express
- **Reason:** Lightweight, fast, large ecosystem, easy REST API development
- **Alternatives Considered:** Django (Python), Spring Boot (Java)

### Frontend Framework
- **Chosen:** React
- **Reason:** Component-based, responsive UI, strong community support
- **Alternatives Considered:** Angular, Vue.js

### Database
- **Chosen:** PostgreSQL
- **Reason:** Robust relational DB, supports constraints, indexes, transactions
- **Alternatives Considered:** MySQL, MongoDB

### Authentication Method
- **Chosen:** JWT (JSON Web Tokens)
- **Reason:** Stateless, scalable, widely adopted
- **Alternatives Considered:** Session-based authentication

### Deployment Platform
- **Chosen:** Docker + Docker Compose
- **Reason:** Portable, reproducible environments, one-command deployment
- **Alternatives Considered:** Manual VM setup, Kubernetes (future scaling)

---

## 3. Security Considerations

1. **Data Isolation Strategy**
   - Every record tagged with `tenant_id`
   - Super Admin users have `tenant_id = NULL`
   - Strict API-level checks to prevent cross-tenant access

2. **Authentication & Authorization**
   - JWT-based authentication with 24-hour expiry
   - Role-based access control (Super Admin, Tenant Admin, User)
   - Protected routes enforced at API level

3. **Password Hashing**
   - Use bcrypt or argon2 for secure password storage
   - Enforce strong password policies

4. **API Security Measures**
   - Input validation and sanitization
   - Rate limiting to prevent abuse
   - CORS configuration to allow only frontend domain
   - HTTPS for secure communication

5. **Audit Logging**
   - All critical actions logged in `audit_logs` table
   - Includes user, tenant, action type, timestamp, and IP address
