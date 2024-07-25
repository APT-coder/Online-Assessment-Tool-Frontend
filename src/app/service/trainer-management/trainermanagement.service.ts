import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { Role } from '../../../models/role.interface';
import { Permission } from '../../../models/permission.interface';
import { User } from '../../../models/user.interface';
import { ApiEndpointService } from '../api-service/api-endpoint.service';

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

 
    constructor(private http: HttpClient, private apiEndpointService: ApiEndpointService) { }
  
    getPermissions(): Observable<ApiResponse<Permission[]>> {
      const url = this.apiEndpointService.getEndpoint('permissions', 'getAll');
      return this.http.get<ApiResponse<Permission[]>>(url);
    }
  
    getAllRoles(): Observable<ApiResponse<Role[]>> {
      const url = this.apiEndpointService.getEndpoint('roles', 'getAll');
      return this.http.get<ApiResponse<Role[]>>(url);
    }
  
    createRole(roleData: any): Observable<ApiResponse<Role>> {
      const url = this.apiEndpointService.getEndpoint('roles', 'create');
      return this.http.post<ApiResponse<Role>>(url, roleData);
    }

    getRoleById(id: number): Observable<ApiResponse<Role>> {
      const url = this.apiEndpointService.getEndpoint('roles', 'getById', {id: id});
      return this.http.get<ApiResponse<Role>>(url);
    }
  
    deleteRole(roleId: number): Observable<void> {
      const url = this.apiEndpointService.getEndpoint('roles', 'delete', {roleId: roleId});
      return this.http.delete<void>(url);
    }
  
    updateRole(roleId: number, role: Role): Observable<Role> {
      const url = this.apiEndpointService.getEndpoint('roles', 'update', {roleId: roleId});
      return this.http.put<Role>(url, role);
    }

    createUser(userData: any): Observable<any> {
      const url = this.apiEndpointService.getEndpoint('users', 'create');
      return this.http.post<any>(url, userData);
    }

    getBatches(): Observable<ApiResponse<Batch[]>> {
      const url = this.apiEndpointService.getEndpoint('batches', 'getAll');
      return this.http.get<ApiResponse<Batch[]>>(url);
    }

    getUsersByRoleName(roleName: string): Observable<any> {
      const url = this.apiEndpointService.getEndpoint('users', 'getByRoleName', {roleName: roleName});
      return this.http.get<any>(url);
    }

    deleteUser(id: number): Observable<void> {
      const url = this.apiEndpointService.getEndpoint('users', 'delete', {id: id});
      return this.http.delete<void>(url);
    }

    updateUser(updateUserRequest: any): Observable<any> {
      const url = this.apiEndpointService.getEndpoint('users', 'update');
      return this.http.put<any>(url, updateUserRequest);
    }
  
    getTrainerDetails(userId: number): Observable<any> {
      const url = this.apiEndpointService.getEndpoint('trainer', 'getDetails', {userId: userId});
      return this.http.get<any>(url);
    }

    getTraineeDetails(userId: number): Observable<any> {
      const url = this.apiEndpointService.getEndpoint('trainee', 'getDetails', {userId: userId});
      return this.http.get<any>(url);
    }
}
  
  
  
