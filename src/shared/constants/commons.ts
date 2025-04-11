import { type QueryClientConfig } from '@tanstack/react-query';
import { errorHandler } from '../utils/error-handler';

export const VALIDATOR_MESSAGE = {
  Required: 'This field is required',
  Match_Password: 'Password do not match',
  Password_Length: 'Password must contain at least 8 character(s)',
  Positive_Numbers: 'Only positive numbers are allowed',
  Digits_Only: 'Only digits are allowed',
  Invalid_Contact_Number: 'Invalid contact number',
  Invalid_Input: 'Invalid input',
  Invalid_Email: 'Email is invalid',
};

export const QUERY_CLIENT_OPTIONS: QueryClientConfig = {
  defaultOptions: {
    // staleTime is 5 minutes
    queries: { staleTime: 1000 * 60 * 5, refetchOnWindowFocus: false, retry: 1 },
    mutations: {
      onError: error => errorHandler(error),
    },
  },
};

export const PAGINATION_PER_PAGE = 25;
export const IMAGE_NOT_AVAILABLE = 'https://placehold.co/500x500/png?text=Image%20not%20available';

export const IMAGE_FILE_TYPES = ['JPEG', 'PNG', 'JPG', 'WEBP'];
export const MAX_SIZE_FILE = 10; //10 MB
