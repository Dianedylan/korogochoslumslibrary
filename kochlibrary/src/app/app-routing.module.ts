import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './navigation/about/about.component';
import { ServicesComponent } from './navigation/services/services.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { InvolvementComponent } from './navigation/involvement/involvement.component';
import { DonateComponent } from './navigation/involvement/donate/donate.component';
import { ProgramComponent } from './navigation/involvement/program/program.component';
import { VolunteeringComponent } from './navigation/involvement/volunteering/volunteering.component';

const routes: Routes = [
  {
    path: 'home',
    component: LandingpageComponent,
   },
  { path:'about', component: AboutComponent},
  { path:'whatwedo', component: ServicesComponent},
  { 
    path:'whatyoucando', 
    component: InvolvementComponent,
  },
    // children: [
      {
        path: 'donate' , component: DonateComponent
      },
      {
        path: 'volunteer' , component: VolunteeringComponent
      },
      {
        path: 'programssponsorship' , component: ProgramComponent
      },

    // ]  
// },
  { path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
   // providers: [AuthGuard]
})
export class AppRoutingModule { }
