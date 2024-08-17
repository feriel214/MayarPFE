import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = "http://127.0.0.1:8000/api/";

  constructor(private http: HttpClient) {}

  // Inscription
  inscription(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}inscription`, userData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // Connexion
  connexion(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}connexion`, credentials, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // Add Account
  addAccount(accountData: any): Observable<any> {
    const formData = new FormData();
    for (const key in accountData) {
      if (accountData.hasOwnProperty(key)) {
        formData.append(key, accountData[key]);
      }
    }
    return this.http.post(`${this.apiUrl}addAccount`, formData);
  }

  // Get User Image
  getImage(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}utilisateurs/${userId}`, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // Edition
  edition(userId: any, updateData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}users/${userId}`, updateData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}users`);
  }

  blockUser(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}blockUser/${id}`, {});
  }
}
