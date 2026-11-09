import type { Theme } from './theme.types';
import { sharedTokens } from './theme.tokens';

export const darkTheme: Theme = {
  mode: 'dark',
  colors: {
    primary: '#1e3a8a',
    secondary: '#94a3b8',
    background: '#0f172a',
    surface: '#1e293b',
    text: '#f8fafc',
    border: '#334155',
    accent: '#fb923c',
  },
  spacing: sharedTokens.spacing,
  borderRadius: sharedTokens.borderRadius,
};
