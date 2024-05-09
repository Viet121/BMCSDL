import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentRoutingModule } from './student-routing.module';
import { StudentHomeComponent } from './student-home/student-home.component';
import { SidebarStudentComponent } from 'src/app/components/sidebar-student/sidebar-student.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { ShareModule } from 'src/app/components/share.module';
import { StudentClassComponent } from './student-class/student-class.component';
import { StudentScheduleComponent } from './student-schedule/student-schedule.component';
import { StudentPointComponent } from './student-point/student-point.component';
import { StudentRegisterComponent } from './student-register/student-register.component';
import { StudentUpdateComponent } from './student-update/student-update.component';
import { FormsModule } from '@angular/forms';
import { AddCmtComponent } from './add-cmt/add-cmt.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { ReadNotificationComponent } from './read-notification/read-notification.component';


@NgModule({
  declarations: [
    StudentHomeComponent,
    SidebarStudentComponent,
    StudentProfileComponent,
    StudentClassComponent,
    StudentScheduleComponent,
    StudentPointComponent,
    StudentRegisterComponent,
    StudentUpdateComponent,
    AddCmtComponent,
    ReadNotificationComponent,
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    ShareModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class StudentModule { }
