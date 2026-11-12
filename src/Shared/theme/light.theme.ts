import type { Theme } from './theme.types';
import { sharedTokens } from './theme.tokens';

export const lightTheme: Theme = {
  mode: 'light',
  colors: {
    primary: '#1e3a8a',
    secondary: '#64748b',
    background: '#ffffff',
    surface: '#f8fafc',
    text: '#0f172a',
    border: '#e2e8f0',
    accent: '#f59e0b',
    onPrimary: '#FFFFFF',
  },
  spacing: sharedTokens.spacing,
  borderRadius: sharedTokens.borderRadius,
};
