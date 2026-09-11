import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'glow';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', className = '', children, ...props }, ref) => {
    const baseStyles =
      'rounded-xl border border-border bg-surface-elevated p-5 md:p-6 transition-all duration-300';

    const variantStyles = {
      default: '',
      elevated: 'shadow-card hover:border-border-strong hover:-translate-y-1',
      glow: 'shadow-glow border-brand-700/50 hover:border-brand-500',
    };

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';