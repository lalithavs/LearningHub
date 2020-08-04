import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';

import { SearchResultComponent } from './dashboards/admin/search-result/search-result.component';
import { TeacherHomeComponent } from './dashboards/teacher/teacher-home/teacher-home.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
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
import { StudentHomeComponent } from './dashboards/student/student-home/student-home.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'teacher',
    component: TeacherComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: TeacherHomeComponent,
      },
      {
        path: 'createSchedule',
        component: NewScheduleComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'addNotes',
        component: AddNotesComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'viewNotes',
        component: NotesComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'edit/:postId',
        component: AddNotesComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'viewSchedule',
        component: ScheduleComponent,
        canActivateChild: [AuthGuard],
      },
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: AdminHomeComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'studentForm',
        component: ApplicationFormComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'teacherForm',
        component: TeacherFormComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'search',
        component: SearchFormComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'user',
        component: SearchResultComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'updateTeacher/:id',
        component: TeacherFormComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'updateStudent/:id',
        component: ApplicationFormComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'student',
    component: StudentComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: StudentHomeComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'viewSchedule',
        component: ScheduleComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'viewNotes',
        component: NotesComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
