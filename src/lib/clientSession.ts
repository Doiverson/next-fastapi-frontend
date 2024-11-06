'use client';

import { useEffect } from 'react';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface ClientSession {
  session: Session | null;
}

const useClientSession = (): ClientSession => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Wait for session to load
    if (!session) {
      router.push('/auth/login'); // Redirect to login if not authenticated
    }
  }, [session, status, router]);

  return { session };
};

export default useClientSession;
