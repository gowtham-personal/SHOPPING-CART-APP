import { type VariantProps } from 'class-variance-authority';
import { type ReactNode } from 'react';

import { cn } from '@/components/bricks/shadcn/lib/utils';
import { Button as ShadcnButton, buttonVariants } from '@/components/bricks/shadcn/ui/button';

export type ButtonVariant = 'solid' | 'outline' | 'transparent' | 'link';
export type ButtonColorVariant = 'blue' | 'blue-500' | 'grey' | 'red';
export type ButtonSizeVariant = 'sm' | 'md';

const buttonVariantMapper: Record<ButtonVariant, VariantProps<typeof buttonVariants>['variant']> = {
  solid: 'default',
  outline: 'outline',
  transparent: 'ghost',
  link: 'link',
};

const buttonColorConfig: Record<ButtonColorVariant, Record<ButtonVariant, string>> = {
  blue: {
    solid: 'bg-sky-600/90 text-white hover:bg-sky-600',
    outline: 'border-sky-600 text-sky-600 hover:bg-sky-50',
    transparent: 'text-sky-600 hover:bg-sky-50',
    link: 'text-sky-600 hover:text-sky-700',
  },
  'blue-500': {
    solid: 'bg-blue-500 text-white hover:bg-blue-700',
    outline: 'border-blue-500 text-blue-500 hover:bg-blue-50',
    transparent: 'text-blue-500 hover:bg-blue-50',
    link: 'text-blue-500 hover:text-blue-700',
  },
  grey: {
    solid: 'bg-neutral-200 text-neutral-600 hover:bg-neutral-300',
    outline: 'border-neutral-200 text-neutral-600 hover:bg-neutral-50',
    transparent: 'text-neutral-600 hover:bg-neutral-50',
    link: 'text-neutral-600 hover:text-neutral-700',
  },
  red: {
    solid: 'bg-red-600 text-white hover:bg-red-700',
    outline: 'border-red-600 text-red-600 hover:bg-red-50',
    transparent: 'text-red-600 hover:bg-red-50',
    link: 'text-red-600 hover:text-red-700',
  },
};

const buttonSizeConfig: Record<ButtonSizeVariant, string> = {
  sm: 'h-9 p-2 rounded-md',
  md: 'h-10 p-2.5 rounded-lg',
};

export interface ButtonProps {
  variant?: ButtonVariant;
  color?: ButtonColorVariant;
  className?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  text?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  size?: ButtonSizeVariant;
}

export const Button = ({
  variant = 'outline',
  color = 'grey',
  className,
  leftIcon,
  rightIcon,
  text,
  disabled = false,
  onClick,
  type = 'button',
  size = 'sm',
  ...props // Any additional props are passed to the ShadcnButton component
}: ButtonProps) => {
  return (
    <ShadcnButton
      variant={buttonVariantMapper[variant]}
      className={cn(
        'w-full rounded-md font-medium transition-colors',
        variant !== 'link' && 'shadow-[0px_1px_2px_0px_var(--color-shadow-10)]',
        buttonColorConfig[color][variant],
        buttonSizeConfig[size],
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        className
      )}
      disabled={disabled}
      onClick={onClick}
      aria-label={`${text} button`}
      type={type}
      {...props}
    >
      {leftIcon && leftIcon}

      {text}

      {rightIcon && rightIcon}
    </ShadcnButton>
  );
};
