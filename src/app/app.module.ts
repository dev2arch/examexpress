import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


// APP COMPONENTS IMPORTS

import { AppComponent } from './app.component';
import { QuizComponent } from './quiz/quiz.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './common/header.component';
import { FooterComponent } from './common/footer.component';
import { LoginComponent } from './login/login.component';
import { ContactusComponent } from './contactus/contactus.component';
import { CategoryComponent } from './category/category.component';
import { CourseCatComponent } from './category/course-cat.component';
import { MyProfileComponent } from './student-area/my-profile.component';
import { StudentAreaComponent } from './student-area/student-area.component';
import { StudentDashboardComponent } from './student-area/student-dashboard.component';
import { StudentProfileComponent } from './student-area/student-profile.component';
import { StudentExamsComponent } from './student-area/student-exams.component';

// APP SERVICES IMPORTS

import { AllTestService} from './services/all-test.service'
import { QuizService} from './services/quiz.service';
import { AuthService} from './services/auth.service';
import { AppRoutingModule } from './app.routing.module';
import { AuthGuardS } from './auth-guard.service';
import { AdminAreaComponent } from './admin-area/admin-area.component';
import { BannerComponent } from './common/banner.component';
import { TestflagService } from './quiz/testflag.service';
import { AdminNavComponent } from './admin-area/admin-nav.component';
import { PopularPipe } from './pipes/popular.pipe';
import { AllTestComponent } from './admin-area/all-test.component';
import { AddTestComponent } from './admin-area/add-test.component';
import { AddStudentComponent } from './admin-area/add-student.component';
import { AllStudentsComponent } from './admin-area/all-students.component';
import { AdminDashboardComponent } from './admin-area/admin-dashboard.component';
import {TestDataService} from "./services/test-data.service";
import { CourseSubcatComponent } from './category/course-subcat.component';
import {UploadQuestionImageService} from "./services/upload-question-image.service";
import { UploadImageComponent } from './upload-image/upload-image.component';


@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    ContactusComponent,
    CategoryComponent,
    CourseCatComponent,
    MyProfileComponent,
    StudentAreaComponent,
    StudentDashboardComponent,
    StudentProfileComponent,
    StudentExamsComponent,
    AdminAreaComponent,
    BannerComponent,
    AdminNavComponent,
    PopularPipe,
    AllTestComponent,
    AddTestComponent,
    AddStudentComponent,
    AllStudentsComponent,
    AdminDashboardComponent,
    CourseSubcatComponent,
    UploadImageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
    // routing
  ],
  providers: [
    AllTestService,
    QuizService,
    AuthService,
    AuthGuardS,
    TestflagService,
    TestDataService,
    UploadQuestionImageService
    // {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
