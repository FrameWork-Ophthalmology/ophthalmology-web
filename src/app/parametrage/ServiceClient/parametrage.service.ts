import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ParametrageService {

  constructor(private http: HttpClient) { }

  GetCompteur(code: string): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}compteur/` + code)
  }

}
