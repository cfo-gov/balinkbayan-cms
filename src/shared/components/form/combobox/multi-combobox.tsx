'use client';

import { Check, ChevronDown } from 'lucide-react';
import * as React from 'react';
import { Controller, get, useFormContext, useWatch } from 'react-hook-form';

import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Command, CommandGroup, CommandInput, CommandItem } from '@/shared/components/ui/command';
import { cn } from '@/shared/lib/utils';

import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';
import { useWidth } from '@/shared/hooks';
import { type TOption, type TSelect } from '@/shared/types/form';
import { ErrorMessage, FormLabel } from '..';

export function MultiCombobox(props: TSelect) {
  const { name, label, options, placeholder = 'Search...', validation } = props;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [newOptions, setNewOptions] = React.useState<TOption[]>(options);
  const [openCombobox, setOpenCombobox] = React.useState(false);
  const [inputValue, setInputValue] = React.useState<string>('');

  const currentValues = useWatch({ name });
  const { ref: buttonRef, width } = useWidth();

  const { control, setValue, formState } = useFormContext();
  const hasError = get(formState.errors, name);

  const createOption = (query: string) => {
    const newOption = {
      value: query.toLowerCase(),
      label: query,
    };
    setNewOptions(prev => [...prev, newOption]);
    setValue(name, [...currentValues, newOption.value]);
    setInputValue('');
  };

  const toggleOption = (value: TOption['value']) => {
    const currentOptions = !currentValues.includes(value)
      ? [...currentValues, value]
      : currentValues.filter((currValue: unknown) => currValue !== value);

    setValue(name, currentOptions);

    inputRef?.current?.focus();
  };

  const onComboboxOpenChange = (value: boolean) => {
    inputRef.current?.blur();
    setOpenCombobox(value);
  };

  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={validation}
        render={({ field }) => (
          <>
            {!!label && (
              <FormLabel
                onClick={() => {
                  setOpenCombobox(true);
                  inputRef.current?.focus();
                }}
              >
                {label}
              </FormLabel>
            )}
            <Popover open={openCombobox} onOpenChange={onComboboxOpenChange}>
              <PopoverTrigger asChild>
                <Button
                  ref={buttonRef}
                  variant="input"
                  size="full"
                  role="combobox"
                  aria-expanded={openCombobox}
                  className={cn(
                    !field.value && 'text-muted-foreground',
                    'relative h-12 justify-between px-4',
                    currentValues.length > 0 ? 'text-gray-900' : 'text-muted-foreground'
                  )}
                >
                  <span className="truncate">
                    {currentValues.length === 0 && 'Select options'}
                    {currentValues.length > 0 &&
                      `${currentValues.length} ${
                        currentValues.length > 1 ? 'options' : 'option'
                      } selected`}
                  </span>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 text-gray-900" />
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className={cn('border-gray-200 p-0')} style={{ width: width + 'px' }}>
                <Command loop>
                  <CommandInput
                    ref={inputRef}
                    placeholder={placeholder}
                    value={inputValue}
                    onValueChange={setInputValue}
                  />
                  <CommandGroup className="h-full max-h-[13rem] overflow-auto">
                    {newOptions.map(option => {
                      const isActive = currentValues.includes(option.value);
                      return (
                        <CommandItem
                          key={option.value}
                          value={option.value}
                          onSelect={() => toggleOption(option.value)}
                        >
                          <Check
                            className={cn('mr-2 h-4 w-4', isActive ? 'opacity-100' : 'opacity-0')}
                          />
                          <div className="flex-1">{option.label}</div>
                        </CommandItem>
                      );
                    })}
                    <CommandItemCreate
                      onSelect={() => createOption(inputValue)}
                      {...{ inputValue, options: newOptions }}
                    />
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </>
        )}
      />

      <div className="relative mt-3 overflow-y-auto">
        {newOptions
          .filter(({ value }) => currentValues?.includes(value))
          ?.map(option => (
            <Badge key={option.value} variant="secondary" className="mb-2 mr-2 py-1.5 shadow-md">
              {option.label}
            </Badge>
          ))}
      </div>

      {hasError && <ErrorMessage message={hasError?.message} />}
    </>
  );
}

const CommandItemCreate = ({
  inputValue,
  options,
  onSelect,
}: {
  inputValue: string;
  options: TOption[];
  onSelect: () => void;
}) => {
  const hasNoOptions = !options.map(({ value }) => value).includes(`${inputValue.toLowerCase()}`);

  const render = inputValue !== '' && hasNoOptions;

  if (!render) return null;

  // BUG: whenever a space is appended, the Create-Button will not be shown.
  return (
    <CommandItem
      key={`${inputValue}`}
      value={`${inputValue}`}
      className="text-xs text-muted-foreground"
      onSelect={onSelect}
    >
      <div className={cn('mr-2 h-4 w-4')} />
      Create new option <span className="font-medium">&quot;{inputValue}&quot;</span>
    </CommandItem>
  );
};
