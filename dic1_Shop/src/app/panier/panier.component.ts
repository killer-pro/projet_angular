import { Component, OnInit } from '@angular/core';
import { PanierService, Article } from '../panier.service';
import { Header2Component } from '../header2/header2.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-panier',
  standalone: true,
  providers: [PanierService],
  imports: [Header2Component, CommonModule, FormsModule, RouterLink],
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  panierItems: Article[] = [];
  subtotal: number = 0;
  finalTotal: number = 0;
  frais: number = 16;
  taxe: number = 21.99;
  reduction: number = 0;
  nombreProduitsDifferents: number = 0;

  constructor(
    private panierService: PanierService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.loadPanierItems();
  }

  loadPanierItems() {
    this.panierService.getPanier().subscribe(
      (items: Article[]) => {
        this.panierItems = items;
        this.calculateTotals();
        this.nombreProduitsDifferents = items.length;
      },
      error => {
        this.router.navigate(['/connexion'], { queryParams: { returnUrl: this.route.snapshot.url.join('/'), loginRequired: true } });
        console.error('Erreur lors de la récupération du panier', error);
      }
    );
  }

  calculateTotals() {
    this.subtotal = this.panierItems.reduce((sum, item) => sum + item.article_detail.prix * item.nombre, 0);
    this.finalTotal = this.subtotal + this.frais + this.taxe - this.reduction;
  }

  increaseQuantity(item: Article) {
    item.nombre++;
    this.onQuantityChange();
  }

  decreaseQuantity(item: Article) {
    if (item.nombre > 1) {
      item.nombre--;
      this.onQuantityChange();
    }
  }

  onQuantityChange() {
    this.calculateTotals();
  }

  deleteItem(articleId: number) {
    this.panierService.deleteItem(articleId).subscribe({
      next: () => {
        this.nombreProduitsDifferents--;
        this.loadPanierItems();
      },
      error: (err) => {
        console.error('Erreur lors de la suppression de l\'article du panier', err);
      }
    });
  }
}
