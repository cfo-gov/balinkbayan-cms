import { authOptions } from '@/shared/lib/next-auth/auth-options';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse(JSON.stringify({ message: 'You are not logged in' }), {
      status: 401,
    });
  }

  return NextResponse.json({
    authenticated: !!session,
    session,
  });
}
