import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import * as enI18n from './Shared/i18n/en.i18n';
import * as frI18n from './Shared/i18n/fr.i18n';
import * as arI18n from './Shared/i18n/ar.i18n';
import { I18nModule } from './Shared/i18n/i18n.module';





/////// new module  
 
 

//// primeng

import { DropdownModule } from 'primeng/dropdown';
import { ChartModule } from 'primeng/chart';
import { TabViewModule } from "primeng/tabview";
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { DialogModule } from 'primeng/dialog';
import { ContextMenuModule } from 'primeng/contextmenu';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog'; 
import { PanelModule } from 'primeng/panel'; 
import { TabMenuModule } from 'primeng/tabmenu';
import { ReportViewerModule } from '../../projects/reportviewer/src/public-api';

/////////////////////////////////////////////

 
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserCompoComponent } from './user-compo/user-compo.component';
import { SidebarComponent } from './Navigation/sidebar/sidebar.component';
import { TopBarComponent } from './Navigation/top-bar/top-bar.component';
import { FooterComponent } from './Navigation/footer/footer.component';


//primeng

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AlertComponent } from './Authenfication/alert/alert.component';
import { LoginComponent } from './Authenfication/login/login.component';
import { LoadingComponent } from './Shared/loading/loading.component'; 
import { BreadcrumbComponent } from './Shared/breadcrumb/breadcrumb.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts'; // Make sure you import echarts 
// import { authInterceptorProviders, AuthInterceptor } from './Authenfication/_helpers/auth.interceptor';
import { ModalContentComponent } from './Shared/modal-content/modal-content.component'; 
import { I18nPipe } from './Shared/i18n/i18n.pipe';
import { MenuActiveDirective } from './Shared/service/highlight';
import { ToFixedRoundPipe } from './Shared/service/ToFixedRoundPipe';
 
import { TreeTableModule } from 'primeng/treetable';
 
import { ToastModule } from 'primeng/toast'; 
import { CustomSelectComponent } from './Shared/TAB/custom-select.component';
import { AuthInterceptor, authInterceptorProviders } from './Authenfication/_helpers/auth.interceptor';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { DividerModule } from 'primeng/divider';
import { MenubarModule } from 'primeng/menubar';
import { CustomDateFormatPipe } from './Shared/CommunFunction/CustomDateFormatPipe';   
 import { SkeletonModule } from 'primeng/skeleton'; 
import { CliniqueComponent } from './parametrage/clinique/clinique.component';
import { OperationComponent } from './parametrage/operation/operation.component';
import { AjoutAdmissionComponent } from './reception/ajout-admission/ajout-admission.component';
import { InputMaskModule } from 'primeng/inputmask';
import { ListboxModule } from 'primeng/listbox';  
import { EditionComponent } from './menu-edition/edition/edition.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { PlanningComponent } from './menu-planning/planning/planning.component';
import { CliniqueLabelPipe } from './Shared/Pipe/CliniqueLabelPipe';
import { FeuilleSoinComponent } from './menu-dmi/feuille-soin/feuille-soin.component';
import { ListAdmissionOPDComponent } from './menu-dmi/list-admission-opd/list-admission-opd.component';
import { RequestOPDComponent } from './menu-dmi/request-opd/request-opd.component';
import { ResultatListComponent } from './NewCheckSum/resultat-list/resultat-list.component';
import { PlanningMedecinComponent } from './reception/planning-medecin/planning-medecin.component';
// import moment from 'moment';

const languages = [
  { lang: 'عربي', flag: 'assets/images/county/ar.png', file: arI18n, valeur: 'ar' },
  { lang: 'English', flag: 'assets/images/county/eng.png', file: enI18n, valeur: 'en' },
  { lang: 'Français', flag: 'assets/images/county/fr.png', file: frI18n, valeur: 'fr' }

]

// @NgModule({
//   declarations: [
//     AppComponent
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule
//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })


@NgModule({
  declarations: [ 
    CustomSelectComponent, AppComponent,MenuActiveDirective,
    DashboardComponent,  UserCompoComponent, BreadcrumbComponent,SidebarComponent,
    TopBarComponent, LoadingComponent, ToFixedRoundPipe, 
    FooterComponent, AlertComponent, LoginComponent,ModalContentComponent, I18nPipe,  CustomDateFormatPipe ,CliniqueLabelPipe
 

    ///// menu parametarge
    , CliniqueComponent, OperationComponent,


    ///// menu reception old 
AjoutAdmissionComponent,PlanningMedecinComponent,


   ///// menu reception 

//menu edition
EditionComponent,


/// menu Planning

PlanningComponent,



//// menu dmi 

FeuilleSoinComponent,ListAdmissionOPDComponent,RequestOPDComponent, ResultatListComponent,
 
  ],
  imports: [   
    BrowserModule, NgxEchartsModule.forRoot({
      echarts, // Provide the echarts object here
    }),
    ChartModule, BrowserModule,PanelModule,TabMenuModule,InputMaskModule,
    ReactiveFormsModule, BrowserAnimationsModule,ToastModule,SkeletonModule,
   
    AppRoutingModule, DropdownModule, ListboxModule,
    HttpClientModule, TreeTableModule,ScrollPanelModule,  DividerModule,
  
    I18nModule.forRoot(languages), TagModule, RippleModule, RatingModule, InputTextareaModule,
    CommonModule, ContextMenuModule, ToolbarModule, ConfirmDialogModule,
     TableModule, InputTextModule, FileUploadModule,
     ButtonModule, InputNumberModule, NoopAnimationsModule, // Needed for PrimeNG animations
       
    FormsModule, DialogModule, RadioButtonModule, 
    CalendarModule, CheckboxModule, TabViewModule,MenubarModule ,ReportViewerModule,FullCalendarModule
 
  ],
  // providers: [  provideHttpClient(withInterceptors([customInterceptor])),DatePipe, LoginComponent, LoadingComponent, HttpClient, MessageService,
    
  //   provideAnimationsAsync(),
  // ],

  providers: [  authInterceptorProviders,DatePipe, LoginComponent, LoadingComponent, HttpClient, MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true ,  },
   
    provideAnimationsAsync(),
  ],


  bootstrap: [AppComponent]
})
export class AppModule { }
