import { Component, OnInit } from '@angular/core';
import { I18nService } from '../Shared/i18n/i18n.service';
import { PrimeNGConfig } from 'primeng/api';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-menu-edition',
  templateUrl: './menu-edition.component.html',
  styleUrls: ['./menu-edition.component.css', '.../../../src/assets/css/StyleMenu.css']
})
export class MenuEditionComponent implements OnInit {
  constructor(public i18nService: I18nService){

  }

  ngOnInit(): void { 
  }



}