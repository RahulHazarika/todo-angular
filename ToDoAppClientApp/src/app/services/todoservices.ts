import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TodoModel, TodoModelAddRequest } from '../models/todo-model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Todoservices {

  private apiUrl = `${environment.apiUrl}/api/ToDo`;
  constructor(private http: HttpClient) { }

  getAll(): Observable<TodoModel[]> {
    return this.http.get<TodoModel[]>(this.apiUrl);
  }

  addNewToDo(todo: TodoModelAddRequest): Observable<any> {
    return this.http.post<any>(this.apiUrl, todo);
  }

  updateToDo(todo: TodoModel): Observable<void> {
    return this.http.patch<void>(this.apiUrl+`/${todo.id}`, todo);
  }

  deleteToDO(id: string): Observable<void> {
    return this.http.delete<void>(this.apiUrl + `/${id}`);
  }

}
