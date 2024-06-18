import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService, Produit } from '../product.service';
import { Header2Component } from '../header2/header2.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { PanierService } from '../panier.service';
import { CommunicationService } from '../communcation.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, Header2Component, HttpClientModule, RouterLink],
  providers: [ProductService, PanierService, CommunicationService],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {
  produit: any;
  quantite: number = 1;
  showPopup: boolean = false;
  popupMessage: string = '';
  nombreProduitsDifferents: number = 0; // Nombre de produits différents

  private routeSub: Subscription | undefined;
  private productSub: Subscription | undefined;

  constructor(
    private productService: ProductService,
    private panierService: PanierService,
    private route: ActivatedRoute,
    private communicationService: CommunicationService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      if (id) {
        this.loadProduct(id);
      }
    });

    // Initialiser le nombre de produits différents
    this.panierService.getNombreProduitsDifferents().subscribe({
      next: (count) => {
        this.nombreProduitsDifferents = count;
      },
      error: (err) => {
        console.error('Error fetching number of different products in panier', err);
      }
    });
  }

  loadProduct(id: number) {
    if (this.productSub) {
      this.productSub.unsubscribe();
    }
    this.productSub = this.productService.getProduct(id).subscribe(produit => {
      this.produit = produit;
      this.produit = this.produit[0];
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
    if (this.productSub) {
      this.productSub.unsubscribe();
    }
  }

  incrementQuantity() {
    this.quantite++;
  }

  decrementQuantity() {
    if (this.quantite > 1) {
      this.quantite--;
    }
  }

  ajouterAuPanier() {
    const article = {
      article: this.produit.id,
      nombre: this.quantite
    };
    this.panierService.addItem(article).subscribe(
      response => {
        console.log('Article ajouté au panier avec succès : ', response);
        this.popupMessage = `${this.quantite} x ${this.produit.modele} ajouté(s) au panier.`;
        this.showPopup = true;
        setTimeout(() => {
          this.showPopup = false;
        }, 3000);

        // Mettre à jour le nombre de produits différents
        this.panierService.getNombreProduitsDifferents().subscribe({
          next: (count) => {
            this.nombreProduitsDifferents = count;
          },
          error: (err) => {
            console.error('Error fetching number of different products in panier', err);
          }
        });

        // Envoyer la notification pour rafraîchir le header
        this.communicationService.updateHeader();
      },
      error => {
        console.error('Erreur lors de l\'ajout de l\'article au panier : ', error);
      }
    );
  }
}
