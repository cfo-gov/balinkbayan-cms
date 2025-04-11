import { AxiosError } from 'axios';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 86400, // 1 day
  },

  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      /**
       * @params credentials {email: string, password: string}
       */
      async authorize() {
        try {
          // const { data } = await authAPI.login({
          //   email: credentials!.email,
          //   password: credentials!.password,
          // });

          return { authToken: 'randomStrings', role: 'admin' };
        } catch (error: unknown) {
          if (error instanceof AxiosError) {
            throw new Error(error?.response?.data?.message);
          }

          throw new Error('Internal Error');
        }
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: '/',
    signOut: '/',
  },

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
};
