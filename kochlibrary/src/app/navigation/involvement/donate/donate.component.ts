import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { ContactService } from 'src/app/sharedServices/contact.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'
import { DonationdialogComponent } from './donationdialog/donationdialog.component';
import { SweetAlertService } from 'src/app/sharedServices/sweet-alert.service';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss']
})
export class DonateComponent implements OnInit {

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort,  {static: false}) sort!: MatSort;

  // selectedAmount!: number | string;

  constructor(
    private _dialog: MatDialog,
    private _sweetAlerts: SweetAlertService,
    private _contactService: ContactService,
    // private _date: DatePipe,
  ) {}
  
  ngOnInit(){
    this.getDonorsList();
  }


  openDonateForm(){
      const dialogRef = this._dialog.open(DonationdialogComponent,{width:"55%", height:"90%"});
      dialogRef.afterClosed().subscribe({
        next: (val) => {
          if (val) {
            console.log(val);
            this.getDonorsList();
          }
        },
      });
  }

  getDonorsList() {
    this._contactService.getDonorList().subscribe({
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

 
  onAmountChange(selectedAmount: number | string): void {
    this._contactService.updateSelectedAmount(selectedAmount);
  }
}
