import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Header1Component } from '../header1/header1.component';

@Component({
  selector: 'app-inscription2',
  standalone: true,
  providers: [AuthService],
  imports: [CommonModule, ReactiveFormsModule, Header1Component,RouterLink],
  templateUrl: './iscription2.component.html',
  styleUrls: ['./iscription2.component.css']
})
export class Iscription2Component implements OnInit {
  inscriptionForm: FormGroup;
  user: any;
  errors: any = {};

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.inscriptionForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit() {
    const user = localStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user);
    } else {
      this.router.navigate(['/inscription1']);
    }
  }

  onSubmit() {
    if (this.inscriptionForm.valid) {
      const { password, confirmPassword } = this.inscriptionForm.value;
      if (password !== confirmPassword) {
        this.errors = { confirmPassword: ['Les mots de passe ne correspondent pas.'] };
        return;
      }

      this.user.password = password;

      this.authService.register(this.user).subscribe({
        next: (response) => {
          localStorage.removeItem('user');
          localStorage.setItem('token', response.token);
          this.router.navigate(['/connexion']);
        },
        error: (err) => {
          this.errors = err.error;
        }
      });
    }
  }

  get password() {
    return this.inscriptionForm.get('password');
  }

  get confirmPassword() {
    return this.inscriptionForm.get('confirmPassword');
  }
}
