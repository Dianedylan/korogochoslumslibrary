import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/sharedServices/contact.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  messageForm!: FormGroup;
  // private _contactService: any;

  constructor(
    private _fb: FormBuilder,
    private _contactService: ContactService,
    // @Inject(MAT_DIALOG_DATA) public data: any,
    
    ){

    }

    ngOnInit(): void {
      this.messageForm = this._fb.group({
        name: new FormControl ('', Validators.required),
        phone: new FormControl ('', [Validators.required, Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/)]),
        email: new FormControl('', Validators.required),
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
                  //this._coreService.openSnackBar('Employee details updated!');
                  // Swal.fire("Meal details updated successfully!", 'success');
                  // this._dialogRef.close(true);
                },
                error: (err: any) => {
                  console.error(err);
                  //Swal.fire('Please Enter valid data)', 'error');
                },
              });
          } else {
           this._contactService.addMessage(this.messageForm.value).subscribe({
             next: (value: any) => {
              console.log(value);
              
              //  console.log('valuesss', value.details[0].menuItems);
               
              //  Swal.fire("Message sent successfully!", 'success');
              //  this._dialogRef.close(true);
             },
             
             error: (err: any) => {
               console.error(err);
             // Swal.fire('Please Enter valid data)', 'error');
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
