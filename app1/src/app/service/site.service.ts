import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  constructor(private http: HttpClient) { }

  // private apiUrl = 'http://127.0.0.1:5000/filter-data'; // Update with your Flask API URL
  // getFilteredData(siteName: string): Observable<any[]> {
  //   const params = new HttpParams().set('site_name', siteName);
  //   return this.http.get<any[]>(this.apiUrl, { params });
  // }

// Method to call Laravel API to get site by region
getFilteredData(siteName: string): Observable<any[]> {
  return this.http.get<any[]>('http://127.0.0.1:5000/filter-data?site_name=' + siteName);
}

  // Method to call Laravel API to store site data
  storeSite(data: any): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/storesite', data);
  }

  // Method to call Laravel API to get all sites
  getAllSites(): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:8000/api/showsite');
  }

  // Method to call Laravel API to get site by ID
  getSiteById(id : any): Observable<any> {
    return this.http.get<any>(`http://127.0.0.1:8000/api/showsiteid/${id}`);
  }
  //Method to grt docfin by codesite 

  getDocById(id : any): Observable<any> {
    return this.http.get<any>(`http://127.0.0.1:8000/api/showdocfinTB/${id}`);
  }
  //Method to grt Archive by codesite 
  getArchById(id : any): Observable<any> {
    return this.http.get<any>(`http://127.0.0.1:8000/api/showArchivTB/${id}`);
  }
  // Method to call Laravel API to delete site by ID
  deleteSite(id: any): Observable<any> {
    return this.http.delete<any>(`http://127.0.0.1:8000/api/deletesite/${id}`);
  }

  // Method to call Laravel API to update site by ID
  updateSite(id: number, data: any): Observable<any> {
    return this.http.put<any>(`http://127.0.0.1:8000/api/updatesite/${id}`, data);
  }

  // Method to call Laravel API to add user data
  stoadduserimg(data: any): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/addAccount', data);
  }

// Method to call Laravel API to get site by region
getdelegbyregion(region: string): Observable<any> {
  return this.http.get<any>('http://127.0.0.1:8000/api/sites/by-region?region=' + region);
}


// Method to call Laravel API to get site by region and delegotion

getSitesByRegionAndDelegotion(region: string, delegation: string): Observable<any> {
  return this.http.get<any>('http://127.0.0.1:8000/api/sites/by-region-and-delegotion?region=' + region + '&delegotion=' + delegation);
}
/////getfinance a partir de delegation et region


getFinanciereByRegionAndDelegotion(region: string, delegation: string): Observable<any> {
  return this.http.get<any>('http://127.0.0.1:8000/api/sitestb/by-region-and-delegotion?region=' + region + '&delegotion=' + delegation);
}

///////////////// get Site by financiere delegation and region
// http://127.0.0.1:8000/api/sitestbF/by-region-and-delegotion-and-fournisseur

getSiteByRegionAndDelegotionAndFournisseur(region: string, delegation: string,fournisseur: string): Observable<any> {
  return this.http.get<any>('http://127.0.0.1:8000/api/sitestbF/by-region-and-delegotion-and-fournisseur?region=' + region + '&delegotion=' + delegation  + '&fournisseur='+ fournisseur);
}


///// api pour enregistre les archive 
// storearchive(id: any, data: any): Observable<any> {
//    return this.http.post<any>(`http://127.0.0.1:8000/api/sitesar/${id}`, data);
//  }


 storearchive(codesite: any, formData: FormData): Observable<any> {
  return this.http.post<any>(`http://127.0.0.1:8000/api/sitesar/${codesite}`, formData);
}

storefinance(codesite: any, formData: FormData): Observable<any> {
  return this.http.post<any>(`http://127.0.0.1:8000/api/docfin/${codesite}`, formData);
}


getiddocfin(codesite: any): Observable<any> {
  return this.http.get<any>(`http://127.0.0.1:8000/api/getiddoc/${codesite}`);
}




 // Method to update doc finance (PUT request)
 updateDocFinanciere(iddocfin: any, data: any): Observable<any> {
  return this.http.put<any>(`http://127.0.0.1:8000/api/docfin2/${iddocfin}`, data);
}

