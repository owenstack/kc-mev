/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthImport } from './routes/_auth'
import { Route as AppImport } from './routes/_app'
import { Route as AppIndexImport } from './routes/_app.index'
import { Route as AuthSignupImport } from './routes/_auth.signup'
import { Route as AuthResetImport } from './routes/_auth.reset'
import { Route as AuthLoginImport } from './routes/_auth.login'
import { Route as AppSettingsImport } from './routes/_app.settings'

// Create/Update Routes

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const AppRoute = AppImport.update({
  id: '/_app',
  getParentRoute: () => rootRoute,
} as any)

const AppIndexRoute = AppIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AppRoute,
} as any)

const AuthSignupRoute = AuthSignupImport.update({
  id: '/signup',
  path: '/signup',
  getParentRoute: () => AuthRoute,
} as any)

const AuthResetRoute = AuthResetImport.update({
  id: '/reset',
  path: '/reset',
  getParentRoute: () => AuthRoute,
} as any)

const AuthLoginRoute = AuthLoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => AuthRoute,
} as any)

const AppSettingsRoute = AppSettingsImport.update({
  id: '/settings',
  path: '/settings',
  getParentRoute: () => AppRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_app': {
      id: '/_app'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AppImport
      parentRoute: typeof rootRoute
    }
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/_app/settings': {
      id: '/_app/settings'
      path: '/settings'
      fullPath: '/settings'
      preLoaderRoute: typeof AppSettingsImport
      parentRoute: typeof AppImport
    }
    '/_auth/login': {
      id: '/_auth/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof AuthLoginImport
      parentRoute: typeof AuthImport
    }
    '/_auth/reset': {
      id: '/_auth/reset'
      path: '/reset'
      fullPath: '/reset'
      preLoaderRoute: typeof AuthResetImport
      parentRoute: typeof AuthImport
    }
    '/_auth/signup': {
      id: '/_auth/signup'
      path: '/signup'
      fullPath: '/signup'
      preLoaderRoute: typeof AuthSignupImport
      parentRoute: typeof AuthImport
    }
    '/_app/': {
      id: '/_app/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof AppIndexImport
      parentRoute: typeof AppImport
    }
  }
}

// Create and export the route tree

interface AppRouteChildren {
  AppSettingsRoute: typeof AppSettingsRoute
  AppIndexRoute: typeof AppIndexRoute
}

const AppRouteChildren: AppRouteChildren = {
  AppSettingsRoute: AppSettingsRoute,
  AppIndexRoute: AppIndexRoute,
}

const AppRouteWithChildren = AppRoute._addFileChildren(AppRouteChildren)

interface AuthRouteChildren {
  AuthLoginRoute: typeof AuthLoginRoute
  AuthResetRoute: typeof AuthResetRoute
  AuthSignupRoute: typeof AuthSignupRoute
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthLoginRoute: AuthLoginRoute,
  AuthResetRoute: AuthResetRoute,
  AuthSignupRoute: AuthSignupRoute,
}

const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren)

export interface FileRoutesByFullPath {
  '': typeof AuthRouteWithChildren
  '/settings': typeof AppSettingsRoute
  '/login': typeof AuthLoginRoute
  '/reset': typeof AuthResetRoute
  '/signup': typeof AuthSignupRoute
  '/': typeof AppIndexRoute
}

export interface FileRoutesByTo {
  '': typeof AuthRouteWithChildren
  '/settings': typeof AppSettingsRoute
  '/login': typeof AuthLoginRoute
  '/reset': typeof AuthResetRoute
  '/signup': typeof AuthSignupRoute
  '/': typeof AppIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_app': typeof AppRouteWithChildren
  '/_auth': typeof AuthRouteWithChildren
  '/_app/settings': typeof AppSettingsRoute
  '/_auth/login': typeof AuthLoginRoute
  '/_auth/reset': typeof AuthResetRoute
  '/_auth/signup': typeof AuthSignupRoute
  '/_app/': typeof AppIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '' | '/settings' | '/login' | '/reset' | '/signup' | '/'
  fileRoutesByTo: FileRoutesByTo
  to: '' | '/settings' | '/login' | '/reset' | '/signup' | '/'
  id:
    | '__root__'
    | '/_app'
    | '/_auth'
    | '/_app/settings'
    | '/_auth/login'
    | '/_auth/reset'
    | '/_auth/signup'
    | '/_app/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  AppRoute: typeof AppRouteWithChildren
  AuthRoute: typeof AuthRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  AppRoute: AppRouteWithChildren,
  AuthRoute: AuthRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_app",
        "/_auth"
      ]
    },
    "/_app": {
      "filePath": "_app.tsx",
      "children": [
        "/_app/settings",
        "/_app/"
      ]
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/login",
        "/_auth/reset",
        "/_auth/signup"
      ]
    },
    "/_app/settings": {
      "filePath": "_app.settings.tsx",
      "parent": "/_app"
    },
    "/_auth/login": {
      "filePath": "_auth.login.tsx",
      "parent": "/_auth"
    },
    "/_auth/reset": {
      "filePath": "_auth.reset.tsx",
      "parent": "/_auth"
    },
    "/_auth/signup": {
      "filePath": "_auth.signup.tsx",
      "parent": "/_auth"
    },
    "/_app/": {
      "filePath": "_app.index.tsx",
      "parent": "/_app"
    }
  }
}
ROUTE_MANIFEST_END */
