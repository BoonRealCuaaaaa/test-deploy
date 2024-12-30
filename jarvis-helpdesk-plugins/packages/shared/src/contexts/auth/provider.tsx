import { PropsWithChildren } from 'react';

import { AuthContext, useAuthProvider } from './context';

const AuthProvider = (props: PropsWithChildren) => {
  const { children } = props;
  const auth = useAuthProvider();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
