import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { Header2Component } from '../header2/header2.component';

@Component({
  selector: 'app-param-compte',
  standalone: true,
  providers: [AuthService],
  imports: [ReactiveFormsModule, CommonModule,Header2Component,RouterLink],
  templateUrl: './param-compte.component.html',
  styleUrls: ['./param-compte.component.css']
})
export class ParamCompteComponent implements OnInit {
  userForm: FormGroup;
  passwordForm: FormGroup;
  user: any = {};
  initialUser: any = {};
  profileImage: string = 'assets/image/Image_1.png'; // Default image path

  constructor(
    private fb: FormBuilder,
    private userService: AuthService,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      first_name: [''],
      last_name: [''],
      email: ['', [Validators.required, Validators.email]],
      email2: [''],
      telephone: [''],
      addresse: [''],
      pays: [''],
      region: [''],
      code_postale: [''],
      // profile: ['']
    });

    this.passwordForm = this.fb.group({
      previous_password: ['', Validators.required],
      new_password: ['', Validators.required],
      confirm_password: ['', Validators.required]
    });
  }


  ngOnInit(): void {
    this.userService.getUser().subscribe({
      next: (data) => {
        this.user = data;
        this.initialUser = { ...data };
        this.userForm.patchValue(this.user);
        if (this.user.profile) {
          this.profileImage = this.user.profile;
        }
      },
      error: (err) => {
        console.error('Error fetching user data', err);
      }
    });
  }

  onSubmitUserForm() {
    const updatedData: any = {};
    Object.keys(this.userForm.controls).forEach(key => {
      const control = this.userForm.get(key);
      if (control) {
        updatedData[key] = control.value;
      }
    });

    this.userService.updateUser(updatedData).subscribe({
      next: () => {
        console.log('User information updated successfully');
      },
      error: (err) => {
        console.error('Error updating user information', err);
      }
    });
  }

  onSubmitPasswordForm() {
    this.userService.changePassword(this.passwordForm.value).subscribe({
      next: () => {
        console.log('Password changed successfully');
      },
      error: (err) => {
        console.error('Error changing password', err);
      }
    });
  }

  logout() {
    this.userService.logout().subscribe({
      next: () => {
        console.log('User logged out successfully');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error logging out', err);
      }
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
