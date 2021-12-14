import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersService } from '../services/users.service';

@Injectable()
export class UserInterceptor implements HttpInterceptor {

  constructor(private userService: UsersService) {}


  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.userService.getToken()
    request = request.clone({ setHeaders: { Authorization: `Bearer ${authToken}` } })
    return next.handle(request);
  }
}
