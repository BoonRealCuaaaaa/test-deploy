import Loader from '@/shared/components/loader';

const FullscreenLoader = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <Loader />
    </div>
  );
};

export default FullscreenLoader;
