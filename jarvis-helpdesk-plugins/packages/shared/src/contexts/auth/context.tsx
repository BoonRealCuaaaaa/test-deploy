import { createContext, useContext, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { AuthApi } from '@/shared/apis/auth';
import { SHARED_QUERY_KEY } from '@/shared/lib/constants/query-keys';
import { User } from '@/shared/lib/types/user';

export type AuthContextState = {
  user?: User;
  isPendingCurrentUser: boolean;
  isPendingLogout: boolean;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextState | undefined>(undefined);

export const useAuthProvider = (): AuthContextState => {
  const queryClient = useQueryClient();
  const { data: currentUser, isPending: isPendingCurrentUser } = useQuery<User>({
    queryKey: [SHARED_QUERY_KEY.AUTH.CURRENT_USER],
    queryFn: AuthApi.getCurrentUser,
  });

  const {
    mutate: mutateLogout,
    isPending: isPendingLogout,
    isError: isErrorLogout,
  } = useMutation({
    mutationKey: [SHARED_QUERY_KEY.AUTH.LOGOUT],
    mutationFn: AuthApi.logout,
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: [SHARED_QUERY_KEY.AUTH.CURRENT_USER] });
    },
  });

  useEffect(() => {
    if (isErrorLogout) {
      console.error('Something went wrong');
    }
  }, [isErrorLogout]);

  return {
    user: currentUser,
    isPendingCurrentUser,
    isPendingLogout,
    logout: () => mutateLogout(),
  };
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a provider');
  }
  return context;
};
