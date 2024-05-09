import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminStudentComponent } from './admin-student/admin-student.component';
import { CreateStudentComponent } from './create-student/create-student.component';
import { UpdateStudentComponent } from './update-student/update-student.component';
import { ReadStudentComponent } from './read-student/read-student.component';
import { AdminTeacherComponent } from './admin-teacher/admin-teacher.component';
import { CreateTeacherComponent } from './create-teacher/create-teacher.component';
import { ReadTeacherComponent } from './read-teacher/read-teacher.component';
import { UpdateTeacherComponent } from './update-teacher/update-teacher.component';
import { AdminSubjectComponent } from './admin-subject/admin-subject.component';
import { CreateSubjectComponent } from './create-subject/create-subject.component';
import { ReadSubjectComponent } from './read-subject/read-subject.component';
import { UpdateSubjectComponent } from './update-subject/update-subject.component';
import { AdminClassComponent } from './admin-class/admin-class.component';
import { ReadClassComponent } from './read-class/read-class.component';
import { CreateClassComponent } from './create-class/create-class.component';
import { UpdateClassComponent } from './update-class/update-class.component';
import { AdminAllowComponent } from './admin-allow/admin-allow.component';
import { authGuard } from 'src/app/guards/auth.guard';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AdminNotificationComponent } from './admin-notification/admin-notification.component';

const routes: Routes = [
  {path: 'admin-home', component: AdminHomeComponent, canActivate:[authGuard] },
  {path: 'admin-student', component: AdminStudentComponent,canActivate:[authGuard], data: { roles: ['admin'] }},
  {path: 'create-student',component: CreateStudentComponent, canActivate:[authGuard], data: { roles: ['admin'] } },
  {path: 'update-student/:maSV', component: UpdateStudentComponent, canActivate:[authGuard], data: { roles: ['admin'] } },
  {path: 'read-student/:maSV', component: ReadStudentComponent, canActivate:[authGuard], data: { roles: ['admin'] } },
  {path: 'admin-teacher', component: AdminTeacherComponent, canActivate:[authGuard], data: { roles: ['admin'] } },
  {path: 'create-teacher',component: CreateTeacherComponent, canActivate:[authGuard], data: { roles: ['admin'] } },
  {path: 'read-teacher/:maGV', component: ReadTeacherComponent, canActivate:[authGuard], data: { roles: ['admin'] } },
  {path: 'update-teacher/:maGV', component: UpdateTeacherComponent, canActivate:[authGuard], data: { roles: ['admin'] } },
  {path: 'admin-subject', component: AdminSubjectComponent, canActivate:[authGuard], data: { roles: ['admin'] } },
  {path: 'create-subject', component: CreateSubjectComponent, canActivate:[authGuard], data: { roles: ['admin'] } },
  {path: 'read-subject/:maMH', component: ReadSubjectComponent, canActivate:[authGuard], data: { roles: ['admin'] } },
  {path: 'update-subject/:maMH', component: UpdateSubjectComponent, canActivate:[authGuard], data: { roles: ['admin'] } },
  {path: 'admin-class', component: AdminClassComponent, canActivate:[authGuard], data: { roles: ['admin'] } },
  {path: 'read-class/:maLHP', component: ReadClassComponent, canActivate:[authGuard], data: { roles: ['admin'] } },
  {path: 'create-class', component: CreateClassComponent, canActivate:[authGuard], data: { roles: ['admin'] } },
  {path: 'update-class/:maLHP', component: UpdateClassComponent, canActivate:[authGuard], data: { roles: ['admin'] } },
  {path: 'admin-allow', component: AdminAllowComponent, canActivate:[authGuard], data: { roles: ['admin'] } },
  {path: 'admin-profile', component: AdminProfileComponent, canActivate:[authGuard], data: { roles: ['admin'] } },
  {path: 'admin-notification', component: AdminNotificationComponent, canActivate:[authGuard], data: { roles: ['admin'] } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
