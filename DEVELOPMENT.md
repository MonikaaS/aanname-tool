# Development Guide - Assumption Tool Refactoring

## 🎯 Current Status

✅ **Foundation Complete** - The basic refactoring is done and working!

- Modern Vite + TypeScript + React 18 setup
- Monorepo structure with client/server separation
- Home page translated to English and functional
- Improved server with better timer logic
- Build system working for both client and server

## 🚀 Next Steps (Priority Order)

### 1. Core Socket.io Integration (High Priority)

**Files to create/update:**

- `client/src/hooks/useSocket.ts` - Socket connection management
- `client/src/hooks/useUsers.ts` - User management
- `client/src/hooks/useAssumptions.ts` - Assumption management
- `client/src/hooks/useTimer.ts` - Timer synchronization

**Key tasks:**

- Migrate existing socket logic from old `src/client/` folder
- Add proper error handling and reconnection logic
- Fix timer synchronization issues mentioned by user

### 2. ProjectRoom Implementation (High Priority)

**Files to create:**

- `client/src/pages/ProjectRoom/index.tsx` - Main room layout
- `client/src/pages/ProjectRoom/NameEntry.tsx` - User name input
- `client/src/pages/ProjectRoom/Setup.tsx` - Assumption creation
- `client/src/pages/ProjectRoom/Critique.tsx` - Assumption analysis
- `client/src/pages/ProjectRoom/Reflection.tsx` - Final phase

**Key tasks:**

- Implement phase navigation
- Add proper state management for room data
- Translate all Dutch text to English

### 3. Reusable Components (Medium Priority)

**Files to create:**

- `client/src/components/ui/Button.tsx` - Standardized buttons
- `client/src/components/ui/Input.tsx` - Form inputs
- `client/src/components/ui/Card.tsx` - Assumption cards
- `client/src/components/ui/Timer.tsx` - Timer component
- `client/src/components/ui/LoadingSpinner.tsx` - Loading states
- `client/src/components/layout/Sidebar.tsx` - Navigation sidebar

### 4. Advanced Features (Medium Priority)

**Files to create:**

- `client/src/components/features/DraggableAssumption.tsx` - Drag & drop
- `client/src/components/features/UserAvatar.tsx` - User presence
- `client/src/components/features/CritiqueQuestions.tsx` - Question prompts
- `client/src/hooks/useWindowDimensions.ts` - Responsive handling
- `client/src/hooks/useDragAndDrop.ts` - Drag logic

### 5. Testing & Polish (Low Priority)

**Files to create:**

- `client/vitest.config.ts` - Test configuration
- `client/src/components/__tests__/` - Component tests
- `client/src/hooks/__tests__/` - Hook tests

## 🔧 Development Workflow

### Starting Development

```bash
# Install dependencies (if not done)
npm install

# Start both client and server
npm run dev

# Or start individually
npm run client:dev  # Client on http://localhost:3000
npm run server:dev  # Server on http://localhost:4000
```

### Code Migration Pattern

When migrating from old code:

1. **Find the old file** in `src/` directory
2. **Identify the main functionality**
3. **Create new TypeScript version** in appropriate `client/src/` location
4. **Update imports** to use new path aliases (`@components`, `@hooks`, etc.)
5. **Translate Dutch text** to English
6. **Add proper TypeScript types**
7. **Test the functionality**

### Common Migration Tasks

#### From Old Component to New:

```typescript
// OLD: src/compontents/timer/index.js
import React, { useState } from 'react';

// NEW: client/src/components/ui/Timer.tsx
import { useState } from 'react';
import { useTimer } from '@hooks/useTimer';
import { cn } from '@utils/cn';

interface TimerProps {
  roomId: string;
  className?: string;
}

const Timer: React.FC<TimerProps> = ({ roomId, className }) => {
  // ... implementation
};
```

#### Socket Hook Pattern:

```typescript
// client/src/hooks/useSocket.ts
import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { SOCKET_URL } from '@utils/constants';

export const useSocket = (roomId: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!roomId) return;

    const newSocket = io(SOCKET_URL, { query: { roomId } });

    newSocket.on('connect', () => setConnected(true));
    newSocket.on('disconnect', () => setConnected(false));

    setSocket(newSocket);

    return () => newSocket.close();
  }, [roomId]);

  return { socket, connected };
};
```

## 🎨 Design System Usage

### Using Tailwind CSS Classes:

```typescript
// Use pre-built component classes
<button className="btn-retro">Primary Action</button>
<div className="card-assumption">Assumption Content</div>
<input className="input-retro" />

// Combine with utilities
<div className={cn(
  "btn-retro",
  isLoading && "opacity-50",
  className
)}>
  Submit
</div>
```

### Animation Patterns:

```typescript
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>;
```

## 🐛 Known Issues to Fix

1. **Timer Synchronization**: Original timer had socket issues - fix in `useTimer` hook
2. **SVG Imports**: Working but might need optimization
3. **Mobile Responsiveness**: Need to test and improve mobile experience
4. **Error Boundaries**: Add more granular error handling

## 📁 File Organization

```
client/src/
├── components/
│   ├── ui/           # Reusable UI components (Button, Input, etc.)
│   ├── layout/       # Layout components (Sidebar, Header, etc.)
│   └── features/     # Feature-specific components (Timer, DragDrop, etc.)
├── pages/            # Page-level components
├── hooks/            # Custom hooks
├── contexts/         # React contexts
├── utils/            # Utility functions
├── types/            # TypeScript types
└── assets/           # Static assets
```

## 🔄 Migration Checklist

Use this checklist when migrating components:

- [ ] Create TypeScript version
- [ ] Add proper props interface
- [ ] Translate Dutch to English
- [ ] Update import paths to use aliases
- [ ] Add error handling
- [ ] Test functionality
- [ ] Add responsive design
- [ ] Document any special usage

## 💡 Tips

1. **Use the existing design**: The retro/card aesthetic is intentional
2. **Keep animations smooth**: Framer Motion is already configured
3. **Maintain accessibility**: Add proper ARIA labels and keyboard navigation
4. **Test with multiple users**: Socket.io behavior changes with multiple connections
5. **Use TypeScript strictly**: Enable all the type checking benefits

## 🚀 Ready to Continue!

The foundation is solid. Focus on the Socket.io integration first, then build out the ProjectRoom components. The server is already upgraded and ready to handle the improved client!
