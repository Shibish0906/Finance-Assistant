Folder: app/dashboard/

Purpose:
Contains the dashboard routes and pages that make up the authenticated user area.

Contents:

- page.tsx - main dashboard page with summary cards and charts
- transactions/ - nested route for transaction list and management

Notes:

- This folder is protected by middleware; users are redirected to /sign-in if unauthenticated.
