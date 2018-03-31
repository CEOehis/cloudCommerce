import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;
  name: FormControl;
  email: FormControl;
  subject: FormControl;
  message: FormControl;

  subjects: string[] = [
    'inferior product',
    'cancel purchase',
    'positive review',
    'negative review',
    'other'
  ]
  constructor() { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.name = new FormControl('', [Validators.required, Validators.minLength(4)]),
    this.email = new FormControl('',[Validators.email, Validators.required]),
    this.subject = new FormControl('', Validators.required),
    this.message = new FormControl('',Validators.required)
  }

  createForm() {
    this.contactForm = new FormGroup({
      name: this.name,
      email: this.email,
      subject: this.subject,
      message: this.message
    })
  }

}
