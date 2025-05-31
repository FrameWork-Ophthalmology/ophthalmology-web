import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckSumComponent } from './check-sum.component';

const routes: Routes = [{ path: '', component: CheckSumComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckSumRoutingModule { }
