import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from 'src/app/sharedServices/contact.service';
// import { FormsModule,  } from '@angular/forms';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  messageForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _contactService: ContactService,
    // @Inject(MAT_DIALOG_DATA) public data: any,
    
    ){
      this.messageForm = this._fb.group({
        //  id: new FormControl(""),
        //  itemUrl: new FormControl("", Validators.required),
         name:'',
         phone: '',
         email: '',
         misc: ''
       });
    }

    ngOnInit(): void {
      this.messageForm.patchValue(this.data);
    }

    public data: any;
  
     onFormSubmit(data: any) {
       if (this.messageForm.valid) {
           this._contactService.addMessage(this.messageForm.value).subscribe({
             next: (value: any) => {
               console.log('valuesss', value.details[0].menuItems);
               
               //this._coreService.openSnackBar('Employee added successfully');
              //  Swal.fire("Message sent successfully!", 'success');
              //  this._dialogRef.close(true);
             },
             
             error: (err: any) => {
               console.error(err);
             // Swal.fire('Please Enter valid data)', 'error');
             },
           });
      
        }
     }

}
