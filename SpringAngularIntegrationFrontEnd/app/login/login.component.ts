import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountNoService } from '../account-no.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private headers = new HttpHeaders({ 'Content-type': 'application/json' });
  private options = { headers: this.headers }
  loginForm: FormGroup;
  constructor(private router: Router, private accountNoService: AccountNoService, private formBuilder: FormBuilder, private httpClient: HttpClient) { }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      accountNo: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // login(value: any) {
  //   this.accountNoService.accountNo = value.accountNo;
  //   alert(value.remember)
  // }
  onSubmit(){
    // this.accountNoService.userId = this.loginForm.value.userId;
    // alert(JSON.stringify(this.loginForm.value))
    // alert(this.loginForm.value.accountNo)
    this.httpClient.post('http://localhost:7633/login',JSON.stringify(this.loginForm.value), this.options).subscribe(
  
      (response) =>{
          if(response > 0){
            alert("Login Successful");
          this.router.navigate(['/transaction']);
          }
          else{
            alert("Invalid Credentials");
          this.router.navigate(['/login']);
          }
       
      },
              
      (error) =>{
        alert("Something went wrong! Please Login again");
        this.router.navigate(["/login"])
      });
  }
}
