export class UserModel {
  id?: string;
  firstname?: string;
  lastname?: string;
  username?: string;
  email?: string;
  // password?: string; // Excluded for security reasons
  authorities?: Array<String>;
  isAccountNonExpired?: boolean = true;
  accountNonLocked?: boolean = true;
  credentialsNonExpired?: boolean = true;
  enabled?: boolean = true;
  status?: string;

}
