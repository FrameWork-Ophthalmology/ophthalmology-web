import { Component, OnInit } from '@angular/core';
import { I18nService } from '../Shared/i18n/i18n.service';

@Component({
  selector: 'app-menu-reception',
  templateUrl: './menu-reception.component.html',
  styleUrls: ['./menu-reception.component.css', '.../../../src/assets/css/StyleMenu.css']
})
export class MenuReceptionComponent implements OnInit {
  constructor(public i18nService: I18nService) { }
  ngOnInit(): void {
      
  }
}
