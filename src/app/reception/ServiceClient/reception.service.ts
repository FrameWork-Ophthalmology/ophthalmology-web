import { Injectable } from '@angular/core';
 
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReceptionService {

  constructor(private http: HttpClient) { }

  PostAdmission(body: any) {
    return this.http.post(`${environment.API_RECEPTION}admission`, body);
  } 


  
  //// Patient
  GetPatient(): Observable<any> {

    return this.http.get(`${environment.API_RECEPTION}patient/all` )
  }

  GetPatientByCode(code:number): Observable<any> {

    return this.http.get(`${environment.API_RECEPTION}patient/`+code )
  }

  GetPatientByNomLike(nomPatient:string): Observable<any> {

    return this.http.get(`${environment.API_RECEPTION}patient/q?nomPatient=`+nomPatient )
  }

  PostPatient(body: any) {
    return this.http.post(`${environment.API_RECEPTION}patient`, body);
  } 
}
