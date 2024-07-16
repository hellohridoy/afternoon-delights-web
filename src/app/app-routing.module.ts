import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import {UserListComponent} from "./user-list/user-list.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AddMemberComponent} from "./add-member/add-member.component";
import {BalanceComponent} from "./balance/balance.component";
import {MemberListComponent} from "./member-list/member-list.component";
import {MemberDetailsComponent} from "./member-details/member-details.component";

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'list', component: UserListComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'add-member', component: AddMemberComponent },
  { path: 'meal', component: BalanceComponent },
  { path: 'member-list', component: MemberListComponent },
  { path: 'member-details/:id', component: MemberDetailsComponent },
  { path: 'members', component: MemberListComponent },
  { path: 'balance-history/:id', component: MemberDetailsComponent },

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {



}

