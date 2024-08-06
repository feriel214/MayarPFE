import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Fournisseur } from '../models/fournisseur.model';
import { Secteur } from '../models/secteur.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private endpoint = 'http://127.0.0.1:8000/api/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  // Regions

  getAllRegions(): Observable<any[]> {
    return this.http.get<any[]>(this.endpoint + 'GetAll');
  }

  getRegionById(id: number): Observable<any> {
    return this.http.get<any>(this.endpoint + 'GetById/' + id);
  }

  addRegion(region: any): Observable<any> {
    return this.http.post<any>(this.endpoint + 'AddReg', region);
  }

  editRegion(id: number, region: any): Observable<any> {
    return this.http.put<any>(this.endpoint + 'update/' + id, region);
  }

  deleteRegionById(id: number): Observable<any> {
    return this.http.delete<any>(this.endpoint + 'deleteByIdReg/' + id);
  }

  deleteRegionByName(name: string): Observable<any> {
    return this.http.delete<any>(this.endpoint + 'DeleteByName/' + name);
  }

  // Delegations

  getAllDelegations(): Observable<any[]> {
    return this.http.get<any[]>(this.endpoint + 'delegations');
  }

  getDelegationById(id: number): Observable<any> {
    return this.http.get<any>(this.endpoint + 'delegations/' + id);
  }

  addDelegation(delegation: any): Observable<any> {
    return this.http.post<any>(this.endpoint + 'delegations', delegation);
  }

  editDelegation(id: number, delegation: any): Observable<any> {
    return this.http.put<any>(this.endpoint + 'delegations/' + id, delegation);
  }

  deleteDelegationById(id: number): Observable<any> {
    return this.http.delete<any>(this.endpoint + 'delegations/' + id);
  }


  //Secteureus 

   // Get all secteurs
   getSecteurs(): Observable<Secteur[]> {
    return this.http.get<Secteur[]>(this.endpoint+'secteurs');
  }

  // Get a secteur by ID
  getSecteurById(id: number): Observable<Secteur> {
    const url = `${this.endpoint}secteurs/${id}`;
    return this.http.get<Secteur>(url);
  }

  // Create a new secteur
  createSecteur(secteur: Secteur): Observable<Secteur> {
    return this.http.post<Secteur>(this.endpoint+'secteurs', secteur, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  // Update a secteur
  updateSecteur(id: number, secteur: Secteur): Observable<Secteur> {
    const url = `${this.endpoint}secteurs/${id}`;
    return this.http.put<Secteur>(url, secteur, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  // Edit a secteur
  editSecteur(id: number, partialSecteur: Partial<Secteur>): Observable<Secteur> {
    const url = `${this.endpoint}secteurs/${id}`;
    return this.http.patch<Secteur>(url, partialSecteur, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  // Delete a secteur
  deleteSecteur(id: number): Observable<void> {
    const url = `${this.endpoint}secteurs/${id}`;
    return this.http.delete<void>(url);
  }

 
// Get all fournisseurs
getFournisseurs(): Observable<Fournisseur[]> {
  return this.http.get<Fournisseur[]>(this.endpoint+'fournisseurs')
    .pipe(
      catchError(this.handleError<Fournisseur[]>('getFournisseurs', []))
    );
}

// Create a new fournisseur
addFournisseur(fournisseur: Fournisseur): Observable<Fournisseur> {
  return this.http.post<Fournisseur>(this.endpoint+'fournisseurs', fournisseur, this.httpOptions)
    .pipe(
      catchError(this.handleError<Fournisseur>('addFournisseur'))
    );
}

// Get a fournisseur by ID
getFournisseur(id: number): Observable<Fournisseur> {
  const url = `${this.endpoint}fournisseurs/${id}`;
  return this.http.get<Fournisseur>(url)
    .pipe(
      catchError(this.handleError<Fournisseur>(`getFournisseur id=${id}`))
    );
}

// Update a fournisseur
updateFournisseur(id: number, fournisseur: Fournisseur): Observable<any> {
  const url = `${this.endpoint}fournisseurs/${id}`;
  return this.http.put(url, fournisseur, this.httpOptions)
    .pipe(
      catchError(this.handleError<any>('updateFournisseur'))
    );
}

// Delete a fournisseur by ID
deleteFournisseur(id: number): Observable<Fournisseur> {
  const url = `${this.endpoint}fournisseurs/${id}`;
  return this.http.delete<Fournisseur>(url, this.httpOptions)
    .pipe(
      catchError(this.handleError<Fournisseur>('deleteFournisseur'))
    );
}

// Handle HTTP errors
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.error(`${operation} failed: ${error.message}`);
    return of(result as T);
  };
}

}
