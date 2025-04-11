import { useId } from 'react';
import { Controller, get, useFormContext } from 'react-hook-form';

import type { Textarea } from '@/shared/types/form';
import { FormLabel } from '.';
import { RadixTextArea } from '../ui/radix-textarea';
import ErrorMessage from './error-message';

const Input = (props: Textarea) => {
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

          <RadixTextArea
            id={randomId}
            variant={hasError ? 'destructive' : 'default'}
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
