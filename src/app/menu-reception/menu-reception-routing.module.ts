import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuReceptionComponent } from './menu-reception.component';
import { I18nService } from '../Shared/i18n/i18n.service';
import { AdmissionComponent } from './admission/admission.component';
import { AjoutAdmissionComponent } from '../reception/ajout-admission/ajout-admission.component';

const routes: Routes = [
  { path: '', component: MenuReceptionComponent }
  , {
    path: 'ouvrir_admission',
    component: AdmissionComponent,
    data: { title: 'NewFile', icon: 'fas fa-file-medical' }
  }, {
    path: 'ouvrir_admission_v2',
    component: AjoutAdmissionComponent,
    data: { title: 'NewFile', icon: 'fas fa-file-medical' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuReceptionRoutingModule {

    constructor(private i18nService: I18nService) {
        this.translateRouteTitles();
      }
      translateRouteTitles() {
        routes.forEach(route => {
          if (route.data && route.data['title']) {
            route.data['title'] = this.i18nService.getString(route.data['title']);
          }
        });
      }


 }
