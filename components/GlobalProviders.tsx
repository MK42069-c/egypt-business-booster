'use client';

import { AuthProvider } from '@/contexts/AuthContext';

interface GlobalProvidersProps {
  children: React.ReactNode;
}

export default function GlobalProviders({ children }: GlobalProvidersProps) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}