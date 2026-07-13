"use client";

import React, { useCallback, useContext, useState, useSyncExternalStore, createContext } from 'react';
import { useRouter } from 'next/navigation';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'DOCTOR' | 'NURSE' | 'ADMIN' | 'PATIENT';
}

interface JwtPayload {
  sub: string;
  email: string;
  name: string;
  role: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role?: string) => Promise<void>;
  logout: () => void;
}

const AUTH_COOKIE_NAME = 'auth_token';
const AUTH_COOKIE_MAX_AGE = 86400;

type AuthListener = () => void;
const authListeners = new Set<AuthListener>();

function subscribe(listener: AuthListener) {
  authListeners.add(listener);
  return () => authListeners.delete(listener);
}

function emitAuthChange() {
  authListeners.forEach(listener => listener());
}

function decodeToken(token: string): JwtPayload | null {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload)) as JwtPayload;
  } catch {
    return null;
  }
}

function getAuthToken(): string | undefined {
  if (typeof document === 'undefined') return undefined;
  return document.cookie
    .split('; ')
    .find(row => row.startsWith(`${AUTH_COOKIE_NAME}=`))
    ?.split('=')[1];
}

function getUserFromToken(): User | null {
  const token = getAuthToken();
  if (!token) return null;
  const decodedToken = decodeToken(token);
  if (!decodedToken) return null;
  return {
    id: decodedToken.sub,
    email: decodedToken.email,
    name: decodedToken.name,
    role: decodedToken.role as User['role'],
  };
}

function getServerUserSnapshot(): User | null {
  return null;
}

function setAuthCookie(token: string) {
  if (typeof document === 'undefined') return;
  document.cookie = `${AUTH_COOKIE_NAME}=${token}; path=/; max-age=${AUTH_COOKIE_MAX_AGE}; secure; SameSite=Lax`;
  emitAuthChange();
}

function clearAuthCookie() {
  if (typeof document === 'undefined') return;
  document.cookie = `${AUTH_COOKIE_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  emitAuthChange();
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const user = useSyncExternalStore(subscribe, getUserFromToken, getServerUserSnapshot);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = (await response.json()) as { access_token?: string; user?: Record<string, unknown>; error?: string };
      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }
      if (!data.access_token) {
        throw new Error('Invalid server response');
      }
      setAuthCookie(data.access_token);
      const urlParams = new URLSearchParams(window.location.search);
      const redirectUrl = urlParams.get('redirect') || '/dashboard';
      router.push(redirectUrl);
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const register = useCallback(async (email: string, password: string, name: string, role?: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, role }),
      });
      const data = (await response.json()) as { access_token?: string; user?: Record<string, unknown>; error?: string };
      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }
      if (!data.access_token) {
        throw new Error('Invalid server response');
      }
      setAuthCookie(data.access_token);
      router.push('/dashboard');
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const logout = useCallback(() => {
    clearAuthCookie();
    router.push('/login');
  }, [router]);

  const providerValue = { user, isLoading, login, register, logout };

  return React.createElement(
    AuthContext.Provider,
    { value: providerValue },
    children
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
