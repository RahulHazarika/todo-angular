import { Component, OnInit,Input } from '@angular/core';
import { Todoservices } from '../../services/todoservices';
import { TodoModel, TodoModelAddRequest } from '../../models/todo-model';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-todo',
  standalone: false,
  templateUrl: './todo.html',
  styleUrl: './todo.css',
})
export class Todo
{
  todos: TodoModel[] = []
  newTodoTitle: string = ""
  errorMessage : string = ""
  editingId: string = ""
  editTitle: string = ""
  constructor(private todoService: Todoservices, private cdr: ChangeDetectorRef)
  {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getAll().subscribe({
      next: (data) => {
        this.todos = data;
        this.cdr.detectChanges();
      }
    });
  }

  addTodo() {
    let newToDoModel: TodoModelAddRequest = {
     
      title: this.newTodoTitle
    }


    this.todoService.addNewToDo(newToDoModel).subscribe({
      next: () => {
        this.errorMessage = "";
        this.newTodoTitle = '';
        this.loadTodos();
      },
      error: (err) => { this.errorMessage = err.error; this.cdr.detectChanges(); }
    });
    this.newTodoTitle = ""


  }

  startEdit(todo:TodoModel) {
    this.editingId = todo.id;
    this.editTitle = todo.title;
    this.cdr.detectChanges();
  }

  deleteTodo(todoid: string) {
    this.todoService.deleteToDO(todoid).subscribe({
      next: () => {
        this.errorMessage = "";
        this.editingId = ""
        this.cdr.detectChanges();
        this.loadTodos();
      },
      error: (err) => {
        this.errorMessage = err.error;
        this.cdr.detectChanges();
      }

    });
  }
  saveEdit(todo: TodoModel)
  {
    let _title = "";
    if (this.editTitle != null && this.editTitle != undefined && this.editTitle != "") {
      _title = todo.title;
      todo.title = this.editTitle
     
      this.todoService.updateToDo(todo).subscribe({
        next: () => {
          this.errorMessage = "";
          this.editingId = ""
          this.editTitle = "";
          this.cdr.detectChanges();
          this.loadTodos();
        },
        error: (err) => {
          this.errorMessage = err.error;
          todo.title = _title;
          this.cdr.detectChanges();
        }
      });
    }
    else
    {
      this.errorMessage = 'Cannot Update Empty';
    }
  }

  saveEditOnCheckBox(todo: TodoModel) {
    //todo.title = this.editTitle
    todo.isCompleted = !todo.isCompleted
    this.todoService.updateToDo(todo).subscribe({
      next: () => {
        this.errorMessage = "";
        this.editingId = "";
        this.editTitle = "";
        this.cdr.detectChanges();
        this.loadTodos();
      },
      error: (err) => {
        this.errorMessage = err.error;
        this.cdr.detectChanges();
      }
    });
  }

}
