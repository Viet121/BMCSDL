import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentHomeComponent } from './student-home/student-home.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { StudentPointComponent } from './student-point/student-point.component';
import { StudentClassComponent } from './student-class/student-class.component';
import { StudentScheduleComponent } from './student-schedule/student-schedule.component';
import { StudentRegisterComponent } from './student-register/student-register.component';
import { StudentUpdateComponent } from './student-update/student-update.component';
import { ReadNotificationComponent } from './read-notification/read-notification.component';
import { authGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {path: 'student-home', component: StudentHomeComponent, canActivate:[authGuard] },
  {path: 'student-profile', component: StudentProfileComponent, canActivate:[authGuard], data: { roles: ['student'] } },
  {path: 'student-point', component: StudentPointComponent, canActivate:[authGuard], data: { roles: ['student'] } },
  {path: 'student-class', component: StudentClassComponent, canActivate:[authGuard], data: { roles: ['student'] } },
  {path: 'student-schedule', component: StudentScheduleComponent, canActivate:[authGuard], data: { roles: ['student'] } },
  {path: 'student-register', component: StudentRegisterComponent, canActivate:[authGuard], data: { roles: ['student'] } },
  {path: 'student-update', component: StudentUpdateComponent, canActivate:[authGuard], data: { roles: ['student'] } },
  {path: 'read-notification', component: ReadNotificationComponent, canActivate:[authGuard], data: { roles: ['student'] } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
