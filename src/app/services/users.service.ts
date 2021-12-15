import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Models/user';
import { catchError } from 'rxjs/operators';
import { errorHandler } from '../errorHandler';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  endpoint: string='https://gio-payment.herokuapp.com'
  header = new HttpHeaders().set('Context-Type','application/json')
  constructor(private http: HttpClient) { }
  curruntUser:{name:string, email:string, _id:string} = {name: '', email: '', _id: ''}


  signIn(user: User){
    return this.http.post<any>(`${this.endpoint}/api/AuthManagement/Login`, user,{ 'headers': this.header }).pipe(catchError(errorHandler))
  }
  signup(user: User){
    return this.http.post<any>(`${this.endpoint}/api/AuthManagement/Register`, user,{ 'headers': this.header }).pipe(catchError(errorHandler))
  }

  setToken(token:string){
    return localStorage.setItem('access_token', token)
  }
  getToken(){
    return localStorage.getItem('access_token');
  }
  get isLoggedIn():boolean{
    let authToken = localStorage.getItem('access_token')
    return(authToken!==null)? true:false;
  }
  logout(){
    return localStorage.clear()
  }

}
