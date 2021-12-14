import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  alertShow=0
  alertmsg =""
  constructor(public userService:UsersService, public route:Router) { }

  ngOnInit(): void {
  }
  singupForm = new FormGroup({
    username: new FormControl('', [Validators.required,Validators.minLength(5)]),
    email: new FormControl('', [Validators.required,Validators.email]),
    password: new FormControl('', [Validators.required,Validators.minLength(5), Validators.pattern('((?=.*\d*)(?=.*[a-z]*)(?=.*[A-Z]*)(?=.*[!@#$%^&*()]).{5,30})')])
  })

  get username(){
    return this.singupForm.get('username')
  }
  get password(){
    return this.singupForm.get('password')
  }
  get email(){
    return this.singupForm.get('email')
  }

  signup(){
    this.userService.signup(this.singupForm.value).subscribe((res)=>{
      if (res) {
        this.singupForm.reset()
        this.route.navigate(['login'])
      }
    },(error)=>{
      this.alertShow = 1
      this.alertmsg = "Sign Up Failed : " + error
      this.timerTurnOff()
    })
  }
  gotoLogin(){
    this.route.navigate(['login'])
  }
  timerTurnOff() {
    timer(10000).subscribe(_ => this.alertShow = 0);
  }

}
