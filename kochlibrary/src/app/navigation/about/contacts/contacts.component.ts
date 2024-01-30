import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/sharedServices/contact.service';
import { SweetAlertService } from 'src/app/sharedServices/sweet-alert.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  messageForm!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _contactService: ContactService,
    private _sweetAlerts: SweetAlertService,
    // @Inject(MAT_DIALOG_DATA) public data: any,
    
    ){

    }

    ngOnInit(): void {
      this.messageForm = this._fb.group({
        name: new FormControl ('', [Validators.required, Validators.minLength(3)]),
        phone: new FormControl ('', [Validators.required, Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        misc: new FormControl ('', Validators.required)
      });
      this.getSubmittedForm();
      this.messageForm.patchValue(this.data);
    }

    public data: any;

  
     onFormSubmit() {
       if (this.messageForm.valid) {
          if (this.data) {
            this._contactService.updateMessage(this.data.id, this.messageForm.value).subscribe({
                next: (val: any) => {
                  this._sweetAlerts.showSuccessAlert("Details updated successfully!");                 
                },
                error: (err: any) => {
                  // console.error(err);
                  this._sweetAlerts.showErrorAlert("Please enter Valid details!", err);                 
                },
              });
          } else {
           this._contactService.addMessage(this.messageForm.value).subscribe({
             next: (value: any) => {
              console.log("User message details",value);
                             
              this._sweetAlerts.showSuccessAlert("Message sent successfully!");                  
             },
             
             error: (err: any) => {
              //  console.error(err);
               this._sweetAlerts.showErrorAlert("Please enter Valid details!", err);
              },
            })
          }
      
        }
      }

      getSubmittedForm(){
        this._contactService.getMessages().subscribe({
          next: (value: any) => {
           console.log("the values are: ",value);
          }
        });
      }


}
