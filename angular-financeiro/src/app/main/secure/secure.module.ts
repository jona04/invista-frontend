import { NgModule } from '@angular/core';
import { SecureComponent } from './secure.component';
import { GraphsComponent } from './graphs/graphs.component';
import { SharedModule } from 'src/app/shared/shared.module';
import * as CanvasJSAngularChart from '../../../assets/canvasjs.angular.component';
import { GraphServicosComponent } from './graphs/graph-servicos/graph-servicos.component';
import { GraphNotasComponent } from './graphs/graph-notas/graph-notas.component';
import { GraphChapasComponent } from './graphs/graph-chapas/graph-chapas.component';
var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;


@NgModule({
  declarations: [
    SecureComponent,
    GraphsComponent,
    CanvasJSChart,
    GraphServicosComponent,
    GraphNotasComponent,
    GraphChapasComponent
  ],
  imports: [
    SharedModule
  ]
})
export class SecureModule { }
