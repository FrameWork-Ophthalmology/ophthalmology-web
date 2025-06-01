import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuEditionComponent } from './menu-edition.component';
import { EditionComponent } from './edition/edition.component';
import { I18nService } from '../Shared/i18n/i18n.service';

const routes: Routes = [
  { path: '', component: MenuEditionComponent }
  , {
    path: 'reporting',
    component: EditionComponent,
    data: { title: 'Edition', icon: 'fas fa-chart-pie' }
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuEditionRoutingModule { 


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
