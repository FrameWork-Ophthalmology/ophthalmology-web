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

  
  /// Prestation 


  GetPrestation(): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}prestation/all`);
  }



  GetPrestationByActif(bool: boolean): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}prestation/findBy?actif=` + bool);
  }

 


  GetPrestationConsultation(codeNatureAdmission: number): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}prestation/prestationConsultation?CodeNatureAdmission=` + codeNatureAdmission);
  }






  GetPrestationByCode(code: number): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}prestation/` + code);
  }


  GetPrestationByCodeSousFamille(codeSousFamille: number): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}prestation/findBySousFamille?codeSousFamille=` + codeSousFamille);
  }

  GetPrestationByCodeTypePrestation(codeTypePrestation: number): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}prestation/findByTypePrestation?codeTypePrestation=` + codeTypePrestation);
  }



  GetPrestationByCodeIn(codes: number[]): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}prestation/FindByCodeIn?code=` + codes);
  }


  GetDetailsPrestationByCode(code: number): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}details_prestation/` + code);
  }


  GetDetailsPrestationByCodeAndCodeNatureAdmission(codePrestation: number, codeNatureAdmission: number): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}details_prestation/By?codePrestation=` + codePrestation + `&codeNatureAdmission=` + codeNatureAdmission);
  }




  PostPrestation(body: any) {

    return this.http.post(`${environment.API_Parametrage}prestation`, body);
  }
  UpdatePrestation(body: any) {

    return this.http.put(`${environment.API_Parametrage}prestation/update`, body);
  }

  DeletePrestation(code: any) {

    return this.http.delete(`${environment.API_Parametrage}prestation/delete/` + code);
  }



}
