import { startCase } from 'lodash';
import { ChevronDown } from 'lucide-react';
import React, { useId } from 'react';
import { Controller, get, useFormContext } from 'react-hook-form';

import { Button } from '@/shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { ScrollArea } from '@/shared/components/ui/scroll-area';
import {
  SelectContent,
  SelectItem,
  Select as SelectPrimitive,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { useWidth } from '@/shared/hooks';
import { cn } from '@/shared/lib/utils';
import { type TExtendedSelect, type TSelect } from '@/shared/types/form';
import { ErrorMessage, FormLabel } from '.';

const DefaultSelect = (props: TSelect) => {
  const { name, label, options, placeholder, validation } = props;
  const { control, formState } = useFormContext();
  const randomId = useId();
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

          <SelectPrimitive onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger className="h-12">
              <SelectValue id={randomId} placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              <ScrollArea className={cn(options.length > 6 ? 'h-[13rem]' : 'h-full')}>
                {options.map((option, idx) => (
                  <SelectItem key={`${option.value}-${idx}`} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </ScrollArea>
            </SelectContent>
          </SelectPrimitive>

          {hasError && <ErrorMessage message={hasError?.message} />}
        </>
      )}
    />
  );
};

const MultiSelect = (props: TSelect) => {
  const { name, label, options, placeholder, validation } = props;

  const { control, formState } = useFormContext();
  const randomId = React.useId();
  const hasError = get(formState.errors, name);

  const { ref, width } = useWidth();

  return (
    <Controller
      control={control}
      name={name}
      rules={validation}
      defaultValue={[]}
      render={({ field }) => (
        <>
          {!!label && <FormLabel htmlFor={randomId}>{label}</FormLabel>}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                ref={ref}
                variant="input"
                size="full"
                role="combobox"
                className={cn(
                  !field.value && 'text-muted-foreground',
                  'relative h-full justify-start pl-4 pr-10 text-left',
                  field.value?.length > 0 ? 'py-3.5' : 'py-6'
                )}
              >
                {field.value
                  ? field.value?.map((opt: string | undefined) => startCase(opt)).join(', ')
                  : placeholder}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent style={{ width: width + 'px' }}>
              <ScrollArea className="h-full max-h-[13rem]">
                {options.map((option, idx) => (
                  <DropdownMenuCheckboxItem
                    onSelect={e => e.preventDefault()}
                    key={`${option.value}-${idx}`}
                    checked={field.value?.includes(option.value)}
                    onCheckedChange={checked => {
                      return checked
                        ? field.onChange([...field.value, option.value])
                        : field.onChange(
                            field.value?.filter((value: string) => value !== option.value)
                          );
                    }}
                  >
                    {option.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </ScrollArea>
            </DropdownMenuContent>
          </DropdownMenu>

          {hasError && <ErrorMessage message={hasError?.message} />}
        </>
      )}
    />
  );
};

const Select = (props: TExtendedSelect) => {
  const { multiple = false, ...selectProps } = props;

  switch (multiple) {
    case true:
      return <MultiSelect {...selectProps} />;

    default:
      return <DefaultSelect {...selectProps} />;
  }
};

export default Select;
