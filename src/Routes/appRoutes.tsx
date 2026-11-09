export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  PRODUCTS: '/products',
  CREATE_PRODUCT: '/products/create',
  USERS: '/users',
  CREATE_USER: '/users/create',
} as const;

export type RouteName = keyof typeof ROUTES;

export interface AppRoute {
  path: string;
  element: React.ReactNode;
  protected?: boolean;
}

export const appRoutes: AppRoute[] = [
  { path: ROUTES.LOGIN, element: null },
  { path: ROUTES.DASHBOARD, element: null, protected: true },
  { path: ROUTES.PRODUCTS, element: null, protected: true },
  { path: ROUTES.CREATE_PRODUCT, element: null, protected: true },
  { path: ROUTES.USERS, element: null, protected: true },
  { path: ROUTES.CREATE_USER, element: null, protected: true },
];
