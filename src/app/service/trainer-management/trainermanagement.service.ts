import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap, throwError } from 'rxjs';
import { Role } from '../../shared/models/role.interface';
import { Permission } from '../../shared/models/permission.interface';
import { User } from '../../shared/models/user.interface';
import { apiUrl } from '../../shared/constants/apiUrl';

export interface ApiResponse<T> {
  isSuccess: boolean;
  result: T;
  statusCode: number;
  message: string[];
}
export interface Batch {
  batchid: number;
  batchname: string;
}
 
 
@Injectable({
  providedIn: 'root'
})
 
export class TrainermanagementService {

    userApiUrl = `${apiUrl}/api/User`;
    roleApiUrl = `${apiUrl}/api/Roles`;
    permissionApiUrl = `${apiUrl}/api/Permission`;
    batchApiUrl =  `${apiUrl}/api/Batch`;

    constructor(private http: HttpClient) { }

    getPermissions(): Observable<ApiResponse<Permission[]>> {
      return this.http.get<ApiResponse<Permission[]>>(`${this.permissionApiUrl}/GetAllPermissions`);
    }

    getAllRoles(): Observable<ApiResponse<Role[]>> {
      return this.http.get<ApiResponse<Role[]>>(`${this.roleApiUrl}/GetRoles`);
    }

    createRole(roleData: any): Observable<ApiResponse<Role>> {
      return this.http.post<ApiResponse<Role>>(`${this.roleApiUrl}/PostRole`, roleData);
    }
 
    getRoleById(id: number): Observable<ApiResponse<Role>> {
      return this.http.get<ApiResponse<Role>>(`${this.roleApiUrl}/GetRole/${id}`);
    }

    deleteRole(roleId: number): Observable<void> {
      return this.http.delete<void>(`${this.roleApiUrl}/DeleteRole/${roleId}`);
    }

    updateRole(roleId: number, role: Role): Observable<Role> {
      return this.http.put<Role>(`${this.roleApiUrl}/PutRole/${roleId}`, role);
    }

    createUser(userData: any): Observable<any> {
      return this.http.post<any>(`${this.userApiUrl}/CreateUser/CreateUser`, userData);
    }

    getUsersByRoleName(roleName: string): Observable<any> {
      return this.http.get<any>(`${this.userApiUrl}/GetUsersByRoleName/byRole/${roleName}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {        
            console.error('Resource not found');
            return of([]);
        })
      );
    }

    updateUser(updateUserRequest: any): Observable<any> {
      return this.http.put<any>(`${this.userApiUrl}/UpdateUser/update`, updateUserRequest);
    }

    deleteUser(id: number): Observable<void> {
      const url = `${this.userApiUrl}/DeleteUser/${id}`;
      return this.http.delete<void>(url);
    }

    getBatches(): Observable<ApiResponse<Batch[]>> {
      return this.http.get<ApiResponse<Batch[]>>(`${this.batchApiUrl}/GetBatches`);
    }
}