# Code Challenge Project

# Tech stack

React: UI library
TypeScript: Type safety
Vite: Build tool
Tailwind CSS: Utility-first CSS framework
React Query: Server state management
Vitest: Testing framework
React Testing Library: Component testing

# Installation

git clone [repository-url]
cd harapa-fe-yang
pnpm install
OR
npm install / yarn install

# Development

npm run dev

# Testing

npm test

# Project Structure

harapa-fe-yang/
├── public/ # Static assets
├── src/
│ ├── apis/ # API integration and hooks
│ ├── assets/ # Compiled assets
│ ├── components/ # Reusable components
│ │ ├── common/ # Common UI components
│ │ ├── StudentGridCard/
│ │ ├── StudentsGriD/
│ │ └── StudentSideDrawer/
│ ├── interfaces/ # TypeScript interfaces
│ ├── lib/ # Utility libraries
│ ├── pages/ # Page components
│ ├── test/ # Test setup and utilities
│ ├── App.css # Global styles
│ ├── App.tsx # Main app component
│ ├── main.tsx # Entry point
│ └── vite-env.d.ts # Vite type declarations
├── .env # Environment variables
├── index.html # HTML template
├── package.json # Dependencies and scripts
├── tsconfig.json # TypeScript configuration
├── vite.config.ts # Vite configuration
└── vitest.config.ts # Vitest configuration
