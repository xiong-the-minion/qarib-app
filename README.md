# Qarib App - Transcript Management System

A modern React application for managing meeting transcripts with advanced features like real-time search, multi-language support, and interactive data visualization.

## 🚀 Project Overview

Qarib App is a comprehensive transcript management system built with modern web technologies. It provides an intuitive interface for viewing, searching, and managing meeting transcripts with features like:

- 📝 **Transcript Management** - View, search, and organize meeting transcripts
- 🔍 **Advanced Search** - Real-time local search across transcript content
- 🌍 **Multi-language Support** - Full Arabic and English translation support
- 📊 **Data Visualization** - Interactive tables with sorting and filtering
- ⭐ **Favorites System** - Mark and manage favorite transcripts
- 🏷️ **Tag Management** - Organize transcripts with custom tags
- 📱 **Responsive Design** - Works seamlessly on all device sizes

## 🛠️ Development Process

This project was developed using **Cursor AI** as the primary development environment, which significantly accelerated the development process:

- **Project Setup** - Initial project scaffolding and configuration
- **Library Integration** - Seamless integration of React Router, i18next, and other libraries
- **Translation Implementation** - Complete Arabic/English translation system setup
- **Component Development** - Rapid development of complex UI components
- **Code Optimization** - AI-assisted code refactoring and optimization

### Library Versioning Challenges

During development, we encountered several library versioning issues that were resolved with the help of **Claude AI**:

- **React Router v6** - Migration from older routing patterns
- **i18next Configuration** - Complex internationalization setup
- **TypeScript Integration** - Type definitions for SVG imports and custom components
- **Tailwind CSS** - Custom configuration for RTL support and complex layouts

## 🏗️ Architecture & Technologies

### Core Technologies
- ⚡ **Vite** - Lightning fast build tool and dev server
- ⚛️ **React 18** - Latest React with TypeScript support
- 🎨 **Tailwind CSS** - Utility-first CSS framework with RTL support
- 📦 **TypeScript** - Type-safe JavaScript development
- 🌍 **i18next** - Internationalization framework for multi-language support

### Key Libraries
- **React Router v6** - Client-side routing and navigation
- **React i18next** - Translation management and language switching
- **Context API** - State management for transcripts and user preferences
- **SVG as React Components** - Optimized icon system

### Features
- 🎯 TypeScript for type safety
- 🎨 Tailwind CSS with custom RTL support
- 🌍 Complete Arabic/English translation
- 🔍 Real-time search functionality
- ⚡ Optimized performance

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

## 📁 Project Structure

```
src/
├── components/                    # Reusable UI components
│   ├── Layout.tsx                # Main layout wrapper
│   ├── Sidebar.tsx               # Navigation sidebar
│   ├── BreadCrumbs.tsx           # Navigation breadcrumbs
│   ├── LanguageSwitcher.tsx      # Language toggle component
│   ├── TranscriptsTable.tsx      # Main transcripts table
│   └── transcript/               # Transcript-specific components
│       ├── TranscriptSection.tsx
│       ├── SummarySection.tsx
│       ├── ParticipantsSection.tsx
│       └── KeywordsSection.tsx
├── pages/                        # Page components
│   ├── TranscriptsPage.tsx       # Transcripts list page
│   └── TranscriptDetailPage.tsx  # Individual transcript view
├── contexts/                     # React Context providers
│   └── TranscriptContext.tsx     # Transcript data management
├── hooks/                        # Custom React hooks
├── utils/                        # Utility functions
│   ├── copyUtils.ts              # Clipboard functionality
│   └── transcriptUtils.ts        # Transcript data processing
├── i18n/                         # Internationalization
│   ├── index.ts                  # i18n configuration
│   └── locales/                  # Translation files
│       ├── en.json               # English translations
│       └── ar.json               # Arabic translations
├── types/                        # TypeScript type definitions
│   ├── transcript.ts             # Transcript data types
│   └── svg.d.ts                  # SVG import types
├── api/                          # API integration
│   ├── client.ts                 # HTTP client
│   ├── config.ts                 # API configuration
│   ├── types.ts                  # API type definitions
│   └── services/
│       └── transcriptService.ts  # Transcript API calls
├── App.tsx                       # Main App component
├── main.tsx                      # Application entry point
└── index.css                     # Global styles with Tailwind
```

## 🛠️ Technologies Used

### Frontend Framework
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Full type safety and IntelliSense support
- **Vite** - Lightning-fast build tool and development server

### Styling & UI
- **Tailwind CSS** - Utility-first CSS with custom RTL configuration
- **Custom Components** - Reusable, accessible UI components
- **SVG Icons** - Optimized SVG icons as React components

### State Management & Routing
- **React Context API** - Global state management for transcripts
- **React Router v6** - Modern client-side routing
- **Custom Hooks** - Reusable state logic

### Internationalization
- **i18next** - Professional internationalization framework
- **React i18next** - React integration for translations
- **RTL Support** - Complete right-to-left language support

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing and optimization
- **TypeScript** - Type checking and development experience

## 🤖 AI-Assisted Development

This project showcases the power of AI-assisted development using **Cursor** and **Claude**:

### Development Acceleration
- **Rapid Prototyping** - Quick iteration from concept to working features
- **Code Generation** - Efficient component and utility function creation
- **Bug Resolution** - Fast identification and fixing of issues
- **Refactoring** - Seamless code optimization and restructuring

### Translation Implementation
- **Complete i18n Setup** - Full internationalization framework configuration
- **Translation Management** - Systematic approach to multi-language support
- **RTL Support** - Proper right-to-left layout implementation
- **Context-Aware Translations** - Intelligent translation key organization

### Library Integration Challenges
- **Version Compatibility** - Resolved complex dependency conflicts
- **TypeScript Integration** - Custom type definitions for SVG imports
- **Router Migration** - Smooth transition to React Router v6
- **Configuration Optimization** - Tailwind CSS RTL and custom configurations

## 📋 Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build optimized production bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## 🎨 Tailwind CSS Configuration

This project uses Tailwind CSS with extensive custom configuration:

- **RTL Support** - Complete right-to-left layout support for Arabic
- **Custom Animations** - Smooth transitions and loading states
- **Responsive Design** - Mobile-first responsive utilities
- **Custom Color Palette** - Brand-specific color schemes
- **Component Variants** - Custom component styling patterns
- **SVG Integration** - Optimized SVG icon handling

## 📝 TypeScript Configuration

The project is fully configured with TypeScript for maximum type safety:

- **Strict Type Checking** - Comprehensive type validation
- **React JSX Support** - Full React component typing
- **Modern ES2022 Target** - Latest JavaScript features
- **Path Mapping** - Clean import paths
- **Custom Type Definitions** - SVG imports and component props
- **API Type Safety** - Complete API response typing
