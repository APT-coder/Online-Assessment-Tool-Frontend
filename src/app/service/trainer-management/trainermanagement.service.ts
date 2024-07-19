import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Role } from '../../../models/role.interface';
import { Permission } from '../../../models/permission.interface';

interface ApiResponse {
  isSuccess: boolean;
  result: Role[];
  statusCode: number;
  message: string[];
}


@Injectable({
  providedIn: 'root'
})

export class TrainermanagementService {


    constructor(private http: HttpClient) { }

    getPermissions(): Observable<Permission[]> {
      return this.http.get<Permission[]>(`https://localhost:7095/api/Permission`);
    }

    getAllRoles(): Observable<Role[]> {
      return this.http.get<ApiResponse>(`https://localhost:7120/api/Roles/GetRoles`)
        .pipe(
          map(response => response.result)
        );
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
 