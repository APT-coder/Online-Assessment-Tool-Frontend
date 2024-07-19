import { Permission } from "./permission.interface";


  

export interface Role {
    id: number;
    roleName: string;
    permissions: Permission[];
  }