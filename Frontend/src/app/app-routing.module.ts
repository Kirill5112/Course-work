import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProjectListComponent} from "./pages/project-list/project-list.component";
import {EditProjectComponent} from "./pages/edit-project/edit-project.component";
import {TaskListComponent} from "./pages/task-list/task-list.component";
import {RegisterComponent} from "./pages/register/register.component";
import {LoginComponent} from "./pages/login/login.component";

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
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
