import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AssessmentComponent } from './pages/assessment/upload-assessment.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CreateTestComponent } from './pages/create-test/create-test.component';
import { TrainerManagementComponent } from './pages/trainer-management/trainer-management.component';
import { TestPageComponent } from './pages/test-page/test-page.component';
import { InstructionPageComponent } from './pages/instruction-page/instruction-page.component';
import { TrainerDashboardComponent } from './pages/trainer-dashboard/trainer-dashboard.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { MsalGuard } from '@azure/msal-angular';
import { AuthComponent } from './components/auth/auth.component';
import { AssessmentPerformanceComponent } from './pages/assessment/components/assessment-performance/assessment-performance.component';
import { TraineeDashboardComponent } from './pages/trainee-dashboard/trainee-dashboard.component';

export const routes: Routes = [
    {
        path: '', component: LoginComponent
    },
    {
        path: 'auth', component: AuthComponent, canActivate: [MsalGuard],
    },
    {
        path: 'sidebar', component: SidebarComponent, canActivate: [MsalGuard],
    },
    {
        path: 'trainer', component: TrainerDashboardComponent, canActivate: [MsalGuard],
    },
    {
        path: 'admin', component: AdminDashboardComponent, canActivate: [MsalGuard],
    },
    {
        path: 'test/:id', component: TestPageComponent
    },
    { path: 'instructions/:id', component:  InstructionPageComponent   
    },
    {
         path: 'trainee', component: TraineeDashboardComponent  
    },
    {
        path: 'upload-assessment', component: AssessmentComponent
    },
    {
        path: 'create-test', component: CreateTestComponent
    },
    {
        path: 'trainer-management', component: TrainerManagementComponent
    },
    {
        path: 'performance/:id', component:AssessmentPerformanceComponent
    },
    {
        path: '**', component: NotFoundComponent
    }

];
