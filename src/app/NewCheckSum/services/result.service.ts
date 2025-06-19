import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';  
import { CheckSumServiceService } from '../ServiceClient/check-sum-service.service';
import { environment } from '../../../environments/environment.development';
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
 
  // Use a BehaviorSubject to easily update the component
  private resultsSubject = new BehaviorSubject<TomeyResult[]>([]);
  public results$ = this.resultsSubject.asObservable();

  constructor( private zone: NgZone , private checkSumService : CheckSumServiceService) {}

  // Get all initial results
  loadInitialResults() {
    this.checkSumService.GetResultat().subscribe(data => {
      this.resultsSubject.next(data.sort((a, b) => new Date(b.measurementDate).getTime() - new Date(a.measurementDate).getTime())); // Sort by date descending
    });
  }
  // Connect to the SSE stream
  getRealTimeUpdates(): EventSource {
    // Get the URL STRING from the service and pass it to EventSource
    const sseUrl = this.checkSumService.subscribeUrl;
    console.log(`Connecting to SSE stream at: ${sseUrl}`); // Good for debugging
    return new EventSource(sseUrl);
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
