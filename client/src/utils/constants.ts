// Socket configuration
export const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL || window.location.origin;

// Timer configuration
export const DEFAULT_TIMER_SECONDS = 300; // 5 minutes
export const TIMER_TICK_INTERVAL = 1000; // 1 second

// UI configuration
export const ASSUMPTION_CARD_SIZE = {
  width: 192, // w-48 in Tailwind
  height: 192, // h-48 in Tailwind
};

// Room configuration
export const MAX_ROOM_NAME_LENGTH = 50;
export const MAX_USER_NAME_LENGTH = 30;
export const MAX_ASSUMPTION_LENGTH = 200;

// Animation configuration
export const ANIMATION_DURATION = {
  fast: 200,
  normal: 300,
  slow: 500,
};

// Responsive breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// Phase navigation order
export const PHASE_ORDER = [
  'name-entry',
  'setup',
  'assumptions',
  'critique',
  'reflection',
] as const;

// Critique questions for UX workshops
export const CRITIQUE_QUESTIONS = [
  {
    id: '1',
    question: 'What evidence supports this assumption?',
    category: 'evidence' as const,
    description:
      'Look for data, research, or concrete examples that validate this assumption.',
  },
  {
    id: '2',
    question: 'What if the opposite were true?',
    category: 'alternatives' as const,
    description:
      'Consider how the situation would change if this assumption was false.',
  },
  {
    id: '3',
    question: 'What are the implications if this assumption is wrong?',
    category: 'implications' as const,
    description:
      'Think about the consequences and risks of basing decisions on this assumption.',
  },
  {
    id: '4',
    question: 'How could we test this assumption?',
    category: 'evidence' as const,
    description:
      'Identify ways to validate or invalidate this assumption through research or experimentation.',
  },
  {
    id: '5',
    question: 'What biases might influence this assumption?',
    category: 'assumptions' as const,
    description:
      'Consider personal, cultural, or organizational biases that might shape this thinking.',
  },
  {
    id: '6',
    question: 'Who might disagree with this assumption and why?',
    category: 'alternatives' as const,
    description:
      'Think about different perspectives and stakeholder viewpoints.',
  },
  {
    id: '7',
    question: 'What context is this assumption based on?',
    category: 'assumptions' as const,
    description:
      'Identify the specific conditions or environment where this assumption might be valid.',
  },
  {
    id: '8',
    question: 'How might this assumption limit our solution space?',
    category: 'implications' as const,
    description:
      'Consider how this assumption might constrain our thinking or prevent us from seeing other opportunities.',
  },
];
