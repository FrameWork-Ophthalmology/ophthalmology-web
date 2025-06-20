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


  GetPrestationConsultationByCodeMedecinAndCodeNatureAdmission(codeMedecin: any, codeNatureAdmission: number) {
    return this.http.get(`${environment.API_Parametrage}prestation_consultation/codeMedecin?codeMedecin=` + codeMedecin + `&codeNatureAdmission=` + codeNatureAdmission);
  }
  GetPrestationConsultationByCodeMedecin(codeMedecin: any) {
    return this.http.get(`${environment.API_Parametrage}prestation_consultation/codeMedecin?codeMedecin=` + codeMedecin);
  }

  GetDetailsPriceListByCodePriceListAndCodePrestationAnd(codePriceList: number, codePrestation: any, codeNatureAdmission: number): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}details_price_list/findBy?codePriceList=` + codePriceList + `&codePrestation=` + codePrestation + `&codeNatureAdmission=` + codeNatureAdmission);
  }

  
  // mode reglement




  GetModeReglement(): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}mode_reglement/all`);
  }


  GetModeReglementByCode(code: number) {

    return this.http.get(`${environment.API_Parametrage}mode_reglement/` + code)
  }
  PostModeReglement(body: any): Observable<any> {

    return this.http.post(`${environment.API_Parametrage}mode_reglement`, body)
  }

  UpdateModeReglement(body: any) {

    return this.http.put(`${environment.API_Parametrage}mode_reglement/update`, body);
  }

  DeleteModeReglement(code: any) {

    return this.http.delete(`${environment.API_Parametrage}mode_reglement/delete/` + code);
  }


  

  /// Societe 


  GetSociete(): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}societe/all`);
  }

  GetSocieteActif(): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}societe/findBy?actif=true`);
  }


  GetSocieteInActif(): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}societe/findBy?actif=false`);
  }


  PostSociete(body: any) {

    return this.http.post(`${environment.API_Parametrage}societe`, body);
  }
  UpdateSociete(body: any) {

    return this.http.put(`${environment.API_Parametrage}societe/update`, body);
  }

  DeleteSociete(code: any) {

    return this.http.delete(`${environment.API_Parametrage}societe/delete/` + code);
  }


  
 

  GetParam(codeParam: string): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}param/code?codeParam=` + codeParam)
  }




  
  //// convention 

  GetAllConvention(): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}convention/all`);
  }


  GetConventionByCode(code: number): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}convention/` + code);
  }

  GetConventionByCodeSociete(codeSociete: number): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}convention/BySociete?code=` + codeSociete);
  }


  GetConventionActif(): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}convention/findBy?actif=true `);
  }

  GetConventionInActif(): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}convention/findBy?actif=false`);
  }
  PostConvention(body: any) {

    return this.http.post(`${environment.API_Parametrage}convention`, body);
  }

  UpdateConvention(body: any) {

    return this.http.put(`${environment.API_Parametrage}convention/update`, body);
  }

  DeleteConvention(code: any) {

    return this.http.delete(`${environment.API_Parametrage}convention/delete/` + code);
  }


  
  /// ListCouverture 


  GetListCouverture(): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}list_couverture/all`);
  }



  GetDetailsListCouverturePrestationByCodeListCouverture(codeListCouverture: number): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}list_couverture/prestation?codeListCouverture=` + codeListCouverture);
  }

  GetDetailsListCouverturePrestationByCodeListCouvertureAndCodePrestationAndCodeNatureAdmission(codeListCouverture: number, codePrestation: any, codeNatureAdmission: any): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}list_couverture/prestation/findBy?codeListCouverture=` + codeListCouverture + `&codePrestation=` + codePrestation + `&codeNatureAdmission=` + codeNatureAdmission);
  }
  GetDetailsListCouvertureoperationByCodeListCouverture(codeListCouverture: number): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}list_couverture/operation?codeListCouverture=` + codeListCouverture);
  }

  GetListCouvertureActif(): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}list_couverture/findBy?actif=true`);
  }


  GetListCouvertureInActif(): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}list_couverture/findBy?actif=false`);
  }


  GetListCouvertureByCode(code: number): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}list_couverture/` + code);
  }



  GetListCouvertureByCodeSociete(codeSociete: number): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}list_couverture/societe?codeSociete=` + codeSociete);
  }



  PostListCouverture(body: any) {

    return this.http.post(`${environment.API_Parametrage}list_couverture`, body);
  }
  PostListCouvertureNew(body: any) {

    return this.http.post(`${environment.API_Parametrage}list_couvertures`, body);
  }
  UpdateListCouverture(body: any) {

    return this.http.put(`${environment.API_Parametrage}list_couverture/update`, body);
  }

  DeleteListCouverture(code: any) {

    return this.http.delete(`${environment.API_Parametrage}list_couverture/delete/` + code);
  }


  
  //// Banque
  GetBanque(): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}banque/all`)
  }

  GetBanqueByCode(code: number): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}banque/` + code)
  }

  PostBanque(body: any) {
    return this.http.post(`${environment.API_Parametrage}banque`, body);
  }
  UpdateBanque(body: any) {
    return this.http.put(`${environment.API_Parametrage}banque/update`, body);
  }

  DeleteBanque(code: any) {
    return this.http.delete(`${environment.API_Parametrage}banque/delete/` + code);
  }


  

  //// Medecin
  GetMedecin(): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}medecin/all`)
  }



  GetMedecinActif(): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}medecin/findBy?actif=true`)
  }


  GetMedecinHaveSignature(haveSignature: boolean): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}medecin/findByHaveSignature?haveSignature=` + haveSignature)
  }
  GetMedecinActifAndHaveConsultationOpdAndER(opd: boolean, er: boolean): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}medecin/have_consultation?autorisConsultation=true&actif=true&opd=` + opd + `&er=` + er)
  }


  GetMedecinInActif(): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}medecin/findBy?actif=false`)
  }

  GetMedecinByCode(code: number): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}medecin/` + code)
  }

  PostMedecin(body: any) {
    return this.http.post(`${environment.API_Parametrage}medecin`, body);
  }
  UpdateMedecin(body: any) {
    return this.http.put(`${environment.API_Parametrage}medecin/update`, body);
  }


  DeleteMedecin(code: any) {
    return this.http.delete(`${environment.API_Parametrage}medecin/delete/` + code);
  }


  GetAllSignatureMedecin(): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}signature_medecin/all`)
  }


  PostSignatureMedecin(body: any) {
    return this.http.post(`${environment.API_Parametrage}signature_medecin`, body);
  }
  UpdateSignatureMedecin(body: any) {
    return this.http.put(`${environment.API_Parametrage}signature_medecin/update`, body);
  }

  DeleteSignatureMedecin(code: any) {
    return this.http.delete(`${environment.API_Parametrage}signature_medecin/delete/` + code);
  }


  
  //// Cabinet
  GetCabinet(): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}cabinet/all`)
  }

  GetCabinetByActif(actif: boolean): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}cabinet/findBy?actif=` + actif)
  }

  GetCabinetByCode(code: number): Observable<any> {

    return this.http.get(`${environment.API_Parametrage}cabinet/` + code)
  }

  PostCabinet(body: any) {
    return this.http.post(`${environment.API_Parametrage}cabinet`, body);
  }
  UpdateCabinet(body: any) {
    return this.http.put(`${environment.API_Parametrage}cabinet/update`, body);
  }

  DeleteCabinet(code: any) {
    return this.http.delete(`${environment.API_Parametrage}cabinet/delete/` + code);
  }


}