// Method to upload contract (POST request)
uploadContract(iddocfin: any, formData: FormData): Observable<any> {
  return this.http.post<any>(`http://127.0.0.1:8000/api/docfin3/${iddocfin}`, formData);
}


  // Method to call Laravel API to get site by ID
  getidSiteBycode(codesite: any): Observable<any> {
    return this.http.get<any>(`http://127.0.0.1:8000/api/getsiteid/${codesite}`);
  }




  // Method to call Laravel API to store CELLULE2G data
  storeCel2G(idSite: any,data: any): Observable<any> {
    return this.http.post<any>(`http://127.0.0.1:8000/api/cel2Gadd/${idSite}`, data);
  }



 // Method to update CEL2G (PUT request)
 updatecel2G(idCel: any, data: any): Observable<any> {
  return this.http.put<any>(`http://127.0.0.1:8000/api/cel2Gupdate/${idCel}`, data);
}


 // Method to call Laravel API to get site by ID
 getidBycode2G(codeCellule: any): Observable<any> {
  return this.http.get<any>(`http://127.0.0.1:8000/api/getidCel2G/${codeCellule}`);
}


  // Method to call Laravel API to getCEL2G by ID
  getcel2GById(idCel : any): Observable<any> {
    return this.http.get<any>(`http://127.0.0.1:8000/api/showidCel2G/${idCel}`);
  }


  // Method to call Laravel API to getCEL3G by codesite
  getcel3GByCode(codesite : any): Observable<any> {
    return this.http.get<any>(`http://127.0.0.1:8000/api/showCel3Gbycode/${codesite}`);
  }

  // Method to call Laravel API to getCEL2G by codesite
  getcel2GByCode(codesite : any): Observable<any> {
    return this.http.get<any>(`http://127.0.0.1:8000/api/showCel2Gbycode/${codesite}`);
  }
    // Method to call Laravel API to getCEL2G by codesite
    getcel4GByCode(codesite : any): Observable<any> {
      return this.http.get<any>(`http://127.0.0.1:8000/api/showCel4Gbycode/${codesite}`);
    }


  

  // Method to call Laravel API to store CELLULE3G data
 storeCel3G(idSite: any,data: any): Observable<any> {
    return this.http.post<any>(`http://127.0.0.1:8000/api/cel3Gadd/${idSite}`, data);
  }


 // Method to update CEL3G (PUT request)
 updatecel3G(idcel: any, data: any): Observable<any> {
  return this.http.put<any>(`http://127.0.0.1:8000/api/cel3Gupdate/${idcel}`, data);
}


 // Method to call Laravel API to get site by ID
 getidBycode3G(codeCellule: any): Observable<any> {
  return this.http.get<any>(`http://127.0.0.1:8000/api/getidCel3G/${codeCellule}`);
}


  // Method to call Laravel API to getCEL3G by ID
  getcel3GById(idcel : any): Observable<any> {
    return this.http.get<any>(`http://127.0.0.1:8000/api/showidCel3G/${idcel}`);
  }




  // Method to call Laravel API to store CELLULE3G data
  storeCel4G(idSite: any,data: any): Observable<any> {
    return this.http.post<any>(`http://127.0.0.1:8000/api/cel4Gadd/${idSite}`, data);
  }


 // Method to update CEL3G (PUT request)
 updatecel4G(idCel: any, data: any): Observable<any> {
  return this.http.put<any>(`http://127.0.0.1:8000/api/cel4Gupdate/${idCel}`, data);
}


 // Method to call Laravel API to get site by ID
 getidBycode4G(codeCellule: any): Observable<any> {
  return this.http.get<any>(`http://127.0.0.1:8000/api/getidCel4G/${codeCellule}`);
}


  // Method to call Laravel API to getCEL3G by ID
  getcel4GById(idCel : any): Observable<any> {
    return this.http.get<any>(`http://127.0.0.1:8000/api/showidCel4G/${idCel}`);
  }



































}
