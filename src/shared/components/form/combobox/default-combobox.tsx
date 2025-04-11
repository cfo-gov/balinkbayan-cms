'use client';

import { ChevronDown } from 'lucide-react';
import * as React from 'react';
import { Controller, get, useFormContext } from 'react-hook-form';

import { Button } from '@/shared/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/shared/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';
import { useWidth } from '@/shared/hooks';
import { cn } from '@/shared/lib/utils';
import type { TSelect } from '@/shared/types/form';
import { Check } from 'lucide-react';
import { FormLabel } from '..';
import ErrorMessage from '../error-message';

const DefaultCombobox = (props: TSelect) => {
  const { name, label, options, placeholder, validation } = props;

  const randomId = React.useId();
  const { ref: buttonRef, width } = useWidth();

  const { control, formState } = useFormContext();
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
          <Popover>
            <PopoverTrigger asChild>
              <Button
                ref={buttonRef}
                variant={hasError ? 'input-destructive' : 'input'}
                size="full"
                role="combobox"
                className={cn(
                  !field.value && 'text-muted-foreground',
                  'relative h-12 justify-between px-4'
                )}
              >
                {field.value
                  ? options.find(option => option.value === field.value)?.label
                  : placeholder}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 text-gray-900" />
                </div>
              </Button>
            </PopoverTrigger>

            <PopoverContent className={cn('border-gray-200 p-0')} style={{ width: width + 'px' }}>
              <Command loop>
                <CommandInput placeholder={placeholder} id={randomId} />
                <CommandEmpty>No options found.</CommandEmpty>
                <CommandGroup className="h-full max-h-[13rem] overflow-auto">
                  {options.map(option => (
                    <CommandItem
                      value={option.value}
                      key={option.value}
                      onSelect={value => field.onChange(value)}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          option.value === field.value ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>

          {hasError && <ErrorMessage message={hasError?.message} />}
        </>
      )}
    />
  );
};

export default DefaultCombobox;
