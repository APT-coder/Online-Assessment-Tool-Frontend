import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AssessmentComponent } from './pages/assessment/assessment.component';

export const routes: Routes = [
    {
        path: '', component: LoginComponent
    },
    {
        path: 'assessment', component: AssessmentComponent
    },
    {
        path: '**', component: NotFoundComponent
    }
];
