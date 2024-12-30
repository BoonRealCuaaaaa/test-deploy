import { forwardRef, ReactNode } from 'react';
import { Slot } from '@radix-ui/react-slot';
import classNames from 'classnames';

import Loader from '../loader';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'destructive' | 'default';
  loader?: ReactNode;
  loading?: boolean;
  showChildrenWhileLoading?: boolean;
};

const BUTTON_VARIANT = {
  primary: {
    className: 'bg-primary-gradient text-white hover:bg-primary-gradient-hover',
    loaderClassName: 'fill-white',
  },
  secondary: {
    className: 'bg-white border border-primary-600 text-primary-800 hover:bg-primary-100',
    loaderClassName: 'fill-primary-800',
  },
  tertiary: {
    className: 'bg-primary-100 text-primary-600 hover:bg-primary-200',
    loaderClassName: 'fill-primary-600',
  },
  destructive: {
    className: 'bg-red-500 text-white hover:bg-red-600',
    loaderClassName: 'fill-white',
  },
  default: {
    className: 'hover:bg-slate-100',
    loaderClassName: 'fill-slate-500',
  },
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    variant = 'default',
    loader = <Loader size={16} />,
    loading,
    showChildrenWhileLoading = true,
    children,
    className,
    ...restProps
  } = props;

  return (
    <button
      ref={ref}
      className={classNames(
        'flex items-center justify-center disabled:cursor-not-allowed',
        { 'h-9 w-fit min-w-[80px] rounded-xl px-4 text-sm font-semibold': variant !== 'default' },
        BUTTON_VARIANT[variant].className,
        className
      )}
      {...restProps}
    >
      {loading && <Slot className={classNames('mr-2', BUTTON_VARIANT[variant].loaderClassName)}>{loader}</Slot>}
      {loading && !showChildrenWhileLoading ? null : children}
    </button>
  );
});

export default Button;
