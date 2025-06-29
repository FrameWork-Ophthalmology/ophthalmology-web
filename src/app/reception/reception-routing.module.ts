import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceptionComponent } from './reception.component';
import { AjoutAdmissionComponent } from './ajout-admission/ajout-admission.component';
import { I18nService } from '../Shared/i18n/i18n.service';
import { PlanningMedecinComponent } from './planning-medecin/planning-medecin.component';

const routes: Routes = [
  { path: '', component: ReceptionComponent }
  , {
    path: 'ouvrir_admission',
    component: AjoutAdmissionComponent,
    data: { title: 'NewFile', icon: 'fas fa-file-medical' }
  },{
    path: 'planning_medecin',
    component: PlanningMedecinComponent,
    data:{title:'PlanningMedcin' , icon :'bx bxs-spreadsheet'}
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceptionRoutingModule {



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
