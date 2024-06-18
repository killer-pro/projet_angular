import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Header1Component } from '../header1/header1.component';
import { first } from 'rxjs';


@Component({
  selector: 'app-iscription1',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Header1Component,RouterLink],
  templateUrl: './iscription1.component.html',
  styleUrl: './iscription1.component.css'
})
export class Iscription1Component {
  inscriptionForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.inscriptionForm = this.fb.group({
      username: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      date_naissance: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.inscriptionForm.valid) {
      const user = this.inscriptionForm.value;
      localStorage.setItem('user', JSON.stringify(user));
      this.router.navigate(['/inscription2']);
    }
  }

  get prenom() {
    return this.inscriptionForm.get('prenom');
  }
  get username() {
    return this.inscriptionForm.get('username');
  }

  get nom() {
    return this.inscriptionForm.get('nom');
  }

  get date_naissance() {
    return this.inscriptionForm.get('date_naissance');
  }

  get email() {
    return this.inscriptionForm.get('email');
  }

}
