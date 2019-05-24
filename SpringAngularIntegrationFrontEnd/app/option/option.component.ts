import { Component, OnInit } from '@angular/core';
import {  Router, ActivatedRoute } from '@angular/router';
import { AccountNoService } from '../account-no.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TransactionDetails } from '../transaction';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.css']
})
export class OptionComponent implements OnInit {
id:number
private headers = new HttpHeaders({ 'Content-type': 'application/json' });
  private options = { headers: this.headers }
  depositForm: FormGroup;  
  withdrawForm : FormGroup;
  transactionDetails: TransactionDetails;
  transactionForm: FormGroup;
constructor(private activatedRoute:ActivatedRoute,private router: Router, private accountNoService: AccountNoService, private httpClient: HttpClient, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params["id"]
    this.depositForm = this.formBuilder.group({
      amount: ['', Validators.required]
    });
    this.withdrawForm = this.formBuilder.group({
      amount: ['', Validators.required]
    });
    this.transactionForm = this.formBuilder.group({
      toAcc: ['', Validators.required],
      amt: ['', Validators.required]
    });
  }

  deposit(){
    if(this.depositForm.value.amount>0){
    this.httpClient.put('http://localhost:7633/deposit', this.depositForm.value.amount, this.options).subscribe(
  
      (response) =>{
        if(response > 0){
          alert("Deposit Successful. Remaining Balance is "+response);
        this.router.navigate(['/transaction']);
        }
        else{
          alert("Deposit Failed");
        this.router.navigate(['/transaction']);
        }
     
    },
              
      (error) =>{
        alert("Something went wrong!!!!!!  Please Try again");
        this.router.navigate(["/transaction"])
      });   
    }
    else{
      alert("Amount Should be a positive number");
      this.router.navigate(["/transaction"])
    }
  }

  withdraw(){
    if(this.withdrawForm.value.amount>0){
    this.httpClient.put('http://localhost:7633/withdraw',this.withdrawForm.value.amount, this.options).subscribe(
  
      (response) =>{
        if(response != 0){
          alert("Withdraw Successful. Remaining Balance is "+response);
        this.router.navigate(['/transaction']);
        }
        else{
          alert("Insufficient Fund");
        this.router.navigate(['/transaction']);
        }
     
    },
              
      (error) =>{
        alert("Something went wrong!!!!!!  Please Try again");
        this.router.navigate(["/transaction"])
      });  
    }
    else{
      alert("Amount Should be a positive number");
      this.router.navigate(["/transaction"])
    } 
  }

  transfer(){
    if(this.transactionForm.value.amount>0){
    this.httpClient.put<TransactionDetails>(this.accountNoService.getBaseUrl()+'/fundtransfer',JSON.stringify(this.transactionForm.value), this.accountNoService.getIntegrationOptions()).subscribe(
  
      (response) =>{
          this.transactionDetails = response;
          alert("Transaction Successfull!!!!!\n Rs. "+this.transactionDetails.amt+" transferred from "+this.transactionDetails.fromAcc+" to "+this.transactionDetails.toAcc+"\n Transaction Id "+this.transactionDetails.transactionId);
          this.router.navigate(['/transaction']);
       
      },
              
      (error) =>{
        alert("No Account exists with the entered number");
        this.router.navigate(["/transaction"])
      });
    }
    else{
      alert("Amount Should be a positive number");
      this.router.navigate(["/transaction"])
    }
  }

}
