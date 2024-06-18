import { Component,OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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

  constructor(
    private authService: AuthService,
    private router: Router,
    private route:ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe({
      next: (data) => {
        this.user = data;
        if (this.user.profile) {
          this.user.profile = `http://127.0.0.1:8000${this.user.profile}`;
        } else {
          this.user.profile = 'assets/image/logo.png';
        }
      },
      error: (err) => {
        // this.router.navigate(['/connexion']);
        this.router.navigate(['/connexion'], { queryParams: { returnUrl: this.route.snapshot.url.join('/'), loginRequired: true } });
        console.error('Error fetching user data', err);
      }
    });
  }
}
