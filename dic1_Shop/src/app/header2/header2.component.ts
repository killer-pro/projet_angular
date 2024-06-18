import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { PanierService } from '../panier.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header2',
  standalone: true,
  imports: [RouterLink, FormsModule,CommonModule],
  providers: [AuthService, PanierService],
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.css']
})
export class Header2Component implements OnInit {
  searchTerm: string = '';
  user: any = {};
  nombreProduitsDifferents: number = 0;

  constructor(private authService: AuthService, private panierService: PanierService) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => {
        console.error('Error fetching user data', err);
      }
    });

    this.panierService.getNombreProduitsDifferents().subscribe({
      next: (count) => {
        this.nombreProduitsDifferents = count;
      },
      error: (err) => {
        console.error('Error fetching number of different products in panier', err);
      }
    });
  }
}
