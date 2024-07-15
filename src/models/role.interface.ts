import { Permission } from "./permission.interface";


  

export interface Role {
    roleId?: number;
    roleName: string;
    permissions: Permission[];
  }