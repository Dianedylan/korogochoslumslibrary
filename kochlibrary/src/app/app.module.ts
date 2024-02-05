import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatRadioModule} from '@angular/material/radio';
import {MatDialogModule} from '@angular/material/dialog';
import { AnswerdialogComponent } from './answerdialog/answerdialog.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './navigation/about/about.component';
import { ServicesComponent } from './navigation/services/services.component';
import { RouterModule } from '@angular/router';
import { InvolvementComponent } from './navigation/involvement/involvement.component';
import { DonateComponent } from './navigation/involvement/donate/donate.component';
import { ProgramComponent } from './navigation/involvement/program/program.component';
import { VolunteeringComponent } from './navigation/involvement/volunteering/volunteering.component';
import { ContactsComponent } from './navigation/about/contacts/contacts.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule }  from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import {MatRadioModule} from '@angular/material/radio';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import {MatSelectModule} from '@angular/material/select';
import { BoardComponent } from './navigation/about/board/board.component';
import { DonationdialogComponent } from './navigation/involvement/donate/donationdialog/donationdialog.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingpageComponent,
    AnswerdialogComponent,
    FooterComponent,
    AboutComponent,
    ServicesComponent,
    InvolvementComponent,
    DonateComponent,
    ProgramComponent,
    VolunteeringComponent,
    ContactsComponent,
    BoardComponent,
    DonationdialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatProgressBarModule,
    FlexLayoutModule,
    MatMenuModule,
    MatExpansionModule,
    MatRadioModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatSelectModule,
    // MatRadioModule,
    SweetAlert2Module.forRoot(),
    CarouselModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
