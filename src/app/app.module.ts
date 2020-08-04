import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { NavigationComponent } from './navigation/navigation.component';
import { AdminComponent } from './dashboards/admin/admin.component';
import { TeacherFormComponent } from './dashboards/admin/teacher-form/teacher-form.component';
import { ApplicationFormComponent } from './dashboards/admin/application-form/application-form.component';

import { SearchFormComponent } from './dashboards/admin/search-form/search-form.component';
import { AdminHomeComponent } from './dashboards/admin/admin-home/admin-home.component';
import { TeacherComponent } from './dashboards/teacher/teacher.component';
import { NewScheduleComponent } from './dashboards/teacher/new-schedule/new-schedule.component';
import { AddNotesComponent } from './dashboards/teacher/add-notes/add-notes.component';
import { StudentComponent } from './dashboards/student/student.component';
import { ScheduleComponent } from './dashboards/student/schedule/schedule.component';
import { NotesComponent } from './dashboards/student/notes/notes.component';
import { SearchResultComponent } from './dashboards/admin/search-result/search-result.component';
import { TeacherHomeComponent } from './dashboards/teacher/teacher-home/teacher-home.component';
import { StudentHomeComponent } from './dashboards/student/student-home/student-home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NavigationComponent,
    AdminComponent,
    TeacherFormComponent,
    ApplicationFormComponent,
    SearchFormComponent,
    AdminHomeComponent,
    TeacherComponent,
    NewScheduleComponent,
    AddNotesComponent,
    StudentComponent,
    ScheduleComponent,
    NotesComponent,
    SearchResultComponent,
    TeacherHomeComponent,
    StudentHomeComponent,
  ],
  imports: [
    BrowserModule,
    LayoutModule,
    AppRoutingModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
