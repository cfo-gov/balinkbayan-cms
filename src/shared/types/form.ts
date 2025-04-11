import { type PropsWithChildren } from 'react';
import type { DatePickerProps } from 'react-date-picker';
import type { RegisterOptions } from 'react-hook-form';
import type { InputProps } from '../components/ui/radix-input';
import { type TextareaProps } from '../components/ui/radix-textarea';

export type TSelect = {
  name: string;
  label?: string;
  options: TOption[];
  validation?: RegisterOptions;
  placeholder?: string;
  handleOnChange?: (value: string) => void;
};

export type TExtendedSelect = TSelect & {
  multiple?: boolean;
};

export type TOption = {
  label: string;
  value: string;
};

export type TDatepicker = DatePickerProps & {
  name: string;
  label?: string;
  validation?: RegisterOptions;
  disabled?: boolean;
  showTimeSelect?: boolean;
  dateFormat?: string;
  minDate?: Date | null;
  placeholder?: string;
  className?: string;
};

export type TInput = InputProps & {
  name: string;
  label?: string;
  validation?: RegisterOptions;
};

export type Textarea = TextareaProps & TInput;
export type TFileUpload = PropsWithChildren & {
  name: string;
  fileTypes?: string[];
  placeholder?: string;
  label?: string;
  minSize?: number;
  maxSize?: number;
  className?: string;
  uploaderClassName?: string;
  disabled?: boolean;
  autoUpload?: boolean;
  onSizeError?: (arg0: string) => void;
  onTypeError?: (arg0: string) => void;
  handleChange?: (arg0: unknown) => void;
};
