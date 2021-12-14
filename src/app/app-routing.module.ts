import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PaymentdetailsComponent } from './components/paymentdetails/paymentdetails.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserGuard } from './guards/user.guard';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch:'full'},
  {path: 'login', component: LoginComponent} ,
  {path: 'signup', component: SignupComponent} ,
  {path: 'paymentDetails', component: PaymentdetailsComponent, canActivate:[UserGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
