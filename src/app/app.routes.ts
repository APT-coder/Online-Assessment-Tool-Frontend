import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AssessmentComponent } from './pages/assessment/upload-assessment.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CreateTestComponent } from './pages/create-test/create-test.component';
import { TrainerManagementComponent } from './pages/trainer-management/trainer-management.component';
import { TestPageComponent } from './pages/test-page/test-page.component';
import { TrainerDashboardComponent } from './pages/trainer-dashboard/trainer-dashboard.component';

export const routes: Routes = [
    {
        path: '', component: LoginComponent
    },
    {
        path: 'test', component: TestPageComponent
    },
    {
        path: 'sidebar', component: SidebarComponent
    },
    {
        path: 'trainer', component: TrainerDashboardComponent
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
        path: '**', component: NotFoundComponent
    }
];
