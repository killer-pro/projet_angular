import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService,Produit } from '../product.service';
import { Header1Component } from '../header1/header1.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule,Header1Component,HttpClientModule],
  providers:[ProductService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit,OnDestroy{
  produit: any;
  quantite: number = 1;

  private routeSub: Subscription | undefined;
  private productSub: Subscription | undefined;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ){}


ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      if (id) {
        this.loadProduct(id);
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
}

