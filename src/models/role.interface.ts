import { Permission } from "./permission.interface";
import { User } from "./user.interface";


  

export interface Role {
    id: number;
    roleName: string;
    permissions: Permission[];
    users?:User[];
  }