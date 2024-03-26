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

declare var paypal: any;

@Component({
  selector: 'app-donationdialog',
  templateUrl: './donationdialog.component.html',
  styleUrls: ['./donationdialog.component.scss']
})
export class DonationdialogComponent implements OnInit {

   selectedAmount!: number;
   donations: Donation[] = [];
   donationSelected: number | undefined | string = '';
  //  customAmount: number | undefined;
   amount = 0;
   isCreditCardPayment: boolean = true;
   creditCardDetails : any;
   detailsSent: boolean = false;

   @ViewChild('paymentRef', {static:true}) paymentRef!: ElementRef;
   @Output() creditCardDetailsEmitter: EventEmitter<any> = new EventEmitter<any>();
  
  constructor(
    private _fb: FormBuilder,
    private _contactService: ContactService,
    private _donateService: DonationService,
    private _sweetAlerts: SweetAlertService,
    private _dialogRef: MatDialogRef<DonationdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { 
    // this._contactService.selectedAmount$.subscribe((amount) => {
    //   this.selectedAmount = amount;
    //   console.log('this selected amount', this.selectedAmount);
    // });
    // this._contactService.setSelectedAmount(this.selectedAmount);
  
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
    const environment = 'sandbox'; // Change this to 'live' for production

    this._contactService.selectedAmount$.subscribe((amount) => {
      this.selectedAmount = amount;
      console.log('this selected amount', this.selectedAmount);
      this.amount = this.selectedAmount; // Update amount when selectedAmount changes
    });
    
    this.loadPayPalScript(environment);
  }

  loadPayPalScript(environment: string) {
    const script = document.createElement('script');
    script.src = environment === 'sandbox' 
      ? 'https://www.paypal.com/sdk/js?currency=USD&client-id=Ab34xSADsdJc4aIynDDLmNBJYENaESUA9ZqoiW3vCur1e_UhZ5XvJMEeIb-s4DoIhiLHa95tQJeEMn4h'
      : 'https://www.paypal.com/sdk/js?currency=USD&client-id=AWo3OJ81hcIUsSR3deC3xP9QPYJg3rkYItl7SAcmMy5vfD3Nk9wgzmRT1VKrsiLL1hvg-qY98u_0MXh3';
    script.onload = () => {
    
      paypal.Buttons(
        {
          // style: {
          //   layout: 'horizontal',
          //   color: 'blue',
          //   shape: 'rect',
          //   label: 'paypal',
          // },
          createOrder: (data: any, actions: any): any => {
            this.isCreditCardPayment = true;
            if (this.isCreditCardPayment) {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        currency_code: 'USD',
                        value: this.amount.toString(),
                      },
                    },
                  ],
                });
              }else {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        currency_code: 'USD',
                        value: this.amount.toString(),
                      },
                    },
                  ],
                });
              }
          },
          
          onApprove: (data:any, actions:any) => {
            return actions.order.capture().then((details:any) =>{
              this._sweetAlerts.showSuccessAlert("Amount sent successfully!"); 
              console.log("paypal details",details);
              this.creditCardDetails = details;
              this.creditCardDetailsEmitter.emit(this.creditCardDetails);
              this._dialogRef.close(true);
            });
          },
          onError: (error:any) => {
            this._sweetAlerts.showErrorAlert("An error occurred, please try again!");
            console.log(error);
            
          }
        }
      ).render(this.paymentRef.nativeElement);
    };
    document.body.appendChild(script);
  }

  // creditCardDetails = details;
  

    onFormSubmit() {
      if (this.donorForm.valid) {
        // const donationData = { 
          
        //   creditCardDetails: this.creditCardDetails,
        //   // ...this.donorForm.value,
        // };

        this._donateService.addDonationDetails(this.donorForm.value).subscribe({ 
          next: (res) => {
          console.log('Your details sent successfully:', res);
          this._sweetAlerts.showSuccessAlert("Your details  sent successfully!, Please proceed to donate");
          this.detailsSent = true; 
          this.donorForm.reset();
          
          // this._dialogRef.close(true);
        },
            
          error: console.log
          
        });
      }
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

    onAmountSelected(selectedAmount: number): void {
      this._contactService.setSelectedAmount(selectedAmount);
    }
  
    selectedOption: string = "option1";



  
}
