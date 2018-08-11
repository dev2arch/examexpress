import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {QuizComponent} from './quiz/quiz.component';
import {ContactusComponent} from './contactus/contactus.component';
import {StudentDashboardComponent} from './student-area/student-dashboard.component';
import {StudentExamsComponent} from './student-area/student-exams.component';
import {CourseCatComponent} from './category/course-cat.component';
import {HomeComponent} from './home/home.component';
import {MyProfileComponent} from './student-area/my-profile.component';
import {StudentAreaComponent} from './student-area/student-area.component';
import {AuthGuardS} from './auth-guard.service';
import {AdminAreaComponent} from './admin-area/admin-area.component';
import {assetUrl} from '@angular/compiler/src/identifiers';
import {AllTestComponent} from './admin-area/all-test.component';
import {AddTestComponent} from './admin-area/add-test.component';
import {AllStudentsComponent} from './admin-area/all-students.component';
import {AddStudentComponent} from './admin-area/add-student.component';
import {AdminDashboardComponent} from './admin-area/admin-dashboard.component';


const appRoutes: Routes = [
  { path: 'test', component: QuizComponent, canActivate: [AuthGuardS] },
  { path: 'home', component: HomeComponent },
  { path: 'student-area', component: StudentAreaComponent, canActivate: [AuthGuardS], children: [
      {path: '', component: StudentDashboardComponent},
      { path: 'profile', component: MyProfileComponent },
      { path: 'dashboard', component: StudentDashboardComponent },
      { path: 'tests', component: StudentExamsComponent },
    ]},
  { path: 'admin-area', component: AdminAreaComponent, canActivate: [AuthGuardS]
    , children: [
      {path: '', component: AdminDashboardComponent},
      { path: 'all-tests', component: AllTestComponent },
      { path: 'add-test', component: AddTestComponent },
      { path: 'all-students', component: AllStudentsComponent },
      { path: 'add-student', component: AddStudentComponent },
    ]
  },
  { path: 'contact-us', component: ContactusComponent },
  { path: 'cat/:cat', component: CourseCatComponent },
  { path: '**', redirectTo: 'home' }

]
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
