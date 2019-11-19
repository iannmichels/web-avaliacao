import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobComponent } from './job/view/job.component';
import { JobFormComponent } from './job/form/job.form.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './login/auth.guard';

const routes: Routes = [
  {
    path: 'pessoas',
    component: JobComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'pessoas/new',
    component: JobFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'pessoas/:id/edit',
    component: JobFormComponent,
    canActivate: [AuthGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
export const routingComponentes = [LoginComponent, JobComponent, JobFormComponent];
