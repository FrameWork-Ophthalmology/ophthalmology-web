import {   Component, EventEmitter, Inject, OnInit, Output, Type } from '@angular/core';
import { I18nService } from '../Shared/i18n/i18n.service'; 
 
import { CliniqueComponent } from './clinique/clinique.component';
import { OperationComponent } from './operation/operation.component';
import { ParametrageComponent } from './parametrage.component';
 
@Component({
    selector: 'app-menu-param-content',
    template: `
     


    <div class="container">
        <div class="row text-center">
            <h2 class="TitleMenu"> {{'Setting'  | i18nForMenu:i18nService.currentLanguage}} </h2>
            <div id="menu-box"> 
                <div id="item" class="col-sm-6 col-md-3"  (click)="openNewTab(cliniqueCompo, this.i18nService.getString('Clinique'))" >
                    <div class="container-block">
                        <div class="block1"> 
                        <i class="fas fa-hospital" style="font-size: 20px; margin-top: 5px;"></i>
                        </div>
                        <div class="block2">
                            <span class="FloatRight">  {{'Clinique'  | i18nForMenu:i18nService.currentLanguage  }}  </span>
                        </div>
                    </div>
                </div>
                <div id="item" class="col-sm-6 col-md-3"  (click)="openNewTab(operationCompo, this.i18nService.getString('Operation'))" >
                    <div class="container-block">
                        <div class="block1"> 
                        <i class="fas fa-procedures" style="font-size: 20px; margin-top: 5px;"></i>
                        </div>
                        <div class="block2">
                            <span class="FloatRight">  {{'Operation'  | i18nForMenu:i18nService.currentLanguage  }}  </span>
                        </div>
                    </div>
                </div>


                
            </div>
        </div>
    </div>
  `,
    styleUrls: ['.../../../src/assets/css/StyleMenu.css'
        , '.../../../src/assets/css/BS.css', '.../../../src/assets/css/BS3.7.css']
})
export class MenuParamContentComponent implements OnInit {

    menuItems: any[] = [];
    menus: any[] = [];

    cliniqueCompo=CliniqueComponent
    operationCompo = OperationComponent;
    constructor(public i18nService: I18nService, @Inject(ParametrageComponent) public parent: ParametrageComponent ) { }

    ngOnInit(): void {

    }

    @Output() closeMenu = new EventEmitter<void>(); // Event emitter to signal closure
    openNewTab(component: Type<any>, displayName: string) {
        this.parent.addNewTab(component, displayName);
        this.closeMenu.emit(); // Emit event to close the menu
    }

    IsOpened = false;
    onOpened() {
        this.IsOpened = true;
    }
    onClosed() {
        this.IsOpened = false;
    }


    IsOpened2 = false;
    onOpened2() {
        this.IsOpened2 = true;
    }
    onClosed2() {
        this.IsOpened2 = false;
    }

    IsOpened3 = false;
    onOpened3() {
        this.IsOpened3 = true;
    }
    onClosed3() {
        this.IsOpened3 = false;
    }

    IsOpened4 = false;
    onOpened4() {
        this.IsOpened4 = true;
    }
    onClosed4() {
        this.IsOpened4 = false;
    }

    IsOpened5 = false;
    onOpened5() {
        this.IsOpened5 = true;
    }
    onClosed5() {
        this.IsOpened5 = false;
    }

    IsOpened6 = false;
    onOpened6() {
        this.IsOpened6 = true;
    }
    onClosed6() {
        this.IsOpened6 = false;
    }


}