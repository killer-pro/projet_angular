import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000'; // URL de votre API Django

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login/`, { email, password }).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
        // console.log(response);
        
      })
    );
  }

  logout(): Observable<any> {
    const headers = this.getHeaders();
    localStorage.removeItem('token');
    return this.http.post(`${this.apiUrl}/logout/`, {}, { headers });
  }
  

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup/`, user);
  }

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

  getUser(): Observable<any> {
    const headers = this.getHeaders();
    // console.log(headers);
    return this.http.get(`${this.apiUrl}/user/`, { headers });
  }

  updateUser(updatedData: FormData): Observable<any> {
    const headers = this.getHeaders().delete('Content-Type'); // Remove 'Content-Type' header
    return this.http.put(`${this.apiUrl}/update/`, updatedData, { headers });
  }
  

  changePassword(data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.apiUrl}/user/change-password/`, data,{headers});
  }

}

