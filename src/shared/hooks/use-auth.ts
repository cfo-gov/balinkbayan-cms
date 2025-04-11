'use client';

import { useSession } from 'next-auth/react';

const useAuth = () => {
  const { data: session, ...otherOptions } = useSession();
  const user = session?.user;
  const authToken = user?.authToken;

  return { user, authToken, ...otherOptions };
};

export default useAuth;
