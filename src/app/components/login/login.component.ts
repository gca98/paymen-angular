import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  alertShow=0
  alertmsg =""
  constructor(public userService: UsersService,public router: Router) { }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    password: new FormControl('', [Validators.required,Validators.minLength(5), Validators.pattern('((?=.*\d*)(?=.*[a-z]*)(?=.*[A-Z]*)(?=.*[!@#$%^&*()]).{5,30})')]),
    email: new FormControl('', [Validators.required,Validators.email])
  })

  get password(){
    return this.loginForm.get('password')
  }
  get email(){
    return this.loginForm.get('email')
  }
  login(){
    this.userService.signIn(this.loginForm.value).subscribe((res:any) => {
      if (res) {
        this.userService.setToken(res.token)
        this.loginForm.reset()
        this.router.navigate(['paymentDetails'])
      }
    },(error)=>{
      this.alertShow = 1
      this.alertmsg = "Login Failed : " + error
      this.timerTurnOff()
    })
  }
  gotoSignUp(){
    this.router.navigate(['signup'])
  }
  timerTurnOff() {
    timer(10000).subscribe(_ => this.alertShow = 0);
  }

}
