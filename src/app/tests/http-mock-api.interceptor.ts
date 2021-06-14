import {Injectable} from '@angular/core';
import {selectHandler} from './mock.config';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class HttpMockApiInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const mockEndpointHandler = selectHandler(request);
    return mockEndpointHandler ? mockEndpointHandler(request) : next.handle(request);
  }
}
