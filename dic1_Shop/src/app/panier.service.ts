import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Produit {
  modele: string;
  marque: string;
  description: string;
  categorie: string;
  prix: number;
  quantite: boolean;
  etoile: number;
  image: string;
  id: number;
}

export interface Article {
  article: Produit;
  nombre: number;
}

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  private apiUrl = 'http://127.0.0.1:8000/panier/';

  constructor(private http: HttpClient) { }
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    });
  }

  getPanierItems(): Observable<Article[]> {
    const headers = this.getHeaders();
    return this.http.get<Article[]>(this.apiUrl,{headers});
  }

  deleteItem(articleId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.apiUrl}${articleId}/`,{headers});
  }
}
