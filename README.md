# Complete Coach Client App

Client-facing Complete Coach experience for athletes and coaching clients.

This app is intentionally separate from the coach/admin Complete Coach product.
It should only consume client-safe data through explicit API contracts once the
main app is ready to share production data.

## Current Status

- Vite + React + TypeScript client app
- Mobile-first client dashboard prototype
- Local mock data in `src/data.ts`
- Temporary local persistence through `localStorage`

## Local Development

```bash
npm install
npm run dev
```

## Scripts

```bash
npm run lint
npm run build
npm run preview
```

## Data Boundary

The main Complete Coach app remains the source of truth. This client app should
only receive data that clients are allowed to see, such as:

- assigned training programs
- active nutrition plans
- supplement protocols
- check-in forms and submissions
- client progress metrics
- client-facing notifications and messages

Do not connect this app directly to coach/admin-only data such as CRM records,
leads, revenue, team management, internal notes, or business analytics.

## Planned Integration Shape

Future integration should use narrow client-scoped APIs, for example:

```text
GET /api/client/me
GET /api/client/dashboard
GET /api/client/training/current
GET /api/client/nutrition/current
GET /api/client/check-ins
POST /api/client/check-ins
GET /api/client/supplements/current
```
