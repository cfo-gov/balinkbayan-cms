import 'react-calendar/dist/Calendar.css';
import DatePicker from 'react-date-picker';
import { Controller, get, useFormContext } from 'react-hook-form';

import { cn } from '@/shared/lib/utils';
import type { TDatepicker } from '@/shared/types/form';
import { CalendarIcon, X } from 'lucide-react';
import { useId } from 'react';
import 'react-calendar/dist/Calendar.css';
import 'react-date-picker/dist/DatePicker.css';
import { FormLabel } from '.';
import ErrorMessage from './error-message';

const Datepicker = (props: TDatepicker) => {
  const { name, validation, label, disabled } = props;
  const { control, formState } = useFormContext();
  const randomId = useId();
  const hasError = get(formState.errors, name);

  return (
    <div className="flex flex-col justify-center gap-1">
      <>
        {!!label && <FormLabel htmlFor={randomId}>{label}</FormLabel>}

        <Controller
          control={control}
          name={name}
          rules={validation}
          render={({ field }) => (
            <DatePicker
              id={randomId}
              onChange={field.onChange}
              value={field.value}
              className="form-control"
              format="MM/dd/yyyy"
              dayPlaceholder="DD"
              monthPlaceholder="MM"
              yearPlaceholder="YYYY"
              clearIcon={
                !field.value ? null : (
                  <X
                    className={cn(
                      '-mt-px h-5 w-5 text-gray-600',
                      !disabled ? 'hover:text-gray-800' : null
                    )}
                    style={{ display: disabled ? 'none' : undefined }}
                  />
                )
              }
              calendarIcon={
                <CalendarIcon
                  className={cn('h-4 w-4 text-gray-600', !disabled ? 'hover:text-gray-800' : null)}
                />
              }
            />
          )}
        />
      </>

      {hasError && <ErrorMessage message={hasError.message as string} />}
    </div>
  );
};

export default Datepicker;
