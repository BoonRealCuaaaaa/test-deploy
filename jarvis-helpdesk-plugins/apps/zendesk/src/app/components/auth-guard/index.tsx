import { PropsWithChildren } from 'react';

import Loader from '@/shared/components/loader';
import { useAuth } from '@/shared/contexts/auth/context';

const AuthGuard = ({ children }: PropsWithChildren) => {
  const { user, isPendingCurrentUser } = useAuth();

  if (!isPendingCurrentUser && !user) {
    return <div>LoginContainer</div>;
  }

  return isPendingCurrentUser || !user ? <Loader /> : children;
};

export default AuthGuard;
