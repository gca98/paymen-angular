import { Component, OnInit } from '@angular/core';
import { detailPayment } from 'src/app/Models/paymentDetails';
import { PaymentdetailsService } from 'src/app/services/paymentdetails.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { timer } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paymentdetails',
  templateUrl: './paymentdetails.component.html',
  styleUrls: ['./paymentdetails.component.css']
})
export class PaymentdetailsComponent implements OnInit {

  alertShow = 0
  alertmsg = ""
  constructor(public paymentdetailService: PaymentdetailsService, private modalService: NgbModal, public router: Router) { }
  paymentDetails: detailPayment[] = []
  ngOnInit(): void {
    this.getPaymentDetails()
  }
  getPaymentDetails() {
    this.paymentdetailService.getPaymentDetails().subscribe(data => {
      this.paymentDetails = data
    }, (error) => {
      this.alertShow = 2
      if (error.message == "Http failure response for https://gio-payment.herokuapp.com/api/PaymentApi: 401 Unauthorized") {
        this.alertmsg = "Get Payment Details Failed : " + "Session expired, please login again."
      }
      
    })
  }

  form = {
    status: 'add',

    paymentdetailForm: new FormGroup({
      paymentDetailId: new FormControl(''),
      cardOwnerName: new FormControl('', [Validators.required, Validators.minLength(5)]),
      cardNumber: new FormControl('', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]),
      securityCode: new FormControl('', [Validators.required, Validators.minLength(1)]),
      expirationDate: new FormControl('', [Validators.required, Validators.pattern('(([0-1])([0-9])/([0-9])([0-9]))')])
    })
  }
  get paymentDetailId() {
    return this.form.paymentdetailForm.get('paymentDetailId')
  }
  get cardOwnerName() {
    return this.form.paymentdetailForm.get('cardOwnerName')
  }
  get cardNumber() {
    return this.form.paymentdetailForm.get('cardNumber')
  }
  get securityCode() {
    return this.form.paymentdetailForm.get('securityCode')
  }
  get expirationDate() {
    return this.form.paymentdetailForm.get('expirationDate')
  }

  PaymentDetail() {

    switch (this.form.status) {
      case "add":
        return this.addPaymentDetil()
      case "edit":
        return this.updatePaymentDetail()
    }
  }

  addPaymentDetil() {
    const data = this.form.paymentdetailForm.value
    delete data.paymentDetailId
    this.paymentdetailService
      .addPaymentDetil(data)
      .subscribe(_ => {
        this.getPaymentDetails()
        this.form.paymentdetailForm.reset()
        this.alertShow = 1
        this.alertmsg = "data has been addeed successfully "
      }, (error) => {
        this.alertShow = 2
        if (error =="TypeError: Cannot read properties of null (reading 'errors')") {
          this.alertmsg = "Add Payment Details Failed : Session expired, please login again."
        }else{
          this.alertmsg = "Add Payment Details Failed : " + error
        }
        
      })

  }
  fillPaymentEdit(paymentDet: detailPayment) {
    this.paymentdetailService.getPaymentDetailsbyId(paymentDet.paymentDetailId).subscribe(data => {
      this.paymentDetailId?.setValue(paymentDet.paymentDetailId)
      this.cardOwnerName?.setValue(data.cardOwnerName)
      this.cardNumber?.setValue(data.cardNumber)
      this.securityCode?.setValue(data.securityCode)
      this.expirationDate?.setValue(data.expirationDate)
      this.form.status = 'edit'
    })

  }

  updatePaymentDetail() {
    const data = this.form.paymentdetailForm.value
    this.paymentdetailService.updatePaymentDetail(data).subscribe(_ => {
      this.getPaymentDetails()
      this.form.paymentdetailForm.reset()
      this.form.status = 'add'
      this.alertShow = 1
      this.alertmsg = "data has been Updated successfully "
    }, (error) => {
      this.alertShow = 2
      this.alertmsg = "Update Payment Detail Failed : " + error
    })
  }

  confirmDelete(id: number) {
    if (confirm(`Are you sure you want to delete User ID ${id}?`)) {
      this.deletePaymentDetail(id)
      this.alertShow = 1
      this.alertmsg = "Data has been deleted successfully"
      this.timerTurnOff()
    } else {
      alert("data is not deleted")
      this.alertShow = 2
      this.alertmsg = "data is not deleted"

    }
  }
  deletePaymentDetail(id: number) {
    this.paymentdetailService.deletePaymentDetail(id).subscribe(_ => {
      this.getPaymentDetails()

      this.alertShow = 1
      this.alertmsg = "data has been deleted successfully "
    }, (error) => {
      this.alertShow = 2
      this.alertmsg = "Delete Payment Detail Failed : " + error
    })
  }
  timerTurnOff() {
    timer(10000).subscribe(_ => this.alertShow = 0);
  }


  closeResult: string = '';
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {

      return `with: ${reason}`;
    }
  }
  gotoLogin() {
    this.router.navigate(['login'])
  }

}
