import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/logins/login/login.component';
import { ChangePassComponent } from './pages/logins/change-pass/change-pass.component';
import { NotFoundComponent } from './pages/logins/not-found/not-found.component';

const routes: Routes = [
  {path: '',pathMatch: 'full',redirectTo: 'login'}, 
  {path: 'login', component: LoginComponent},
  {path: 'change-pass', component: ChangePassComponent},
  {path: 'not-found', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
