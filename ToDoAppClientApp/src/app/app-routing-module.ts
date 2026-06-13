import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Todo } from '../app/components/todo/todo';

const routes: Routes = [
 
  { path: '', redirectTo: 'todo', pathMatch: 'full' },

  
  { path: 'todo', component: Todo }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
