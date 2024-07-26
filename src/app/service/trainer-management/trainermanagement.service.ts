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
 

    constructor(private http: HttpClient) { }
    getPermissions(): Observable<ApiResponse<Permission[]>> {
      return this.http.get<ApiResponse<Permission[]>>(`https://localhost:7120/Permission/GetAllPermissions`);
    }
    getAllRoles(): Observable<ApiResponse<Role[]>> {
      return this.http.get<ApiResponse<Role[]>>(`https://localhost:7120/Roles/GetRoles`);
    }
    createRole(roleData: any): Observable<ApiResponse<Role>> {
      return this.http.post<ApiResponse<Role>>(`https://localhost:7120/Roles/PostRole`, roleData);
    }
 
 
    getRoleById(id: number): Observable<ApiResponse<Role>> {
      return this.http.get<ApiResponse<Role>>(`https://localhost:7120/Roles/GetRole/${id}`);
    }
  deleteRole(roleId: number): Observable<void> {
    return this.http.delete<void>(`https://localhost:7120/Roles/DeleteRole/${roleId}`);
  }

    updateRole(roleId: number, role: Role): Observable<Role> {
      return this.http.put<Role>(`https://localhost:7120/Roles/PutRole/${roleId}`, role);
   }
   createUser(userData: any): Observable<any> {
    return this.http.post<any>(`https://localhost:7120/User/CreateUser/CreateUser`, userData);
  }
  getBatches(): Observable<ApiResponse<Batch[]>> {
    return this.http.get<ApiResponse<Batch[]>>(`https://localhost:7120/Batch/GetBatches`);
  }
  getUsersByRoleName(roleName: string): Observable<any> {
    return this.http.get<any>(`https://localhost:7120/User/GetUsersByRoleName/byRole/${roleName}`);
  }
  deleteUser(id: number): Observable<void> {
    const url = `https://localhost:7120/User/DeleteUser/${id}`;
    return this.http.delete<void>(url);
  }
  updateUser(updateUserRequest: any): Observable<any> {
    return this.http.put<any>(`https://localhost:7120/User/UpdateUser/update`, updateUserRequest);
  }

 
  // getTrainerDetails(userId: number): Observable<any> {
  //   return this.http.get<any>(`https://localhost:7120/User/GetTrainerDetails/trainer/${userId}`);
  // }
 
  // getTraineeDetails(userId: number): Observable<any> {
  //   return this.http.get<any>(`https://localhost:7120/User/GetTraineeDetails/trainee/${userId}`);
  // }
}