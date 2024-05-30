import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css'
})
export class ConnexionComponent {
  loginForm:FormGroup;
  error:string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router){
    this.loginForm =this.fb.group({
      email:[Validators.required,Validators.email],
      password: ['',[Validators.required]]
    })
  }
  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: () => this.router.navigate(['/']),
        error: err => this.error = 'Invalid login credentials'
      });
    }
  }

}
