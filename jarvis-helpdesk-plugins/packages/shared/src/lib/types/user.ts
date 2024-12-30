import { UserRole } from '../constants/role';

export type User = {
  id: string;
  username: string;
  email: string;
  roles: UserRole[];
};
