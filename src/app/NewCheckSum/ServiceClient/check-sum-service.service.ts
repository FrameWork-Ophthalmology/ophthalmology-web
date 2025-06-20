import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { TomeyResult } from '../services/result.service';

@Injectable({
  providedIn: 'root'
})
export class CheckSumServiceService {
  constructor(private http: HttpClient) { }
  public readonly resultsUrl = `${environment.New_API_CheckSum}results`;
  public readonly subscribeUrl = `${environment.New_API_CheckSum}subscribe`;

  GetResultat(): Observable<TomeyResult[]> {
    return this.http.get<TomeyResult[]>(this.resultsUrl);
  }
    
  GetSub(): Observable<TomeyResult[]> {
    return this.http.get<TomeyResult[]>(this.subscribeUrl);
  }
    
}
