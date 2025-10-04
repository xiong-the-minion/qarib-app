# React + TypeScript + Vite + Tailwind CSS

A modern React application built with the latest technologies:

- ⚡ **Vite** - Lightning fast build tool and dev server
- ⚛️ **React 18** - Latest React with TypeScript support
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 📦 **TypeScript** - Type-safe JavaScript

## Features

- 🚀 Hot Module Replacement (HMR)
- 🎯 TypeScript for type safety
- 🎨 Tailwind CSS for styling
- 📱 Responsive design
- 🌙 Dark mode support
- ⚡ Fast development server

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### Build

Build the project for production:

```bash
npm run build
```

### Preview

Preview the production build:

```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable components
│   └── FeatureCard.tsx
├── assets/             # Static assets
├── App.tsx            # Main App component
├── main.tsx           # Application entry point
└── index.css          # Global styles with Tailwind
```

## Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint** - Code linting
- **PostCSS** - CSS processing

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Tailwind CSS

This project uses Tailwind CSS for styling. The configuration is in `tailwind.config.js` and includes:

- Custom animations (e.g., `animate-spin-slow`)
- Responsive design utilities
- Dark mode support
- Custom color schemes

## TypeScript

The project is fully configured with TypeScript for type safety. Key features:

- Strict type checking enabled
- React JSX support
- Modern ES2022 target
- Path mapping support

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request