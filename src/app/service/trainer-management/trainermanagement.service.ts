import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../../../models/role.interface';
import { Permission } from '../../../models/permission.interface';


@Injectable({
  providedIn: 'root'
})
export class TrainermanagementService {

 
    constructor(private http: HttpClient) { }
  
    getPermissions(): Observable<Permission[]> {
      return this.http.get<Permission[]>(`https://localhost:7095/api/Permission`);
    }
  
    getAllRoles(): Observable<Role[]> {
      return this.http.get<Role[]>(`https://localhost:7095/api/Roles`);
    }
  
    createRoleWithPermissions(role: Role): Observable<Role> {
      return this.http.post<Role>(`https://localhost:7095/api/Roles`, role);
    }
  
    deleteRole(roleId: number): Observable<void> {
      return this.http.delete<void>(`https://localhost:7095/api/Roles/${roleId}`);
    }
  
    updateRole(roleId: number, role: Role): Observable<Role> {
      return this.http.put<Role>(`https://localhost:7095/api/Roles/${roleId}`, role);
    }
  }
  

