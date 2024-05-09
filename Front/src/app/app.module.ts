import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminModule } from './pages/admin/admin.module';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/logins/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgToastModule } from 'ng-angular-popup';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { StudentModule } from './pages/student/student.module';
import { TeacherModule } from './pages/teacher/teacher.module';
import { NavHeaderComponent } from './components/nav-header/nav-header.component';
import { ShareModule } from './components/share.module';
import { ChangePassComponent } from './pages/logins/change-pass/change-pass.component';
import { NotFoundComponent } from './pages/logins/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChangePassComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AdminModule,
    StudentModule,
    TeacherModule,
    ShareModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgToastModule
  ],
  providers: [
    DatePipe,
    TitleCasePipe,
    {provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptor,
      multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
