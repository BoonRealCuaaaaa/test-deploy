import { UserRole } from '../constants/roles';

export class CurrentUserDto {
  id: string;
  email: string;
  username: string;
  roles: UserRole[];
}
