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


  
  //// Admission
  GetAdmission(): Observable<any> {

    return this.http.get(`${environment.API_RECEPTION}admission/all` )
  }

  GetAdmissionByCode(code:number): Observable<any> {

    return this.http.get(`${environment.API_RECEPTION}admission/`+code )
  }


  GetAdmissionByCodeNatureAdmission(codeNatureAdmission : any): Observable<any> {

    return this.http.get(`${environment.API_RECEPTION}admission/findByCodeNatureAdmission?codeNatureAdmission=`+codeNatureAdmission )
  }

  GetAdmissionForOPD(): Observable<any> {

    return this.http.get(`${environment.API_RECEPTION}admission/findForOPD` )
  }


  GetAdmissionByCodePatient(codePatient : any): Observable<any> {

    return this.http.get(`${environment.API_RECEPTION}admission/findByCodePatient?codePatient=`+codePatient )
  }
  GetAdmissionByCodeNatureAdmissionAndCodeMedecin(codeNatureAdmission : any,codeMedecin : any): Observable<any> {

    return this.http.get(`${environment.API_RECEPTION}admission/findByCodeNatureAdmission?codeNatureAdmission=`+codeNatureAdmission `&codeMedecin=`+codeMedecin )
  }


  
  //// PlanningCabinet
  GetPlanningCabinetAll(): Observable<any> {

    return this.http.get(`${environment.API_RECEPTION}planning_cabinet/all` )
  }
  GetPlanningCabinetByActif(actif : boolean): Observable<any> {

    return this.http.get(`${environment.API_RECEPTION}planning_cabinet/findBy?actif=`+actif )
  }
  

  GetPlanningCabinetByActifAndDateExiste(actif : any,dateDebut : any , dateFin :any): Observable<any> {

    return this.http.get(`${environment.API_RECEPTION}planning_cabinet/findByDateAndActif?actif=`+actif + `&dateDebut=`+dateDebut + `&dateFin=`+dateFin )
  }
  GetPlanningCabinetByDateExiste(dateDebut : any , dateFin :any): Observable<any> {

    return this.http.get(`${environment.API_RECEPTION}planning_cabinet/findByDate?dateDebut=`+dateDebut + `&dateFin=`+dateFin )
  }
  

  GetPlanningCabinetByCode(code:number): Observable<any> {

    return this.http.get(`${environment.API_RECEPTION}planning_cabinet/`+code )
  }

  GetPlanningCabinetByDate(dateDispo:any,dateFin:any): Observable<any> {

    return this.http.get(`${environment.API_RECEPTION}planning_cabinet/findByDate?dateDebut=`+dateDispo`&dateFin=`+dateFin)
  }

  PostPlanningCabinet(body: any) {
    return this.http.post(`${environment.API_RECEPTION}planning_cabinet`, body);
  } 

  PostPlanningCabinetList(body: any) {
    return this.http.post(`${environment.API_RECEPTION}planning_cabinet/List`, body);
  } 


  UpdatePlanningCabinet(body: any) {
    return this.http.put(`${environment.API_RECEPTION}planning_cabinet/update`, body);
  }

  DeletePlanningCabinet(code: any) {
    return this.http.delete(`${environment.API_RECEPTION}planning_cabinet/delete/`+code);
  }
}
