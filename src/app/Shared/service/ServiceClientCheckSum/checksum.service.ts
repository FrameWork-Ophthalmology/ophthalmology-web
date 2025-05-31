import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChecksumService {

  constructor(private http: HttpClient) { }

  
    GetCheckSum(){
      return this.http.get(`${environment.API_CHECKSUM}getdata` )
    }
    ConnectCheckSum(port: string, baudRate: number): Observable<any> {  //add types
      const body = { port: port, baudRate: baudRate }; // Create a JSON object
      return this.http.post<any>(`${environment.API_CHECKSUM}connect`, body); //Send object as body
    }
    DisConnectCheckSum(): Observable<any>{
      return this.http.post(`${environment.API_CHECKSUM}disconnect`,{} )
    }

    GETdataCheckSum(): Observable<any>{
      return this.http.get(`${environment.API_CHECKSUM}data` )
    }

    uploadXML(file: File): Observable<any> {
      const formData = new FormData();
      formData.append('file', file, file.name);
      return this.http.post(`${environment.API_CHECKSUM}upload`, formData);
  }
}
