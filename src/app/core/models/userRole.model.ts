import { RoleModel } from "./role.model";
import { UserModel } from "./user.model";

export class UserRoleModel {
    id?: number;
    user?: UserModel;
    role?: RoleModel;
  }
