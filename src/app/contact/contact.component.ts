import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent implements OnInit {
  reactiveForm!: FormGroup; //Definite Assignment Operator to tell TypeScript it's assigned in ngOnInit()
  ngOnInit() {
    this.reactiveForm = new FormGroup({
      firstname: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      lastname: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      gender: new FormControl(null, Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phonenumber: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/),
      ]),
    });
  }
  onSubmit() {
    if (this.reactiveForm.valid) {
      console.log('Form Submitted:', this.reactiveForm.value);
    } else {
      console.log('Form is invalid!');
      this.reactiveForm.markAllAsTouched(); 
    }
  }
}
