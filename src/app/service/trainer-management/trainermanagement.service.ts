import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api-service/api.service'; 
import { Role } from '../../../models/role.interface';
import { Permission } from '../../../models/permission.interface';

@Injectable({
  providedIn: 'root'
})
export class TrainermanagementService {

  constructor(private apiService: ApiService) { }

  getPermissions(): Observable<Permission[]> {
    return this.apiService.get<Permission[]>('permissions', 'getAll');
  }

  getAllRoles(): Observable<Role[]> {
    return this.apiService.get<Role[]>('roles', 'getAll');
  }

  createRoleWithPermissions(role: Role): Observable<Role> {
    return this.apiService.post<Role>('roles', 'create', role);
  }

  deleteRole(roleId: number): Observable<void> {
    return this.apiService.delete<void>('roles', 'delete', { id: roleId });
  }

  updateRole(roleId: number, role: Role): Observable<Role> {
    return this.apiService.put<Role>('roles', 'update', role, { id: roleId });
  }
}
