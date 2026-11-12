import type { Theme } from './theme.types';
import { sharedTokens } from './theme.tokens';

export const lightTheme: Theme = {
  mode: 'light',
  colors: {
    primary: '#F86A21',
    primaryHover: '#E55F18',
    navy: '#172740',
    activeBlue: '#2158A6',
    activeBlueHover: '#1B4A8C',
    activeBlueActive: '#16396E',
    secondary: '#5A6B85',
    background: '#FBFBFD',
    surface: '#F5F5FF',
    text: '#172740',
    border: '#E6E6F0',
    accent: '#F86A21',
    sidebarBackground: '#172740',
    sidebarText: '#FFFFFF',
    sidebarMuted: '#A9B6CC',
    sidebarHover: '#22344F',
    sidebarBorder: '#22344F',
    success: '#1F9D61',
    error: '#D64545',
    onPrimary: '#FFFFFF',
  },
  spacing: sharedTokens.spacing,
  borderRadius: sharedTokens.borderRadius,
};