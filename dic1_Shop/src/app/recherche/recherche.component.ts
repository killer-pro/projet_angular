import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CategorieService } from '../categorie.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Header2Component } from '../header2/header2.component';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-recherche',
  standalone: true,
  providers: [ProductService, CategorieService],
  imports: [CommonModule, HttpClientModule, Header2Component,RouterLink],
  templateUrl: './recherche.component.html',
  styleUrl: './recherche.component.css'
})
export class RechercheComponent implements OnInit{
  products: any[] = [];
  categories: any[] = [];
  selectedCategory: string = 'tous';
  private routeSub: Subscription | undefined;

  constructor(
    private productService: ProductService,
    private categorieService: CategorieService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.categorieService.getCategorie().subscribe(data => {
      this.categories = data;
    });

    this.routeSub = this.route.paramMap.subscribe(params => {
      const search = params.get('search')!;
      this.loadProduct(search);
    });
  }

  loadProduct(search: string): void {
    this.productService.getRecherche(search).subscribe(data => {
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
