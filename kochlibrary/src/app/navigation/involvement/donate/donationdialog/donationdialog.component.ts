import { Component, Inject, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { ContactService } from 'src/app/sharedServices/contact.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SweetAlertService } from 'src/app/sharedServices/sweet-alert.service';
import { Donation } from 'src/app/sharedServices/donations';
import { DonationService } from 'src/app/sharedServices/donation.service';
import { take, switchMap } from 'rxjs';
// import {}

@Component({
  selector: 'app-donationdialog',
  templateUrl: './donationdialog.component.html',
  styleUrls: ['./donationdialog.component.scss']
})
export class DonationdialogComponent implements OnInit {
   selectedAmount!: number | string;
   donations: Donation[] = [];
   donationSelected: number | undefined | string = '';

   @ViewChild('paymentRef', {static:true}) paymentRef!: ElementRef;
  
  constructor(
    private _fb: FormBuilder,
    private _contactService: ContactService,
    private _donateService: DonationService,
    private _sweetAlerts: SweetAlertService,
    private _dialogRef: MatDialogRef<DonationdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { 
    this._contactService.selectedAmount$.subscribe((amount) => {
    this.selectedAmount = amount;
    console.log('this selected  amount', this.selectedAmount);
    
  });
}
     
  donorForm = new FormGroup({
    firstName: new FormControl("", Validators.required),
    surname: new FormControl("", Validators.required),
    phone: new FormControl("",[Validators.required, Validators.pattern("^\\+?[0-9]{1,4}-?[0-9]{6,14}$")]),
    email: new FormControl("", [Validators.required, Validators.email])
  });

  cardForm = new FormGroup({
    cardNumber: new FormControl ('', [Validators.required, Validators.minLength(16)]),
    month: new FormControl ('', [Validators.required, Validators.maxLength(2)]),
    year: new FormControl('', [Validators.required, Validators.maxLength(2)]),
    cvv: new FormControl('', Validators.required),
  });

  ngOnInit() {
    this.donorForm.patchValue(this.data);
    this.cardForm.patchValue(this.data);
    // this.donations = [
    //   {id: 1, amount: 50},
    //   {id: 2, amount: 85},
    //   {id: 3, amount: 120},
    //   {id: 4, amount: 250}
    // ];
    // console.log('paypal integrations', window.paypal);
    
    window.paypal.Buttons(
      {
        style: {
          layout: 'horizontal',
          color: 'blue',
          shape: 'rect',
          label: 'paypal',
        },
        makeDonation: (data: any, actions: any) => {
          return this._donateService['selectedAmount$'].pipe(
            take(1), // To take only the first emitted value
            switchMap((selectedAmount) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: this.selectedAmount,
                      currency_code: 'USD',
                    },
                  },
                ],
              });
            })
          );
        },
        
        onApprove: (data:any, actions:any) => {
          return actions.order.capture().then((details:any) =>{
            console.log(details);
          });
        },
        onError: (error:any) => {
          console.log(error);
          
        }
      }
    ).render(this.paymentRef.nativeElement);
  }



  onFormSubmit() {
    if (this.donorForm.valid) {
      this._donateService.addDonationDetails(this.donorForm.value).subscribe( res => {
        
            console.log('valuesss',[res]);
            this._sweetAlerts.showSuccessAlert("Donation sent successfully!");
            this._dialogRef.close(true);
          },
          
          err => {
            console.error(err);
          },);
      }
    }else () {
      this._donateService.addCardDetails(this.cardForm.value).subscribe( res => {
        
            console.log('valuesss',[res]);
            this._sweetAlerts.showSuccessAlert("Amount sent successfully!");
            this._dialogRef.close(true);
          },
          
          err => {
            console.error(err);
          },);
      }


    showRadioSet: number = 1;
  selectedOption1: string | null = null;
  selectedOption2: string | null = null;

  radioSet2Options = [
    { label: 'MONTHLY', value: 'per month' },
    { label: 'HALF YEARLY', value: 'every 6 months' },
    { label: 'ANNUALLY', value: 'per year' }
  ];

  showSet1() {
    this.showRadioSet = 1;
  }

  showSet2() {
    this.showRadioSet = 2;
  }

  onAmountSelected(selectedAmount: number) {
    this._contactService.setSelectedAmount(selectedAmount);
  }
  
  selectedOption: string = "option1";



  
}
