import SpinnerRing from '@/shared/assets/svgs/spinner-ring.svg?react';

type LoaderProps = React.SVGAttributes<SVGSVGElement> & {
  size?: number;
};

const Loader = (props: LoaderProps) => {
  const { size = 28, ...restProps } = props;

  return <SpinnerRing width={size} height={size} {...restProps} />;
};

export default Loader;
