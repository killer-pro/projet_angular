import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';


export interface Produit{
    'modele':string,
    'marque':string,
    'description':string,
    'categorie':string,
    'prix':GLfloat,
    'quantite':boolean,
    'etoile':number,
    'image':string,
    'id':number,
}
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl="http://127.0.0.1:8000/produits/"
  private apiItem="http://127.0.0.1:8000/produit_item/"
  private searchUrl="http://127.0.0.1:8000/recherche/"


  constructor(private http:HttpClient) { }


  getProducts():Observable<Produit[]>{
    return this.http.get<Produit[]>(this.apiUrl)
  }
  getProduct(id:number):Observable<Produit>{
    return this.http.get<Produit>(`${this.apiItem}${id}/`)
  }
  getRecherche(search:string):Observable<Produit[]>{
    return this.http.get<Produit[]>(`${this.searchUrl}${search}`)

  }
  // getProductByRef(id: string): Observable<Produit> {
  //   const url = ${this.apiUrl}${id}/; 
  //   return this.http.get<Produit>(url);
  // }
}