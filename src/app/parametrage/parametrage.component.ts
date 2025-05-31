import { Component, NgZone, OnInit } from '@angular/core';
import { I18nService } from '../Shared/i18n/i18n.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-parametrage',
  templateUrl: './parametrage.component.html',
  styleUrls: ['./parametrage.component.css', '.../../../src/assets/css/StyleMenu.css']
})
export class ParametrageComponent implements OnInit {
 
  constructor(public i18nService: I18nService,private router: Router, private ngZone: NgZone, private route: ActivatedRoute) { }
 
  ngOnInit(): void { 
    
    
  }

  
 
 
}
