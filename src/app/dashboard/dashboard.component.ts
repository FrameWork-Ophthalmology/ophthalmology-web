import { Component, OnInit } from '@angular/core';
import { ThemeOption } from 'ngx-echarts';
import type { EChartsCoreOption } from 'echarts/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { DashbordService } from '../Shared/service/ServiceClientDashbord/dashbord.service';
 
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoadingComponent } from '../Shared/loading/loading.component';
import { I18nService } from '../Shared/i18n/i18n.service';
import { ControlServiceAlertify } from '../Shared/Control/ControlRow';
import { DatePipe } from '@angular/common';
import { CalanderTransService } from '../Shared/CalanderService/CalanderTransService'; 
import { RapportService } from '../Shared/service/ServiceClientRapport/rapport.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', ],
    providers: [ CalanderTransService]
})

export class DashboardComponent implements OnInit {
  constructor(private dashbordService: DashbordService, private loadingComponent: LoadingComponent,
    public i18nService: I18nService,private datePipe: DatePipe, private CtrlAlertify: ControlServiceAlertify
    , private calandTrans: CalanderTransService,private rapportService: RapportService)
     {  this.calandTrans.setLangAR(); }

 
  
  ngOnInit(): void {
    // this.createChartOptions(); 

 

  }
 

}


