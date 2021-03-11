import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-customer-contact-form',
  templateUrl: './customer-contact-form.component.html',
  styleUrls: ['./customer-contact-form.component.css']
})
export class CustomerContactFormComponent implements OnInit {

  ngOnInit(): void {
  }

  form: FormGroup;
  constructor(fb: FormBuilder) {
    this.form = fb.group({
      firstName: [ 'John' ],
      lastName: [ 'Doe' ],
      // new FormArray object:
      phoneNumbers: fb.array([fb.group({
        alias: ['Home'],
        number: ['555-555-5555']
      })]),
      address: fb.group({
        street: [''],
        city: [''],
        state: [''],
        zip: ['']
      })
    });
  }

  get phoneNumbers(): FormArray {
    return this.form.get('phoneNumbers') as FormArray;
  }

  addPhone() {
    this.phoneNumbers.push(new FormGroup({
      'alias': new FormControl(''),
      'number': new FormControl('')
    }));
  }

  reset() {
    this.form.controls['firstName'].setValue('');
    this.form.controls['lastName'].setValue('');
    this.resetAddress();
  }

  resetAddress() {
    this.form.patchValue({
      address: {
        street: '',
        city: '',
        state: '',
        zip: '',
      }
    });
  }

  fillDefaultAddress() {
    this.form.patchValue({
      address: {
        street: '456 Default St',
        city: 'Defaultolopolis',
        state: 'CA',
        zip: '90000',
      }
    });
  }

}
