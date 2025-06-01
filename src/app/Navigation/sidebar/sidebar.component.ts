import { Component,   ElementRef, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { I18nService } from '../../Shared/i18n/i18n.service'; 
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UserService } from '../../Authenfication/JWT/_services/user.service';
import { Router } from '@angular/router';

 

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css' ]
})
export class SidebarComponent  {
 
  showBreadcrumb = true;
  subMenus = {
    product: false,
    category: false,
    sale: false,
    purchase: false,
    return: false,
    people: false,
    otherpage: false,
    ui: false,
    auth: false,
    form: false,
    table: false,
    pricing: false,
    'pages-error': false
  };

  constructor(public i18nService: I18nService, public societe: UserService,
     private _sanitizer: DomSanitizer, private cdr: ChangeDetectorRef) { }
  logo: SafeResourceUrl | string | null = null; //Make sure it is initialized

  ngOnInit(): void {
   
      this.GetLogo();
    
    
  }

 
  GetLogo() {
    if(sessionStorage.getItem("NomSociete") == undefined ||  sessionStorage.getItem("NomSociete") ==null){
    
      // this.societe.GetLogoClinique().subscribe(
      //   (data: any) => {
          
      //     if (typeof data.logo === 'string' && data.logo.trim() !== '') {
      //       sessionStorage.setItem("Logo",data.logo);
      //       this.logo = this._sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64,${data.logo}`);
      //       sessionStorage.setItem("NomSociete",data.nomSociete);
      //       this.cdr.detectChanges(); 
  
            
      //     } else {
      //       console.error("Invalid logo data received.");
             
           
      //     } 
      //   } 
      // )
    }
    else{

      if(sessionStorage.getItem("Logo") == null || sessionStorage.getItem("Logo") == undefined){
        this.logo = this._sanitizer.bypassSecurityTrustResourceUrl('/assets/images/logo_FrameWork.png'); // Use a path relative to your assets folder
            this.cdr.detectChanges(); 
      }
      else{
        this.logo = this._sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64,${sessionStorage.getItem("Logo")}`);
    
      }
      
    }
    



 
  }


}
