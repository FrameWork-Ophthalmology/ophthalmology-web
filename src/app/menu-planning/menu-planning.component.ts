import { Component, OnInit } from '@angular/core';
import { I18nService } from '../Shared/i18n/i18n.service';

@Component({
  selector: 'app-menu-planning',
  templateUrl: './menu-planning.component.html',
  styleUrls: ['./menu-planning.component.css', '.../../../src/assets/css/StyleMenu.css']
})
export class MenuPlanningComponent  implements OnInit {
  constructor(public i18nService: I18nService) { }
  ngOnInit(): void { 
  }

  
}
