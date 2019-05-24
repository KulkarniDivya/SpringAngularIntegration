import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private headers = new HttpHeaders({ 'Content-type': 'application/json' });
  private options = { headers: this.headers }

  registerForm: FormGroup;
  constructor(private router: Router, private formBuilder: FormBuilder, private httpClient: HttpClient) { }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      mobileNo: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      aadharNo: ['', [Validators.required, Validators.min(100000000000), Validators.max(999999999999)]],
      pancardNo: ['', [Validators.required, Validators.min(1000000000), Validators.max(9999999999)]]
    });
  }

  // register(value: any){
  //   alert(value.FName);
  // }

  onSubmit(){
    // alert(JSON.stringify(this.registerForm.value))
    // console.log(JSON.stringify(this.registerForm.value))
    this.httpClient.post('http://localhost:7633/register',JSON.stringify(this.registerForm.value), this.options).subscribe(
  
      (response) =>{
       
          alert("Registration Successfull!!!!! \n Your account no is "+response);
          this.router.navigate(['/login']);
       
      },
              
      (error) =>{
        alert("Something went wrong!!!!!!  Plz Register again");
        this.router.navigate(["/register"])
      });
    
    
   
  }
}
