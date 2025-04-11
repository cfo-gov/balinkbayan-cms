import 'next-auth';

type TRole = 'superadmin' | 'admin';

export type Credentials = {
  authToken: string;
  role: TRole;
};

declare module 'next-auth' {
  interface User extends Credentials {
    id?: string;
  }
  interface Session {
    user?: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends Credentials {
    id?: string;
  }
}
