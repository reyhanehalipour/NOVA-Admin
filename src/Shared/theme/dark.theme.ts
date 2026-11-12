import type { Theme } from './theme.types';
import { sharedTokens } from './theme.tokens';

export const darkTheme: Theme = {
  mode: 'dark',
  colors: {
    primary: '#F86A21',
    primaryHover: '#FF7D3A',
    navy: '#0E1830',
    activeBlue: '#2158A6',
    activeBlueHover: '#2E6BC4',
    activeBlueActive: '#245199',
    secondary: '#93A4C3',
    background: '#0E1830',
    surface: '#1B2C4F',
    text: '#F5F7FB',
    border: '#263858',
    accent: '#F86A21',
    sidebarBackground: '#0A1226',
    sidebarText: '#FFFFFF',
    sidebarMuted: '#8FA1BE',
    sidebarHover: '#182A47',
    sidebarBorder: '#1D2E4C',
    success: '#2FAF6E',
    error: '#E05252',
    onPrimary: '#FFFFFF',
  },
  spacing: sharedTokens.spacing,
  borderRadius: sharedTokens.borderRadius,
};