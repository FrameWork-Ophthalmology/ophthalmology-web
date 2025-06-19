import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuDMIComponent } from './menu-dmi.component';
import { FeuilleSoinComponent } from './feuille-soin/feuille-soin.component';
import { ListAdmissionOPDComponent } from './list-admission-opd/list-admission-opd.component';
import { RequestOPDComponent } from './request-opd/request-opd.component';

 

const routes: Routes = [
  {
    path: '',
    component: MenuDMIComponent,
    children: [
      { path: 'feuille_soin_opd', component: FeuilleSoinComponent },
      { path: 'list_admission_opd', component: ListAdmissionOPDComponent },
      { path: 'request_opd', component: RequestOPDComponent }, 
      { path: '**', component: ListAdmissionOPDComponent } // Wildcard route
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuDMIRoutingModule { }
