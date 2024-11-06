import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { Session as NextAuthSession } from 'next-auth';

interface Session {
  session: NextAuthSession | null;
}

export const checkSession = async (): Promise<Session> => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/auth/login');
  }

  return { session };
};
