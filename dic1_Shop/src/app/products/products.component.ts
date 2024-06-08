import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CategorieService } from '../categorie.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Header2Component } from '../header2/header2.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, HttpClientModule, Header2Component,RouterLink],
  templateUrl: './products.component.html',
  providers: [ProductService, CategorieService],
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  selectedCategory: string = 'tous';

  constructor(private ProductService: ProductService, private CategorieService: CategorieService) { }

  ngOnInit(): void {
    this.CategorieService.getCategorie().subscribe(data => {
      this.categories = data;
    });

    this.ProductService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  onCategoryChange(event: any): void {
    const categorie = event.target.value;
    this.selectedCategory = categorie;
    console.log("Catégorie sélectionnée :", categorie);
  }

  isProductVisible(produitCategorie: string): boolean {
    return this.selectedCategory === 'tous' || produitCategorie === this.selectedCategory;
  }
}
