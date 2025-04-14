/* eslint-disable @typescript-eslint/no-unused-vars */
import { type NextRequest, NextResponse } from 'next/server';

export interface ApiError extends Error {
  statusCode?: number;
  code?: string;
}

/**
 * Middleware to handle API errors in a consistent way
 * 
 * @param error Any error thrown during API request handling
 * @param request The original NextRequest object
 * @returns A NextResponse with appropriate status code and error details
 */
export function handleApiError(error: unknown, _req: NextRequest): NextResponse {

  // Determine the error details
  const apiError = error as ApiError;
  const statusCode = apiError.statusCode || 500;
  const message = apiError.message || 'An unexpected error occurred';
  const errorCode = apiError.code || 'INTERNAL_SERVER_ERROR';

  // Return a structured error response
  return NextResponse.json(
    {
      success: false,
      error: {
        message,
        code: errorCode,
      }
    },
    { status: statusCode }
  );
}

/**
 * Wraps an API handler function with error handling
 * 
 * @param handler The API route handler function to wrap
 * @returns A new handler with error handling
 */
export function withErrorHandling(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handler: (req: NextRequest, { params }: { params: { id: string } }) => Promise<NextResponse> | NextResponse,
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async function (req: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
    try {
      return await handler(req, { params });
    } catch (error) {
      return handleApiError(error, req);
    }
  };
}