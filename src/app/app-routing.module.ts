import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { DashboardComponent } from './dashboard/dashboard.component';
import { I18nService } from './Shared/i18n/i18n.service';
import { LoginComponent } from './Authenfication/login/login.component';

const routes: Routes = [
  { path: 'home', component: DashboardComponent },
  { path: 'login', component: LoginComponent },  
  { path: '', redirectTo: '/home', pathMatch: 'full' } ,
  { path: 'menu_reception_v2', loadChildren: () => import('./reception/reception.module').then(m => m.ReceptionModule) , data:{title:'Reception',icon:'bx bxs-report'} },
   { path: 'menu_parametrage', loadChildren: () => import('./parametrage/parametrage.module').then(m => m.ParametrageModule) , data:{title:'Setting',icon:'bx bxs-report'}},
  { path: 'check_sum', loadChildren: () => import('./check-sum/check-sum.module').then(m => m.CheckSumModule) , data:{title:'CheckSum',icon:'fas fa-code-branch'}},
  { path: 'menu_reception', loadChildren: () => import('./menu-reception/menu-reception.module').then(m => m.MenuReceptionModule), data:{title:'Reception',icon:'bx bxs-report'} },

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
