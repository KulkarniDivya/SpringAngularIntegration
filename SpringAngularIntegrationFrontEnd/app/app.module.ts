import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{ ReactiveFormsModule, FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { Routes, Router, RouterModule } from '@angular/router';
import { AccountNoService } from './account-no.service';
import { TransactionComponent } from './transaction/transaction.component';
import { OptionComponent } from './option/option.component';

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: 'options/:id', component:OptionComponent},
  {path: "transaction", component: TransactionComponent},
  {path: "app", component: AppComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    OptionComponent,
    NavbarComponent,
    TransactionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AccountNoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
