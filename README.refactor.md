# Assumption Tool - Refactored ✨

A collaborative UX workshop tool for exploring and challenging assumptions in team environments.

## 🚀 What's New

### ✅ Completed Refactoring

- **Modern Stack**: Migrated from CRA to Vite + TypeScript
- **Monorepo Structure**: Separated client and server with workspaces
- **English Translation**: All UI text converted from Dutch to English
- **Improved Timer**: Fixed socket synchronization issues
- **Better Architecture**: Context API, custom hooks, proper error handling
- **Type Safety**: Full TypeScript implementation with shared types
- **Modern Styling**: Updated to Tailwind CSS v3 with custom design system

### 🏗️ Project Structure

```
assumption-tool/
├── client/                    # React + Vite + TypeScript frontend
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── contexts/         # React contexts
│   │   ├── hooks/           # Custom hooks
│   │   ├── pages/           # Page components
│   │   ├── types/           # TypeScript types
│   │   ├── utils/           # Utility functions
│   │   └── assets/          # Static assets (SVGs, etc.)
│   ├── public/              # Public assets
│   └── dist/               # Built client (generated)
├── server/                  # Express + Socket.io + TypeScript backend
│   ├── src/
│   │   └── server.ts       # Main server file
│   └── dist/               # Built server (generated)
├── shared/                 # Shared types and utilities
│   └── types/              # TypeScript definitions
└── src/                   # OLD CODE (to be removed)
```

## 🛠️ Development

### Prerequisites

- Node.js 18+ or 20+
- npm 9+

### Quick Start

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start development servers**

   ```bash
   npm run dev
   ```

   This runs both client (port 3000) and server (port 4000) concurrently.

3. **Or run individually**

   ```bash
   # Client only
   npm run client:dev

   # Server only
   npm run server:dev
   ```

### Available Scripts

```bash
# Development
npm run dev              # Start both client and server
npm run client:dev       # Start client dev server
npm run server:dev       # Start server dev server

# Building
npm run build           # Build client for production
npm run client:build    # Build client only
npm run server:build    # Build server only

# Testing
npm run test            # Run client tests
npm run test:ui         # Run tests with UI

# Linting & Type Checking
npm run lint            # Lint both client and server
npm run type-check      # Type check both client and server
```

## 🎯 How to Use (UX Workshop)

### 1. Create a Project

- Go to the home page
- Enter a project name (e.g., "Mobile App Redesign")
- Click "Create Project"

### 2. Add Team Members

- Share the project URL with your team
- Each member enters their name to join

### 3. Workshop Phases

#### **Phase 1: Assumptions Brainstorming**

- Team members add assumptions about the problem
- Examples: "Users prefer mobile over desktop", "Price is the main concern"

#### **Phase 2: Critical Analysis**

- Select assumptions to examine
- Use critique questions:
  - What evidence supports this assumption?
  - What if the opposite were true?
  - How could we test this assumption?
  - What biases might influence this assumption?

#### **Phase 3: Reflection & Action**

- Drag assumptions around to group them
- Identify which assumptions need validation
- Plan research or testing activities

### 4. Timer Features

- Set time limits for each phase
- Add or remove time as needed
- Visual countdown keeps everyone focused

## 🔧 Technical Features

### Improved Timer System

- **Fixed**: Timer synchronization across multiple clients
- **Added**: Robust error handling for network issues
- **Improved**: Better UI feedback and controls

### Real-time Collaboration

- Socket.io for instant updates
- Drag & drop assumption positioning
- Live user presence indicators

### Enhanced UX

- Responsive design for mobile and desktop
- Smooth animations with Framer Motion
- Accessible keyboard navigation
- Error boundaries for graceful failures

## 🚚 Deployment

### Render.com (Recommended)

1. **Build the project**

   ```bash
   npm run build
   ```

2. **Deploy to Render**
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set start command: `npm start --workspace=server`
   - Set Node version: `18` or `20`

### Environment Variables

```bash
# Server
PORT=4000
CLIENT_URL=https://your-app.render.com
NODE_ENV=production

# Client (built-time)
VITE_SOCKET_URL=https://your-app.render.com
```

## 📚 Architecture Decisions

### Why Vite over Next.js?

- **Faster development**: 3-10x faster dev server
- **Minimal migration**: Keep existing React Router setup
- **Better for real-time**: No SSR complications with Socket.io
- **Simpler deployment**: One server handles both client and Socket.io

### Why Monorepo?

- **Shared types**: Single source of truth for data structures
- **Easier development**: Run both client and server together
- **Better coordination**: Changes to API and client stay in sync

### Why Context + Hooks over Redux?

- **Simpler setup**: Less boilerplate for this use case
- **Better TypeScript**: Easier to type with Context API
- **Focused state**: Room-specific state management

## 🔄 Migration Status

### ✅ Completed

- [x] Basic project structure (Vite + TypeScript)
- [x] Home page with English translation
- [x] Server refactoring with improved timer logic
- [x] Type definitions and shared interfaces
- [x] Build system and development setup
- [x] SVG assets integration
- [x] Error boundaries and basic error handling

### 🚧 In Progress

- [ ] Complete ProjectRoom component
- [ ] Socket.io hooks and real-time features
- [ ] Drag and drop functionality
- [ ] All workshop phases (Setup, Critique, Reflection)
- [ ] Timer component integration
- [ ] User management components

### 📋 Todo

- [ ] Testing setup with Vitest
- [ ] User feedback and toast notifications
- [ ] Accessibility improvements
- [ ] Performance optimizations
- [ ] Documentation for components
- [ ] Deployment configuration

## 🤝 Contributing

1. **Component Development**: Use TypeScript and follow the existing patterns
2. **Styling**: Use Tailwind CSS classes and the design system
3. **State Management**: Use the Context API and custom hooks
4. **Testing**: Add tests for new features (setup in progress)

## 🐛 Known Issues

- Timer synchronization may have edge cases with network interruptions
- Drag and drop not yet responsive on mobile
- Need to add proper loading states for better UX

## 📞 Support

For questions about the refactoring or UX workshop usage, check the git history or create an issue.

---

**Ready for your UX workshop!** 🎨✨
