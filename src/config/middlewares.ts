import { type NextMiddlewareWithAuth, type NextRequestWithAuth } from 'next-auth/middleware';
import { NextResponse, type NextFetchEvent } from 'next/server';

export interface State {
  response: NextResponse;
  readonly request: NextRequestWithAuth;
  readonly event: NextFetchEvent;
  next: boolean;
}

export interface NextAuthMiddlewareHandler {
  (payload: State): void;
}

interface NextAuthMiddlewares {
  (handler: NextAuthMiddlewareHandler[]): NextMiddlewareWithAuth;
}

const nextAuthMiddlewares: NextAuthMiddlewares = handlers => {
  return (request, event) => {
    const response = NextResponse.next({ headers: request.headers });
    const state: State = { response, request, event, next: true } as const;
    for (const handler of handlers) {
      handler(state);
      if (state.next === false) break;
    }
    return state.response;
  };
};

export default nextAuthMiddlewares;
