import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output, Type, ViewChild } from '@angular/core';
import { I18nService } from '../Shared/i18n/i18n.service';
 
import { MenuParamContentComponent } from './menu-maintenance-content.component';
 

 
export interface ITab {
  component: Type<any>; 
  removable: boolean;
  displayName: string;
  active:boolean, 
}

@Component({
  selector: 'app-parametrage',
  
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './parametrage.component.html',
  styleUrls: ['./parametrage.component.css', '.../../../src/assets/css/StyleMenu.css']
})
export class ParametrageComponent implements OnInit {
 
  // constructor(public i18nService: I18nService,private router: Router, private ngZone: NgZone, private route: ActivatedRoute) { }
 
  // ngOnInit(): void { 
    
    
  // }

  
  
  menuParam = MenuParamContentComponent; 
 
  MenuParam = "";

  tabs: ITab[] = [];
  @Output() tabChanged = new EventEmitter<ITab>(); // Event emitter for tab changes

  constructor(public i18nService: I18nService, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.MenuParam = this.i18nService.getString('Setting');
    this.addTab({ component: this.menuParam, displayName: this.MenuParam, removable: false, active: true,  });

   

  }
  
  addTab = (tab: ITab) => {
    const existingTab = this.tabs.find(t => t.component === tab.component);
  
    if (!existingTab) {
      // Deactivate all other tabs before adding the new one.
      this.tabs.forEach(t => t.active = false);
  
      tab.active = true; // Set the new tab as active
      this.tabs.push(tab);
      this.tabChanged.emit(tab);
    } else {
      //If the tab exists, set its active status to true and deactivate others.
      this.tabs.forEach(t => t.active = false);
      existingTab.active = true;
  
    }
    this.cdRef.detectChanges();
  };

  addNewTab = (component: Type<any>, displayName: string) => {
    this.addTab({ component, displayName, removable: true, active: true  });
  };
  
  removeTabHandler(tab: ITab): void {
    const index = this.tabs.indexOf(tab);
    if (index > -1) {
      this.tabs.splice(index, 1);
      if (this.tabs.length > 0) {
        // Activate the first tab if any remain
        this.tabs[0].active = true;
      }
      this.cdRef.detectChanges();
    }
  } 
 
   
}
 
 
 
