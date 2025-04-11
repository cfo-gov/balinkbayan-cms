import { withAuth } from 'next-auth/middleware';
import nextAuthMiddlewares from './config/middlewares';
import { pathRestrictionHandler } from './config/path-restrictions';

export default withAuth(nextAuthMiddlewares([pathRestrictionHandler]), {
  callbacks: {
    /**
     * @params { token, req }
     * @returns boolean
     */
    authorized: () => {
      return true;
    },
  },
});
