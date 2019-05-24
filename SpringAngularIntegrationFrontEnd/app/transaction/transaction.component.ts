import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  private headers = new HttpHeaders({ 'Content-type': 'application/json' });
  private options = { headers: this.headers }
  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit() {
  }
  showBalance(){
    this.httpClient.get('http://localhost:7633/showbalance', this.options).subscribe(
  
      (response) =>{
          alert("Your Balance is "+response);
        this.router.navigate(['/transaction']);     
    },
      (error) =>{
        alert("Something went wrong!!!!!!  Please Try again");
        this.router.navigate(["/transaction"])
      });
  }

}
