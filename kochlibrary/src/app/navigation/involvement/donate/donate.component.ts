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
      {id: 1, amount: 1},
      // {id: 5, amount: "other"},
    ];
    this.donationSelected = 0;
  }

  isDonateFormOpen: boolean = true;
  moreDetails : any;

  openDonateForm(){
    this.isDonateFormOpen = false;
      const dialogRef = this._dialog.open(DonationdialogComponent,{width:"60%", height:"95%"});
      
      dialogRef.componentInstance.creditCardDetailsEmitter.subscribe((creditCardDetails: any) => {
        console.log('Received credit card details in parent component:', creditCardDetails);
        this.moreDetails = creditCardDetails;
        this.processDonationData(this.moreDetails);
      });

      dialogRef.afterClosed().subscribe({
        next: (res) => { // Receive donorForm values from the dialog
          if (res) {
            console.log('Received donorForm values from the dialog',res);
            // this.processDonationData({ donationData }); // Process the received donationData
          }
        this.isDonateFormOpen = true;
        },

      });
  }
    // to process the received donation data
    processDonationData(moreDetails: any): void {
      // console.log("Received donation data:", donationData);
      this._donateService.saveDonationData(moreDetails).subscribe({
        next: (response: any) => {
          console.log("Donation data saved:", response);
          this.getDonorsList(); // Refresh donor list after donation data is saved
        },
        error: (error: any) => {
          console.error("Error saving donation data:", error);
          this._sweetAlerts.showErrorAlert("An error occurred while saving donation data!, Please try again");
        }
      });
    }
  

    getDonorsList() {
      this._donateService.getDonorList().subscribe({
        next: (res) => {
          console.log('donors',res);
    
          this.dataSource = new MatTableDataSource(res);
          console.log('gettingdonorresults',res[0]);
          
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
