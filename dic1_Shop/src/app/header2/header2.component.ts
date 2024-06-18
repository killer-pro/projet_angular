import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { PanierService } from '../panier.service';
import { Subscription } from 'rxjs';
import { CommunicationService } from '../communcation.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header2',
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.css'],
  standalone: true,
  providers: [AuthService, PanierService, CommunicationService],
  imports: [CommonModule, FormsModule, RouterLink]
})
export class Header2Component implements OnInit, OnDestroy {
  @Input() nombreProduitsDifferents: number = 0;

  searchTerm: string = '';
  user: any = {};
  private headerUpdateSubscription: Subscription | undefined;

  constructor(
    private authService: AuthService,
    private panierService: PanierService,
    private communicationService: CommunicationService,
  ) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe({
      next: (data) => {
        this.user = data;
        if (this.user.profile) {
          this.user.profile = `http://127.0.0.1:8000${this.user.profile}`;
        } else {
          this.user.profile = 'assets/image/user.svg';
        }
      },
      error: (err) => {
        console.error('Error fetching user data', err);
      }
    });

    if (this.nombreProduitsDifferents === 0) {
      this.panierService.getNombreProduitsDifferents().subscribe({
        next: (count) => {
          this.nombreProduitsDifferents = count;
        },
        error: (err) => {
          console.error('Error fetching number of different products in panier', err);
        }
      });
    }

    this.headerUpdateSubscription = this.communicationService.headerUpdate$.subscribe(() => {
      this.panierService.getNombreProduitsDifferents().subscribe({
        next: (count) => {
          this.nombreProduitsDifferents = count;
        },
        error: (err) => {
          console.error('Error fetching number of different products in panier', err);
        }
      });
    });
  }

  ngOnDestroy(): void {
    if (this.headerUpdateSubscription) {
      this.headerUpdateSubscription.unsubscribe();
    }
  }
}
