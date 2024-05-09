import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherHomeComponent } from './teacher-home/teacher-home.component';
import { SidebarTeacherComponent } from 'src/app/components/sidebar-teacher/sidebar-teacher.component';
import { ShareModule } from 'src/app/components/share.module';
import { TeacherClassComponent } from './teacher-class/teacher-class.component';
import { TeacherScheduleComponent } from './teacher-schedule/teacher-schedule.component';
import { ReadClassgvComponent } from './read-classgv/read-classgv.component';
import { FormsModule } from '@angular/forms';
import { TeacherProfileComponent } from './teacher-profile/teacher-profile.component';
import { TeacherUpdateComponent } from './teacher-update/teacher-update.component';
import { NgChartsModule } from 'ng2-charts';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReadCmtComponent } from './read-cmt/read-cmt.component';


@NgModule({
  declarations: [
    TeacherHomeComponent,
    SidebarTeacherComponent,
    TeacherClassComponent,
    TeacherScheduleComponent,
    ReadClassgvComponent,
    TeacherProfileComponent,
    TeacherUpdateComponent,
    ReadCmtComponent,
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    ShareModule,
    FormsModule,
    NgChartsModule,
    NgxPaginationModule,
  ]
})
export class TeacherModule { }
