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
  totalCount: number = 0
  completedCount: number = 0
  pendingCount: number = 0



  constructor(private todoService: Todoservices, private cdr: ChangeDetectorRef)
  {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getAll().subscribe({
      next: (data) => {
        this.todos = data;
        this.calculateCount()
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
      error: (err) => { this.errorMessage = err.error; this.calculateCount(); this.cdr.detectChanges(); }
    });
    this.newTodoTitle = ""


  }

  startEdit(todo:TodoModel) {
    this.editingId = todo.id;
    this.editTitle = todo.title;
    this.calculateCount();
    this.cdr.detectChanges();
  }

  deleteTodo(todoid: string) {
    this.todoService.deleteToDO(todoid).subscribe({
      next: () => {
        this.errorMessage = "";
        this.editingId = ""
        this.calculateCount();
        this.cdr.detectChanges();
        this.loadTodos();
      },
      error: (err) => {
        this.errorMessage = err.error;
        this.calculateCount();
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
          this.calculateCount();
          this.cdr.detectChanges();
          this.loadTodos();
        },
        error: (err) => {
          this.errorMessage = err.error;
          todo.title = _title;
          this.calculateCount();
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
        this.calculateCount();
        this.cdr.detectChanges();
        this.loadTodos();
      },
      error: (err) => {
        this.errorMessage = err.error;
        this.calculateCount();
        this.cdr.detectChanges();
      }
    });
  }

  calculateCount()
  {
    this.totalCount = this.todos.length
    
    this.completedCount = this.todos.filter(x => x.isCompleted).length;
    this.pendingCount = this.todos.filter(x => !x.isCompleted).length;


  }

}
