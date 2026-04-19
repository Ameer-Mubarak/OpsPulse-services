# OpsPulse — Enterprise Workflow Intelligence SaaS

OpsPulse is a production-intent B2B SaaS concept focused on reducing incident-resolution time, preventing SLA penalties, and improving renewal retention for post-sales operations teams.

## Why this product
- **Pain point**: Ops and support leaders lose revenue due to SLA breaches, reactive escalations, and poor visibility into renewal risk.
- **ROI path**: automated playbooks, risk scoring, and billing insights drive measurable time savings and retained ARR.
- **Monetization**: recurring subscription tiers (Scale/Enterprise), seat expansion, and usage-based overage services.

## Product phases
- **Phase 1**: secure command center for auth, KPIs, and billing orchestration.
- **Phase 2**: workflow orchestration layer with runbook triggers, health scoring, and role-based execution controls.
- **Phase 3**: revenue risk alerting + auditable action tracking for compliance and incident accountability.

## Frontend architecture
```
src/
  app/                 # Routing and app shell composition
  components/
    icons/             # Inline SVG icon + logo system
    layout/            # Sidebar shell
    ui/                # Button, Input, Loading states
  features/
    auth/
    dashboard/
    workflows/
    alerts/            # Phase 3 risk alert center
    billing/
    admin/
  hooks/               # Workflow + alerts data hooks
  lib/                 # API service and interceptors
  styles/              # Design tokens + responsive system
```

## Security layer implemented
- JWT access-token authentication (`/api/auth/login`, `/api/auth/me`)
- CSRF token issuance + verification (`/api/auth/csrf`, `x-csrf-token`)
- Route-level RBAC middleware (`allowRoles`)
- Zod input validation per endpoint
- Rate limiting globally with 15-min windows
- Helmet headers with CSP
- CORS allowlist and credential handling
- Structured env validation via Zod
- Audit trail endpoint for privileged roles (`/api/security/audit`)

## Backend production design
- `server/src/modules/*` route modules organized by domain.
- `server/prisma/schema.prisma` models for users, orgs, sessions, and subscriptions.
- Billing endpoint scaffold designed for Stripe Checkout integration.
- Workflow orchestration endpoints for operational runbook execution.
- Alert management endpoints with acknowledgment audit logging.

## Run
```bash
npm install
npm run dev           # frontend
npm run server:dev    # backend
```

Set environment:
```
JWT_SECRET=<minimum 32 char secret>
CORS_ORIGIN=http://localhost:5173
PORT=4000
DATABASE_URL=postgresql://...
```
