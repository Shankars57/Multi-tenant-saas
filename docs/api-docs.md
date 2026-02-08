Got it, Jnaneswari 👌 — here’s the **complete `docs/api-docs.md` file** with all 19 endpoints fully expanded, including request and response examples. You can copy‑paste this directly into your repo:

---

## 📄 File: `docs/api-docs.md`

```markdown
# API Documentation

All APIs return a consistent format:
```json
{
  "success": true,
  "message": "Description of result",
  "data": { ... }
}
```

---

## 🔐 Authentication Endpoints

### 1. Register Tenant
**POST** `/api/auth/register-tenant`

Registers a new tenant and admin user.

**Request:**
```json
{
  "tenantName": "Demo Company",
  "subdomain": "demo",
  "adminEmail": "admin@demo.com",
  "adminPassword": "Demo@123",
  "adminFullName": "Demo Admin"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Tenant registered successfully",
  "data": {
    "tenantId": "uuid",
    "subdomain": "demo",
    "adminUser": { "id": "uuid", "email": "admin@demo.com" },
    "role": "tenant_admin"
  }
}
```

**Error (409):**
```json
{ "success": false, "message": "Subdomain or email already exists" }
```

---

### 2. Login
**POST** `/api/auth/login`

Authenticates a user and returns JWT.

**Request:**
```json
{ "email": "admin@demo.com", "password": "Demo@123", "tenantSubdomain": "demo" }
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": { "id": "uuid", "role": "tenant_admin" },
    "token": "jwt-token",
    "expiresIn": 86400
  }
}
```

**Error (401):**
```json
{ "success": false, "message": "Invalid credentials" }
```

---

### 3. Get Current User
**GET** `/api/auth/me`

Requires JWT.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "admin@demo.com",
    "role": "tenant_admin",
    "tenant": { "id": "uuid", "name": "Demo Company" }
  }
}
```

---

### 4. Logout
**POST** `/api/auth/logout`

Invalidates session or JWT.

**Response (200):**
```json
{ "success": true, "message": "Logged out successfully" }
```

---

## 🏢 Tenant Management

### 5. Get Tenant Details
**GET** `/api/tenants/:id`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Demo Company",
    "subdomain": "demo",
    "status": "active",
    "subscriptionPlan": "pro",
    "maxUsers": 25,
    "maxProjects": 15,
    "stats": { "totalUsers": 5, "totalProjects": 2, "totalTasks": 10 }
  }
}
```

---

### 6. Update Tenant
**PUT** `/api/tenants/:id`

**Request:**
```json
{ "name": "Updated Company Name" }
```

**Response (200):**
```json
{ "success": true, "message": "Tenant updated successfully" }
```

---

### 7. List All Tenants
**GET** `/api/tenants` (super_admin only)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "tenants": [
      { "id": "uuid", "name": "Demo Company", "status": "active", "subscriptionPlan": "pro" }
    ],
    "pagination": { "currentPage": 1, "totalPages": 5 }
  }
}
```

---

## 👥 User Management

### 8. Add User
**POST** `/api/tenants/:id/users`

**Request:**
```json
{ "email": "newuser@demo.com", "password": "NewUser@123", "fullName": "New User", "role": "user" }
```

**Response (201):**
```json
{ "success": true, "message": "User created successfully", "data": { "id": "uuid", "email": "newuser@demo.com" } }
```

---

### 9. List Users
**GET** `/api/tenants/:id/users`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "users": [
      { "id": "uuid", "email": "admin@demo.com", "role": "tenant_admin" },
      { "id": "uuid", "email": "user1@demo.com", "role": "user" }
    ]
  }
}
```

---

### 10. Update User
**PUT** `/api/users/:id`

**Request:**
```json
{ "fullName": "Updated User Name", "isActive": true }
```

**Response (200):**
```json
{ "success": true, "message": "User updated successfully" }
```

---

### 11. Delete User
**DELETE** `/api/users/:id`

**Response (200):**
```json
{ "success": true, "message": "User deleted successfully" }
```

---

## 📂 Project Management

### 12. Create Project
**POST** `/api/projects`

**Request:**
```json
{ "name": "Website Redesign", "description": "Complete redesign of company site" }
```

**Response (201):**
```json
{ "success": true, "data": { "id": "uuid", "name": "Website Redesign", "status": "active" } }
```

---

### 13. List Projects
**GET** `/api/projects`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "projects": [
      { "id": "uuid", "name": "Website Redesign", "status": "active", "taskCount": 5 }
    ]
  }
}
```

---

### 14. Update Project
**PUT** `/api/projects/:id`

**Request:**
```json
{ "status": "archived" }
```

**Response (200):**
```json
{ "success": true, "message": "Project updated successfully" }
```

---

### 15. Delete Project
**DELETE** `/api/projects/:id`

**Response (200):**
```json
{ "success": true, "message": "Project deleted successfully" }
```

---

## ✅ Task Management

### 16. Create Task
**POST** `/api/projects/:id/tasks`

**Request:**
```json
{ "title": "Design homepage mockup", "priority": "high", "dueDate": "2024-07-15" }
```

**Response (201):**
```json
{ "success": true, "data": { "id": "uuid", "title": "Design homepage mockup", "status": "todo" } }
```

---

### 17. List Tasks
**GET** `/api/projects/:id/tasks`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "tasks": [
      { "id": "uuid", "title": "Design homepage mockup", "status": "todo" },
      { "id": "uuid", "title": "Implement login page", "status": "in_progress" }
    ]
  }
}
```

---

### 18. Update Task Status
**PATCH** `/api/tasks/:id/status`

**Request:**
```json
{ "status": "completed" }
```

**Response (200):**
```json
{ "success": true, "message": "Task status updated", "data": { "id": "uuid", "status": "completed" } }
```

---

### 19. Update Task Details
**PUT** `/api/tasks/:id`

**Request:**
```json
{ "title": "Updated Task Title", "priority": "medium" }
```

**Response (200):**
```json
{ "success": true, "message": "Task updated successfully" }
```

---

## 🩺 Health Check

### Health Endpoint
**GET** `/api/health`

**Response:**
```json
{ "system": "ok", "db": "connected" }
```
```



