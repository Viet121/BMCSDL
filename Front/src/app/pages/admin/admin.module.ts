import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminTeacherComponent } from './admin-teacher/admin-teacher.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminStudentComponent } from './admin-student/admin-student.component';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { CreateStudentComponent } from './create-student/create-student.component';
import { UpdateStudentComponent } from './update-student/update-student.component';
import { FormsModule } from '@angular/forms';
import { ReadStudentComponent } from './read-student/read-student.component';
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
import { ShareModule } from 'src/app/components/share.module';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminNotificationComponent } from './admin-notification/admin-notification.component';
import { AddNotificationComponent } from './add-notification/add-notification.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateNotificationComponent } from './update-notification/update-notification.component';

@NgModule({
  declarations: [
    AdminHomeComponent,
    AdminStudentComponent,
    AdminTeacherComponent,
    SidebarComponent,
    CreateStudentComponent,
    UpdateStudentComponent,
    ReadStudentComponent,
    CreateTeacherComponent,
    ReadTeacherComponent,
    UpdateTeacherComponent,
    AdminSubjectComponent,
    CreateSubjectComponent,
    ReadSubjectComponent,
    UpdateSubjectComponent,
    AdminClassComponent,
    ReadClassComponent,
    CreateClassComponent,
    UpdateClassComponent,
    AdminAllowComponent,
    AdminProfileComponent,
    AdminNotificationComponent,
    AddNotificationComponent,
    UpdateNotificationComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule, 
    HttpClientModule,
    FormsModule, 
    ShareModule,
    NgxPaginationModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class AdminModule {
  
 }
