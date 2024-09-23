import { Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { RouteGuard } from './guard/route/route.guard';
import { AuthComponent } from './guard/auth/auth.component'; 
import { LoginComponent } from './pages/login/login.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { TrainerDashboardComponent } from './pages/trainer-dashboard/trainer-dashboard.component';
import { TraineeDashboardComponent } from './pages/trainee-dashboard/trainee-dashboard.component';
import { CreateTestComponent } from './pages/create-test/create-test.component';
import { TrainerManagementComponent } from './pages/trainer-management/trainer-management.component';
import { TestPageComponent } from './pages/test-page/test-page.component';
import { InstructionPageComponent } from './pages/instruction-page/instruction-page.component';
import { AssessmentPerformanceComponent } from './pages/assessment-performance/assessment-performance.component';
import { AssessmentEvaluateComponent } from './pages/assessment-evaluate/assessment-evaluate.component';
import { IlpIntegrationTraineeattendtestComponent } from './pages/ilp-integration-traineeattendtest/ilp-integration-traineeattendtest.component';
import { NotFoundComponent } from './components/error/404-not-found/not-found.component';
import { PermissionsGuard } from './guard/route/permissions.guard';
import { AccessDeniedComponent } from './components/error/403-access-denied/access-denied.component';
import { InternalServerErrorComponent } from './components/error/500-internal-server-error/internal-server-error/internal-server-error.component'; 
import { QuestionBankComponent } from './pages/question-bank/question-bank.component';
import { AssessmentPreviewComponent } from './pages/create-test/components/assessment-preview/assessment-preview.component'; 
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';
import { AuthGuard } from './guard/auth/auth.guard';

export const routes: Routes = [
    {
        path: '', component: LoginComponent
    },
    {
        path: 'auth', component: AuthComponent, canActivate: [AuthGuard]
    },
    {
        path: 'app',
        component: AppLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'trainer', 
                component: TrainerDashboardComponent, 
                canActivate: [RouteGuard],
                data: { expectedRole: [1] }
            },
            {
                path: 'admin', 
                component: AdminDashboardComponent, 
                canActivate: [RouteGuard],
                data: { expectedRole: [0] }
            },
            {
                path: 'trainee', 
                component: TraineeDashboardComponent, 
                canActivate: [RouteGuard],
                data: { expectedRole: [2] }
            },
            {
                path: 'create-test', 
                component: CreateTestComponent, 
                canActivate: [RouteGuard, PermissionsGuard],
                data: { expectedRole: [0, 1], expectedPermission: 'CREATE_ASSESSMENT' }
            },
            {
                path: 'assessment-preview', 
                component: AssessmentPreviewComponent, 
                canActivate: [RouteGuard, PermissionsGuard],
                data: { expectedRole: [0, 1], expectedPermission: 'CREATE_ASSESSMENT' }  // Trainer and Admin can access this route
            },
            {
                path: 'evaluate/:scheduledAssessmentId', 
                component: AssessmentEvaluateComponent, 
                canActivate: [RouteGuard, PermissionsGuard],
                data: { expectedRole: [0, 1], expectedPermission: 'EVALUATE_TEST' }
            },
            {
                path: 'user-management', 
                component: TrainerManagementComponent, 
                canActivate: [RouteGuard, PermissionsGuard],
                data: { expectedRole: [0], expectedPermission: 'TRAINER_MANAGEMENT' || 'ROLE_MANAGEMENT' }
            },
            {
                path: 'performance/:scheduledAssessmentId', 
                component: AssessmentPerformanceComponent, 
                canActivate: [RouteGuard],
                data: { expectedRole: [0, 1], expectedPermission: 'VIEW_PERFORMANCE_DETAILS' }
            },
            {
                path: 'question-bank', 
                component: QuestionBankComponent, 
                canActivate: [RouteGuard],
                data: { expectedRole: [0, 1], expectedPermission: 'CREATE_ASSESSMENT' }
            }        
        ]
    },
    {
        path: 'test/:id', 
        component: TestPageComponent, 
        canActivate: [MsalGuard, RouteGuard],
        data: { expectedRole: [2] }
    },
    {
        path: 'tests/:id/:token', 
        component: IlpIntegrationTraineeattendtestComponent, 
        canActivate: [MsalGuard, RouteGuard],
        data: { expectedRole: [2] }
    },
    { 
        path: 'instructions/:id', 
        component: InstructionPageComponent, 
        canActivate: [MsalGuard, RouteGuard],
        data: { expectedRole: [2] }
    },
    {
        path: 'server-error', component: InternalServerErrorComponent
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

