export interface ThemeColors {
  primary: string;
  primaryHover: string;
  navy: string;
  activeBlue: string;
  activeBlueHover: string;
  activeBlueActive: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  border: string;
  accent: string;
  sidebarBackground: string;
  sidebarText: string;
  sidebarMuted: string;
  sidebarHover: string;
  sidebarBorder: string;
  success: string;
  error: string;
  onPrimary: string;
}

export interface ThemeSpacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface ThemeBorderRadius {
  sm: string;
  md: string;
  lg: string;
  full: string;
}

export interface Theme {
  mode: 'light' | 'dark';
  colors: ThemeColors;
  spacing: ThemeSpacing;
  borderRadius: ThemeBorderRadius;
}

export type ThemeMode = 'light' | 'dark';