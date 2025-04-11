import { sidebarLinks } from '@/shared/constants/links';
import { NextResponse } from 'next/server';
import { type NextAuthMiddlewareHandler } from './middlewares';

const PrivateBasePage = sidebarLinks[0].href;

// Access Allowed Only for Signed-In Users:
const PrivatePaths: string[] = [];
// ROUTES.Products, ROUTES.Users

// Access Denied for Signed-In Users:
const RestrictedPaths: string[] = [];

export const pathRestrictionHandler: NextAuthMiddlewareHandler = state => {
  const req = state.request;
  const haveToken = Boolean(req.nextauth.token);
  const pathname = req.nextUrl.pathname;
  const origin = req.nextUrl.origin;
  const aPrivatePath = Boolean(PrivatePaths.find(path => pathname.startsWith(path)));
  const aRestrictedPath = Boolean(RestrictedPaths.find(path => pathname.startsWith(path)));

  if (aPrivatePath && !haveToken) {
    state.response = NextResponse.redirect(origin + '/');
    state.next = false;
  } else if (aRestrictedPath && haveToken) {
    state.response = NextResponse.redirect(origin + PrivateBasePage);
    state.next = false;
  }
};
