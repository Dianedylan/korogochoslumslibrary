import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './navigation/about/about.component';
import { ServicesComponent } from './navigation/services/services.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { InvolvementComponent } from './involvement/involvement.component';

const routes: Routes = [
  {
    path: 'home',
    component: LandingpageComponent,
   },
  { path:'about', component: AboutComponent},
  { path:'whatwedo', component: ServicesComponent}
  // { path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
   // providers: [AuthGuard]
})
export class AppRoutingModule { }
