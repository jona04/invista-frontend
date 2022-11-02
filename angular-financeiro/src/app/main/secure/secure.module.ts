import { NgModule } from '@angular/core';
import { SecureComponent } from './secure.component';
import { GraphsComponent } from './graphs/graphs.component';
import { SharedModule } from 'src/app/shared/shared.module';
import * as CanvasJSAngularChart from '../../../assets/canvasjs.angular.component';
var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;
 

@NgModule({
  declarations: [
    SecureComponent,
    GraphsComponent,
    CanvasJSChart
  ],
  imports: [
    SharedModule
  ]
})
export class SecureModule { }
