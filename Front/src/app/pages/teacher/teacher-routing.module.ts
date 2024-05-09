import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherHomeComponent } from './teacher-home/teacher-home.component';
import { TeacherClassComponent } from './teacher-class/teacher-class.component';
import { TeacherScheduleComponent } from './teacher-schedule/teacher-schedule.component';
import { ReadClassgvComponent } from './read-classgv/read-classgv.component';
import { TeacherProfileComponent } from './teacher-profile/teacher-profile.component';
import { TeacherUpdateComponent } from './teacher-update/teacher-update.component';
import { ReadCmtComponent } from './read-cmt/read-cmt.component';
import { authGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {path: 'teacher-home', component: TeacherHomeComponent, canActivate:[authGuard] },
  {path: 'teacher-class', component: TeacherClassComponent, canActivate:[authGuard], data: { roles: ['teacher'] } },
  {path: 'teacher-schedule', component: TeacherScheduleComponent, canActivate:[authGuard], data: { roles: ['teacher'] } },
  {path: 'read-classgv/:maLHP', component: ReadClassgvComponent, canActivate:[authGuard], data: { roles: ['teacher'] } },
  {path: 'teacher-profile', component: TeacherProfileComponent, canActivate:[authGuard], data: { roles: ['teacher'] } },
  {path: 'teacher-update', component: TeacherUpdateComponent, canActivate:[authGuard], data: { roles: ['teacher'] } },
  {path: 'read-cmt/:maLHP', component: ReadCmtComponent, canActivate:[authGuard], data: { roles: ['teacher'] } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
