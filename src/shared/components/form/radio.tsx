import { Controller, useFormContext, type RegisterOptions } from 'react-hook-form';

import { cn } from '@/shared/lib/utils';
import { memo } from 'react';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import Label from './label';

type RadioProps = {
  options: string[];
  label?: string;
  labelClassName?: string;
  name: string;
  validation?: RegisterOptions;
  handleOnChange?: (value: string) => void;
};

const Radio = ({
  options,
  label,
  labelClassName,
  name,
  validation,
  handleOnChange,
}: RadioProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={validation}
      defaultValue={options[0]}
      render={({ field }) => (
        <>
          <div className={cn('label mb-3', labelClassName)}>{label}</div>
          <RadioGroup
            onValueChange={value => {
              field.onChange(value);

              if (handleOnChange) {
                handleOnChange(value);
              }
            }}
            value={field.value || options[0]}
            className="flex items-center gap-x-9"
          >
            {options.map(option => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={option} />
                <Label
                  htmlFor={option}
                  className={cn('mb-0 text-xs font-normal capitalize text-primary')}
                >
                  {option.replaceAll('-', ' ')}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </>
      )}
    />
  );
};

export default memo(Radio);
