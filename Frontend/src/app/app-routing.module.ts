import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProjectListComponent} from "./pages/project-list/project-list.component";
import {EditProjectComponent} from "./pages/edit-project/edit-project.component";
import {TaskListComponent} from "./pages/task-list/task-list.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/projects',
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
