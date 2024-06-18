import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  onAddItem: EventEmitter<void> = new EventEmitter<void>();

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

  getNombreProduitsDifferents(): Observable<number> {
    const headers = this.getHeaders();
    return this.http.get<Article[]>(this.apiUrl, { headers }).pipe(
      map(items => items.length)
    );
  }

  addItem(article: { article: number; nombre: number }): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(this.apiUrl, article, { headers }).pipe(
      map(response => {
        this.onAddItem.emit(); // Émettre l'événement d'ajout d'article
        return response;
      })
    );
  }

  deleteItem(articleId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.apiUrl}${articleId}/`, { headers });
  }
}
