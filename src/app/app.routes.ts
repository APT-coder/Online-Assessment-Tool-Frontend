import { Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { RouteGuard } from './guard/route/route.guard';
import { AuthComponent } from './guard/auth/auth.component'; 
import { LoginComponent } from './pages/login/login.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { TrainerDashboardComponent } from './pages/trainer-dashboard/trainer-dashboard.component';
import { TraineeDashboardComponent } from './pages/trainee-dashboard/trainee-dashboard.component';
import { AssessmentComponent } from './pages/assessment/upload-assessment.component';
import { CreateTestComponent } from './pages/create-test/create-test.component';
import { TrainerManagementComponent } from './pages/trainer-management/trainer-management.component';
import { TestPageComponent } from './pages/test-page/test-page.component';
import { InstructionPageComponent } from './pages/instruction-page/instruction-page.component';
import { AssessmentPerformanceComponent } from './pages/assessment/components/assessment-performance/assessment-performance.component';
import { AssessmentEvaluateComponent } from './pages/assessment/components/assessment-evaluate/assessment-evaluate.component';
import { IlpIntegrationTraineeattendtestComponent } from './pages/ilp-integration-traineeattendtest/ilp-integration-traineeattendtest.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PermissionsGuard } from './guard/route/permissions.guard';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';

export const routes: Routes = [
    {
        path: '', component: LoginComponent
    },
    {
        path: 'auth', component: AuthComponent, canActivate: [MsalGuard],
    },
    {
        path: 'trainer', 
        component: TrainerDashboardComponent, 
        canActivate: [MsalGuard, RouteGuard],
        data: { expectedRole: 1 }
    },
    {
        path: 'admin', 
        component: AdminDashboardComponent, 
        canActivate: [MsalGuard, RouteGuard],
        data: { expectedRole: 0 }
    },
    {
        path: 'trainee', 
        component: TraineeDashboardComponent, 
        canActivate: [MsalGuard, RouteGuard],
        data: { expectedRole: 2 }
    },
    {
        path: 'upload-assessment', 
        component: AssessmentComponent, 
        canActivate: [MsalGuard, RouteGuard, PermissionsGuard],
        data: { expectedRole: 1, expectedPermission: 'UPLOAD_QUESTION' }  // Trainer and Admin can access this route
    },
    {
        path: 'create-test', 
        component: CreateTestComponent, 
        canActivate: [MsalGuard, RouteGuard, PermissionsGuard],
        data: { expectedRole: 1, expectedPermission: 'CREATE_ASSESSMENT' }  // Trainer and Admin can access this route
    },
    {
        path: 'evaluate/:scheduledAssessmentId', 
        component: AssessmentEvaluateComponent, 
        canActivate: [MsalGuard, RouteGuard, PermissionsGuard],
        data: { expectedRole: 1, expectedPermission: 'EVALUATE_TEST' }  // Trainer and Admin can access this route
    },
    {
        path: 'user-management', 
        component: TrainerManagementComponent, 
        canActivate: [MsalGuard, RouteGuard, PermissionsGuard],
        data: { expectedRole: 0, expectedPermission: 'TRAINER_MANAGEMENT' || 'ROLE_MANAGEMENT' }  // Only Admin can access this route
    },
    {
        path: 'performance/:scheduledAssessmentId', 
        component: AssessmentPerformanceComponent, 
        canActivate: [MsalGuard, RouteGuard],
        data: { expectedRole: 1, expectedPermission: 'VIEW_PERFORMANCE_DETAILS' }  // Trainer and Admin can access this route
    },
    {
        path: 'test/:id', 
        component: TestPageComponent, 
        canActivate: [MsalGuard, RouteGuard],
        data: { expectedRole: 2 }  // Only Trainee can access this route
    },
    {
        path: 'tests/:id/:token', 
        component: IlpIntegrationTraineeattendtestComponent, 
        canActivate: [MsalGuard, RouteGuard],
        data: { expectedRole: 2 }  // Only Trainee can access this route
    },
    { 
        path: 'instructions/:id', 
        component: InstructionPageComponent, 
        canActivate: [MsalGuard, RouteGuard],
        data: { expectedRole: 2 }  // Only Trainee can access this route
    },
    {
        path: 'access-denied', component: AccessDeniedComponent
    },
    {
        path: 'not-found', component: NotFoundComponent
    },
    {
        path: '**', component: NotFoundComponent
    }
];

