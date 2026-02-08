-- Super Admin
INSERT INTO users (email, password_hash, full_name, role, tenant_id)
VALUES ('superadmin@system.com', '$2b$10$HASHEDPASSWORD', 'System Admin', 'super_admin', NULL);

-- Demo Tenant
INSERT INTO tenants (name, subdomain, status, subscription_plan, max_users, max_projects)
VALUES ('Demo Company', 'demo', 'active', 'pro', 25, 15);

-- Tenant Admin
INSERT INTO users (tenant_id, email, password_hash, full_name, role)
VALUES ((SELECT id FROM tenants WHERE subdomain='demo'),
        'admin@demo.com', '$2b$10$HASHEDPASSWORD', 'Demo Admin', 'tenant_admin');

-- Regular Users
INSERT INTO users (tenant_id, email, password_hash, full_name, role)
VALUES ((SELECT id FROM tenants WHERE subdomain='demo'),
        'user1@demo.com', '$2b$10$HASHEDPASSWORD', 'User One', 'user'),
       ((SELECT id FROM tenants WHERE subdomain='demo'),
        'user2@demo.com', '$2b$10$HASHEDPASSWORD', 'User Two', 'user');
