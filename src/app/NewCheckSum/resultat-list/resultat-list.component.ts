// src/app/components/result-list/result-list.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs'; 
import { ResultService, TomeyResult } from '../services/result.service';

@Component({
  selector: 'app-resultat-list',
  templateUrl: './resultat-list.component.html',
  styleUrl: './resultat-list.component.css'
})
export class ResultatListComponent implements OnInit, OnDestroy {
  results$: Observable<TomeyResult[]>;
  private eventSource!: EventSource;

  constructor(private resultService: ResultService) {
    this.results$ = this.resultService.results$;
  }

  ngOnInit(): void {
    // 1. Load the data that's already in the database
    this.resultService.loadInitialResults();

    // 2. Subscribe to real-time updates
    this.eventSource = this.resultService.getRealTimeUpdates();
    
    this.eventSource.addEventListener('new-result', (event: any) => {
      console.log('New result received from server!');
      const newResult: TomeyResult = JSON.parse(event.data);
      this.resultService.addNewResult(newResult);
    });

    this.eventSource.onerror = (error) => {
      console.error('EventSource failed:', error);
      // You might want to try reconnecting here
    };
  }

  ngOnDestroy(): void {
    // Clean up the connection when the component is destroyed
    if (this.eventSource) {
      this.eventSource.close();
    }
  }
}