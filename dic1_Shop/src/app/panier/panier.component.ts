import { Component,OnInit } from '@angular/core';
import { PanierService,Article } from '../panier.service';
import { Header2Component } from '../header2/header2.component';
import { CommonModule } from '@angular/common';
import { PanierItemComponent } from '../panier-item/panier-item.component';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-panier',
  standalone: true,
  providers:[PanierService],
  imports: [Header2Component,CommonModule,PanierItemComponent,FormsModule,RouterLink],
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.css'
})
export class PanierComponent implements OnInit {
  panierItems: Article[] = [];
  subtotal: number = 0;
  finalTotal: number = 0;
  frais: number = 16;
  taxe: number = 21.99;
  reduction: number = 0;

  constructor(private panierService: PanierService) {}

  ngOnInit(): void {
    this.loadPanierItems();
  }

  loadPanierItems() {
    this.panierService.getPanierItems().subscribe(items => {
      this.panierItems = items;
      this.calculateTotals();
    });
  }

  calculateTotals() {
    this.subtotal = this.panierItems.reduce((sum, item) => sum + item.article.prix * item.nombre, 0);
    this.finalTotal = this.subtotal + this.frais + this.taxe - this.reduction;
  }

  onQuantityChange() {
    this.calculateTotals();
  }

  deleteItem(articleId: number) {
    this.panierService.deleteItem(articleId).subscribe(() => {
      this.loadPanierItems();
    });
  }

  incrementQuantity(item: Article) {
    item.nombre += 1;
    this.onQuantityChange();
  }

  decrementQuantity(item: Article) {
    if (item.nombre > 1) {
      item.nombre -= 1;
      this.onQuantityChange();
    }
  }
}