import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsermanagerComponent} from './home/usermanager/usermanager.component';
import { UserprofileComponent} from './home/userprofile/userprofile.component'

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  { path: 'user-profile/:id', component: UserprofileComponent },
  { path: 'user-profile/', component: UserprofileComponent },
  { path: 'manage-user', component: UsermanagerComponent },
 
  { path: '**', redirectTo: '/home' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
