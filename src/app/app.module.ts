import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { UserListComponent } from './user-list/user-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddMemberComponent } from './add-member/add-member.component';
import { BalanceComponent } from './balance/balance.component';
import { MealComponent } from './meal/meal.component';
import { MemberListComponent } from './member-list/member-list.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UpdateMemberModalComponent } from './update-member-modal/update-member-modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MemberDetailsComponent} from "./member-details/member-details.component";
import { AddMoneyModalComponent } from './add-money-modal/add-money-modal.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    UserProfileComponent,
    NavbarComponent,
    DashboardComponent,
    AddMemberComponent,
    BalanceComponent,
    MealComponent,
    MemberListComponent,
    UpdateMemberModalComponent,
    UserListComponent,
    MemberDetailsComponent,
    AddMoneyModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA], // Add NO_ERRORS_SCHEMA here
  bootstrap: [AppComponent]
})
export class AppModule { }
