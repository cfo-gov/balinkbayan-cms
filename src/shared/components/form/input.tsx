import { useId } from 'react';
import { Controller, get, useFormContext } from 'react-hook-form';

import type { TInput } from '@/shared/types/form';
import { FormLabel } from '.';
import { RadixInput } from '../ui/radix-input';
import ErrorMessage from './error-message';

const Input = (props: TInput) => {
  const { name, label, validation, ...inputProps } = props;
  const randomId = useId();
  const { formState, control } = useFormContext();

  const hasError = get(formState.errors, name);

  return (
    <Controller
      control={control}
      name={name}
      rules={validation}
      defaultValue=""
      render={({ field }) => (
        <>
          {!!label && <FormLabel htmlFor={randomId}>{label}</FormLabel>}

          <RadixInput
            id={randomId}
            variant={hasError ? 'destructive' : 'default'}
            min={inputProps.type === 'number' ? 0 : undefined}
            {...field}
            {...inputProps}
          />

          {hasError && <ErrorMessage message={hasError?.message} />}
        </>
      )}
    />
  );
};

export default Input;
