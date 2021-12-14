import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { detailPayment } from '../Models/paymentDetails';
import { catchError } from 'rxjs/operators';
import { errorHandler } from '../errorHandler';

@Injectable({
  providedIn: 'root'
})
export class PaymentdetailsService {

  endpoint: string='https://gio-payment.herokuapp.com/api/PaymentApi'
  header = new HttpHeaders().set('Context-Type','application/json')
  constructor(private http: HttpClient) { }

  getPaymentDetails():Observable<any>{
    return this.http.get(this.endpoint)
  }

  addPaymentDetil(paymentDetail:detailPayment):Observable<any>{
    return(this.http.post(this.endpoint,paymentDetail).pipe(catchError(errorHandler)))
  }
  getPaymentDetailsbyId(id:number|undefined):Observable<any>{
    return (this.http.get(`${this.endpoint}/${id}`).pipe(catchError(errorHandler)))
  }
  updatePaymentDetail(paymentDetail:detailPayment):Observable<any>{
    const { paymentDetailId } = paymentDetail
    // delete paymentDetail.paymentDetailId

    return(this.http.put(`${this.endpoint}/${paymentDetailId}`,paymentDetail).pipe(catchError(errorHandler)))
  }
  deletePaymentDetail(id:number):Observable<any>{
    return (this.http.delete(`${this.endpoint}/${id}`).pipe(catchError(errorHandler)))
  }
  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error")
  }

}
