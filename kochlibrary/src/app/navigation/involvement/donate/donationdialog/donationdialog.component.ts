import { Component, Inject, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ContactService } from 'src/app/sharedServices/contact.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SweetAlertService } from 'src/app/sharedServices/sweet-alert.service';


@Component({
  selector: 'app-donationdialog',
  templateUrl: './donationdialog.component.html',
  styleUrls: ['./donationdialog.component.scss']
})
export class DonationdialogComponent implements OnInit {
   selectedAmount!: number | string;
  
  constructor(
    private _fb: FormBuilder,
    private _contactService: ContactService,
    private _sweetAlerts: SweetAlertService,
    private _dialogRef: MatDialogRef<DonationdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
     
  donorForm = new FormGroup({
     
    firstName: new FormControl("", Validators.required),
    surname: new FormControl("", Validators.required),
    phone: new FormControl("",[Validators.required, Validators.pattern("^\\+?[0-9]{1,4}-?[0-9]{6,14}$")]),
    email: new FormControl("", [Validators.required, Validators.email])
  });


  ngOnInit(): void {
    this.donorForm.patchValue(this.data);
    this._contactService.selectedAmount$.subscribe((amount) => {
      this.selectedAmount = amount;
    });
  }

  onFormSubmit() {
    if (this.donorForm.valid) {
      this._contactService.addDonationDetails(this.donorForm.value).subscribe( res => {
        
            console.log('valuesss',[res]);
            this._sweetAlerts.showSuccessAlert("Item details sent successfully!");
            this._dialogRef.close(true);
          },
          
          err => {
            console.error(err);
          },);
      }
    }
}
