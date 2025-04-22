import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProjectListComponent} from "./pages/project-list/project-list.component";
import {EditProjectComponent} from "./pages/edit-project/edit-project.component";
import {TaskListComponent} from "./pages/task-list/task-list.component";
import {RegisterComponent} from "./pages/register/register.component";
import {LoginComponent} from "./pages/login/login.component";
import {EditTaskComponent} from "./pages/edit-task/edit-task/edit-task.component";
import {TeamListComponent} from "./pages/team-list/team-list.component";
import {EditTeamComponent} from "./pages/edit-team/edit-team.component";
import {UserProfileComponent} from "./pages/user-profile/user-profile.component";
import {TeamUsersListComponent} from "./pages/team-users-list/team-users-list.component";
import {StrangerProfileComponent} from "./pages/stranger-profile/stranger-profile.component";
import {MyTasksComponent} from "./pages/my-tasks/my-tasks.component";
import {CommentsComponent} from "./pages/comments/comments.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'projects',
    component: ProjectListComponent
  },
  {
    path: 'projects/new',
    component: EditProjectComponent
  },
  {
    path: 'projects/:id',
    component: EditProjectComponent
  },
  {
    path: 'tasks/:projectId',
    component: TaskListComponent
  },
  {
    path: 'tasks/:projectId/new',
    component: EditTaskComponent
  },
  {
    path: 'tasks/:projectId/:id',
    component: EditTaskComponent
  },
  {
    path: 'teams/:projectId',
    component: TeamListComponent
  },
  {
    path: 'teams/:projectId/new',
    component: EditTeamComponent
  },
  {
    path: 'teams/:projectId/:id',
    component: EditTeamComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'profile',
    component: UserProfileComponent
  },
  {
    path: 'stranger/:id',
    component: StrangerProfileComponent
  },
  {
    path: 'teams/:projectId/:id/users',
    component: TeamUsersListComponent
  },
  {
    path: 'home',
    component: MyTasksComponent
  },
  {
    path: 'task/:id/comments',
    component: CommentsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
