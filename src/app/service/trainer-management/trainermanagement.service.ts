import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { Role } from '../../../models/role.interface';
import { Permission } from '../../../models/permission.interface';
import { User } from '../../../models/user.interface';
 
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

    userApiUrl = `https://localhost:7120/User`;
    roleApiUrl = `https://localhost:7120/Roles`;
    permissionApiUrl = `https://localhost:7120/Permission`;
    batchApiUrl =  `https://localhost:7120/Batch`;

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
      return this.http.get<any>(`${this.userApiUrl}/GetUsersByRoleName/byRole/${roleName}`);
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
    // getTrainerDetails(userId: number): Observable<any> {
    //   return this.http.get<any>(`https://localhost:7120/User/GetTrainerDetails/trainer/${userId}`);
    // }
  
    // getTraineeDetails(userId: number): Observable<any> {
    //   return this.http.get<any>(`https://localhost:7120/User/GetTraineeDetails/trainee/${userId}`);
    // }
}