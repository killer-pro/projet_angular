import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Categorie{
  'nom_categorie' : String,
}


@Injectable({
  providedIn: 'root'
})

export class CategorieService {

  private apiUrl="http://127.0.0.1:8000/categories/"

  constructor(private http:HttpClient) { }
  
  getCategorie():Observable<Categorie[]>{
    return this.http.get<Categorie[]>(this.apiUrl)
  }
  
}
