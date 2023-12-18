import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './navigation/about/about.component';
import { ServicesComponent } from './navigation/services/services.component';
import { LandingpageComponent } from './landingpage/landingpage.component';

const routes: Routes = [
  {
    path: 'home',
    component: LandingpageComponent,
    // children: [     
    //   { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
    //   // { path: 'drivers', loadChildren: './drivers/drivers.module#DriversModule' }
    // ]
   },
  { path:'about', component: AboutComponent},
  { path:'whatwedo', component: ServicesComponent},
  { path: '', redirectTo: '/', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
   // providers: [AuthGuard]
})
export class AppRoutingModule { }
