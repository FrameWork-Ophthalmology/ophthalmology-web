import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
export interface TomeyResult {
  id: number;
  measurementDate: string;
  odSphere: string;
  odCylinder: string;
  odAxis: string;
  osSphere: string;
  osCylinder: string;
  osAxis: string;
  pupillaryDistance: string;
}

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  private baseUrl = 'http://localhost:5061/api';
  
  // Use a BehaviorSubject to easily update the component
  private resultsSubject = new BehaviorSubject<TomeyResult[]>([]);
  public results$ = this.resultsSubject.asObservable();

  constructor(private http: HttpClient, private zone: NgZone) {}

  // Get all initial results
  loadInitialResults() {
    this.http.get<TomeyResult[]>(`${this.baseUrl}/results`).subscribe(data => {
      this.resultsSubject.next(data);
    });
  }

  // Connect to the SSE stream
  getRealTimeUpdates(): EventSource {
    return new EventSource(`${this.baseUrl}/subscribe`);
  }

  // Add a new result received from SSE to our list
  addNewResult(result: TomeyResult) {
    // Run inside NgZone to ensure change detection is triggered
    this.zone.run(() => {
      const currentResults = this.resultsSubject.getValue();
      // Add the new result to the top of the list
      const updatedResults = [result, ...currentResults];
      this.resultsSubject.next(updatedResults);
    });
  }
}
