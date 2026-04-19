import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import clsx from 'clsx';

type Variant = 'primary' | 'secondary';

export const Button = ({ children, className, ...props }: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }>) => {
  const variant = props.variant ?? 'primary';
  return (
    <button {...props} className={clsx('button', `button-${variant}`, className)}>
      {children}
    </button>
  );
};
