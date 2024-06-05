import { Component,OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Header2Component } from '../header2/header2.component';

@Component({
  selector: 'app-info-compte',
  standalone: true,
  providers: [AuthService],
  imports: [RouterLink,CommonModule,Header2Component],
  templateUrl: './info-compte.component.html',
  styleUrl: './info-compte.component.css'
})
export class InfoCompteComponent {
parseInt(arg0: any) {
throw new Error('Method not implemented.');
}
  user: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => {
        console.error('Error fetching user data', err);
      }
    });
  }
}
