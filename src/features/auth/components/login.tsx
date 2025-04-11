'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';

import * as Form from '@/shared/components/form';
import { Logo } from '@/shared/components/partials';
import { Button } from '@/shared/components/ui/button';
import { type LoginPayload } from '../types';
import { loginSchema } from '../validations';

const Login = () => {
  const router = useRouter();
  const methods = useForm<LoginPayload>({ resolver: zodResolver(loginSchema) });
  const { handleSubmit } = methods;

  /**
   *
   * @param payload -> login payload
   */
  const handleLogin = async (payload: LoginPayload) => {
    // eslint-disable-next-line no-console
    console.log({ payload });
    router.push('/');
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Logo className="mx-auto w-40 text-sidebar" />
        <h2 className="mt-10 text-center text-2xl font-extrabold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <FormProvider {...methods}>
          <form className="space-y-6" onSubmit={handleSubmit(handleLogin)}>
            <Form.Group>
              <Form.Input name="email" type="email" label="Email address" />
            </Form.Group>
            <Form.Group>
              <Form.Input name="password" type="password" label="Password" />
            </Form.Group>

            <div>
              <Button type="submit" size="full">
                Sign in
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default Login;
