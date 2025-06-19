import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { DashboardComponent } from './dashboard/dashboard.component';
import { I18nService } from './Shared/i18n/i18n.service';
import { LoginComponent } from './Authenfication/login/login.component';
import { ResultatListComponent } from './NewCheckSum/resultat-list/resultat-list.component';

const routes: Routes = [
  { path: 'home', component: DashboardComponent },
  { path: 'login', component: LoginComponent },  
  { path: '', redirectTo: '/home', pathMatch: 'full' } ,
  { path: 'menu_reception', loadChildren: () => import('./reception/reception.module').then(m => m.ReceptionModule) , data:{title:'Reception',icon:'fas fa-sitemap'} },
   { path: 'menu_parametrage', loadChildren: () => import('./parametrage/parametrage.module').then(m => m.ParametrageModule) , data:{title:'Setting',icon:'fas fa-cog'}},
  { path: 'check_sum', loadChildren: () => import('./check-sum/check-sum.module').then(m => m.CheckSumModule) , data:{title:'CheckSum',icon:'fas fa-code-branch'}},
   { path: 'menu_edition', loadChildren: () => import('./menu-edition/menu-edition.module').then(m => m.MenuEditionModule), data:{title:'Edition',icon:'fas fa-chart-pie'} },
  { path: 'menu_planning', loadChildren: () => import('./menu-planning/menu-planning.module').then(m => m.MenuPlanningModule) , data:{title:'PlanningOperation',icon:'fas fa-calendar-days'}},
  { path: 'menu_dmi', loadChildren: () => import('./menu-dmi/menu-dmi.module').then(m => m.MenuDMIModule) , data:{title:'DossierMedical',icon:'bx bx-first-aid'}  },


  {path:'new_check_sum', component:ResultatListComponent}
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
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
