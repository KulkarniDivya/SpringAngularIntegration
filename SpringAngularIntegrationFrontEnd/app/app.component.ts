import { Component } from '@angular/core';
import { AccountNoService } from './account-no.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Banking';
  isLoggedOut: boolean = true;

  constructor(){}


  // ngOnInit(){
  //   this.isLoggedOut = this.accountNoService.getLoginStatus();
  // }
  loginRegister(){
    this.isLoggedOut = !this.isLoggedOut
  }
}
