import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { ContactService } from 'src/app/sharedServices/contact.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'
import { DonationdialogComponent } from './donationdialog/donationdialog.component';
import { SweetAlertService } from 'src/app/sharedServices/sweet-alert.service';
import { Donation } from 'src/app/sharedServices/donations';
import { DonationService } from 'src/app/sharedServices/donation.service';
// import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss']
})
export class DonateComponent implements OnInit {
  donations: Donation[] = [];
  donationSelected: number | undefined | string = '' ;
  customAmount: number | undefined;

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort,  {static: false}) sort!: MatSort;


  constructor(
    private _dialog: MatDialog,
    private _sweetAlerts: SweetAlertService,
    private _contactService: ContactService,
    private _donateService: DonationService,
    // private _date: DatePipe,
  ) {}
  
  ngOnInit(){
    this.getDonorsList();
    this.donations = [
      {id: 1, amount: 50},
      {id: 2, amount: 85},
      {id: 3, amount: 120},
      {id: 4, amount: 250},
      // {id: 5, amount: "other"},
    ];
    this.donationSelected = 0;
  }

  isDonateFormOpen: boolean = true;

  openDonateForm(){
    this.isDonateFormOpen = false;
      const dialogRef = this._dialog.open(DonationdialogComponent,{width:"60%", height:"95%"});
      dialogRef.afterClosed().subscribe({
        next: (val) => {
          if (val) {
            console.log(val);
            this.getDonorsList();
          }
        this.isDonateFormOpen = true;
        },

      });
  }
  

  getDonorsList() {
    this._donateService.getDonorList().subscribe({
      next: (res) => {
        console.log('donors',res);
  
        this.dataSource = new MatTableDataSource(res);
        console.log('donorresults',res[0]);
        
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log
    });
  }
 
  onAmountSelected(selectedAmount: number) {
    this._contactService.setSelectedAmount(selectedAmount);
  }

}
