import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { Todoservices } from '../services/todoservices';
import { TodoModel } from '../models/todo-model';
import { environment } from '../../environments/environment';

describe('Todoservices', () => {
  let service: Todoservices;
  let httpMock: HttpTestingController;

  const apiUrl = `${environment.apiUrl}/api/todo`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Todoservices]
    });

    service = TestBed.inject(Todoservices);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });



  it('should get all todos', () => {
    
    const todos: TodoModel[] = [{
      id: '1',
      title: 'New Todo',
      isCompleted: false
    }];

    service.getAll().subscribe(result => {
      console.log('Result:', result);
      //req.flush(result);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe("GET")
    console.debug(req.request.method);
    console.debug(req.request.url);

    req.flush(req);
  });


})

