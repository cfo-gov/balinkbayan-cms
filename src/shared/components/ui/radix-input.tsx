import * as React from 'react';

import { cn } from '@/shared/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';

const inputVariants = cva('form-control', {
  variants: {
    variant: {
      default: 'focus:ring-inset focus-visible:ring-ring',
      destructive: 'border-destructive focus-visible:ring-destructive',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const RadixInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ className, variant }))}
        ref={ref}
        {...props}
      />
    );
  }
);
RadixInput.displayName = 'RadixInput';

export { RadixInput, inputVariants };
