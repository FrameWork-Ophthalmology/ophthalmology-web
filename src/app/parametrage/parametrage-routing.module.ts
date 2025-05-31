import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParametrageComponent } from './parametrage.component';
import { CliniqueComponent } from './clinique/clinique.component';
import { OperationComponent } from './operation/operation.component';
import { TypeOperationComponent } from './type-operation/type-operation.component';
import { I18nService } from '../Shared/i18n/i18n.service'; 
const routes: Routes = [
  
  { path: '', component: ParametrageComponent }
  ,{
    path: 'list_clinique',
    component: CliniqueComponent ,
    data:{title:'Clinique' , icon :'fas fa-hospital'}
  }
  ,{
    path: 'operation',
    component: OperationComponent ,
    data:{title:'Operation' , icon :'fas fa-procedures'}
  }
  // ,{
  //   path: 'type_operation',
  //   component: TypeOperationComponent ,
  //   data:{title:'TypeOperation' , icon :'fas fa-bars'}
  // },

 
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametrageRoutingModule { 
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
