import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './navigation/about/about.component';
import { ServicesComponent } from './navigation/services/services.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { InvolvementComponent } from './navigation/involvement/involvement.component';
import { DonateComponent } from './navigation/involvement/donate/donate.component';
import { ProgramComponent } from './navigation/involvement/program/program.component';
import { VolunteeringComponent } from './navigation/involvement/volunteering/volunteering.component';
import { ContactsComponent } from './navigation/about/contacts/contacts.component';
import { BoardComponent } from './navigation/about/board/board.component';

const routes: Routes = [
  { path: 'home', component: LandingpageComponent },
  { path:'whatwedo', component: ServicesComponent},
  { path:'whatyoucando', component: InvolvementComponent },
  // { path: 'contactus', component: ContactsComponent},
    // children: [
      // {
      //   path: 'whatyoucando/:name' , component: DonateComponent
      // },
      // {
      //   path: 'whatyoucando/:name2' , component: VolunteeringComponent
      // },
      // {
      //   path:'whatyoucando/:name3' , component: ProgramComponent
      // },
      {
        path: 'donate' , component: DonateComponent
      },
      {
        path: 'whatyoucando/volunteer' , component: VolunteeringComponent
      },
      {
        path:'whatyoucando/programssponsorship' , component: ProgramComponent
      },

    // ]  
// },
  { path:'about', component: AboutComponent},
  { path: 'contactus', component: ContactsComponent},
  { path: 'board', component: BoardComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
   // providers: [AuthGuard]
})
export class AppRoutingModule { }
