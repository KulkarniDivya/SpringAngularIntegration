import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountNoService {
  isLoggedOut: boolean = true;
  baseUrl: string = "http://localhost:7633"
  private headers = new HttpHeaders({ 'Content-type': 'application/json' });
  private options = { headers: this.headers }

  constructor() { }

  getBaseUrl(){
    return this.baseUrl
  }
  getIntegrationOptions(){
    return this.options
  }
}
