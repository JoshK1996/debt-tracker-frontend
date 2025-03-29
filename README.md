# Debt Tracker Frontend

A modern glassmorphism-themed frontend for the Debt Tracking Admin Panel, featuring 3D elements and a professional design.

## Features

- Multi-tenant debt tracking system
- Role-based access control (SuperAdmin, CompanyAdmin, CompanyStaff)
- Debtor management
- Debt tracking with status visualization
- Payment recording and tracking
- Interactive dashboards with 3D elements
- Analytical reports and data visualization
- Notification center
- Modern glassmorphism UI design

## Tech Stack

- Next.js 14 (React framework)
- TypeScript
- TailwindCSS for styling
- Material UI components with custom theme
- Framer Motion for animations
- React Query for data fetching
- React Hook Form for form handling
- Spline for 3D elements
- ApexCharts for data visualization
- NextAuth.js for authentication

## Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
```

## License

MIT