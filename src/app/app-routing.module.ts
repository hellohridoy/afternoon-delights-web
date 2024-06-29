import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import {UserListComponent} from "./user-list/user-list.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AddMemberComponent} from "./add-member/add-member.component";
import {BalanceComponent} from "./balance/balance.component";
import {MealComponent} from "./meal/meal.component";
import {MemberListComponent} from "./member-list/member-list.component";

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'list', component: UserListComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'add-member', component: AddMemberComponent },
  { path: 'meal', component: BalanceComponent },
  { path: 'balance', component: MealComponent },
  { path: 'member-list', component: MemberListComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {



}

