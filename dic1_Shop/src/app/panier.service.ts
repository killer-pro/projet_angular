// panier.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ArticleDetail {
  id: number;
  modele: string;
  marque: string;
  description: string;
  prix: number;
  quantite: number;
  etoile: number;
  image: string;
}

export interface Article {
  id: number;
  article: number;
  article_detail: ArticleDetail;
  client: number;
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

  getPanier(): Observable<Article[]> {
    const headers = this.getHeaders();
    return this.http.get<Article[]>(this.apiUrl, { headers });
  }

  addItem(article: { article: number; nombre: number }): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(this.apiUrl, article, { headers });
  }

  deleteItem(articleId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.apiUrl}${articleId}/`, { headers });
  }
}
