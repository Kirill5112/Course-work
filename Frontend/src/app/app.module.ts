import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { EditProjectComponent } from './pages/edit-project/edit-project.component';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TaskCardComponent } from './components/task-card/task-card.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectListComponent,
    EditProjectComponent,
    TaskListComponent,
    ProjectCardComponent,
    TaskCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule {
}
