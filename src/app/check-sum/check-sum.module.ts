import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckSumRoutingModule } from './check-sum-routing.module';
import { CheckSumComponent } from './check-sum.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CheckSumComponent
  ],
  imports: [
    CommonModule,
    CheckSumRoutingModule,  FormsModule  
  ]
})
export class CheckSumModule { }
