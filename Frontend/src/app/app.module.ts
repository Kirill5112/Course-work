import {forwardRef, NgModule, Provider} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { EditProjectComponent } from './pages/edit-project/edit-project.component';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TaskCardComponent } from './components/task-card/task-card.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import {HttpTokenInterceptor} from "./interceptor/http-token.interceptor";
import { EditTaskComponent } from './pages/edit-task/edit-task/edit-task.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TeamListComponent } from './pages/team-list/team-list.component';
import { EditTeamComponent } from './pages/edit-team/edit-team.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { TeamUsersListComponent } from './pages/team-users-list/team-users-list.component';
import { StrangerProfileComponent } from './pages/stranger-profile/stranger-profile.component';
import { MyTasksComponent } from './pages/my-tasks/my-tasks.component';
import { CommentsComponent } from './pages/comments/comments.component';

export const HTTP_TOKEN_INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useExisting: forwardRef(() => HttpTokenInterceptor),
  multi: true
};

@NgModule({
  declarations: [
    AppComponent,
    ProjectListComponent,
    EditProjectComponent,
    TaskListComponent,
    ProjectCardComponent,
    TaskCardComponent,
    RegisterComponent,
    LoginComponent,
    EditTaskComponent,
    TeamListComponent,
    EditTeamComponent,
    UserProfileComponent,
    TeamUsersListComponent,
    StrangerProfileComponent,
    MyTasksComponent,
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    HttpClient,
    HttpTokenInterceptor,
    HTTP_TOKEN_INTERCEPTOR_PROVIDER
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
