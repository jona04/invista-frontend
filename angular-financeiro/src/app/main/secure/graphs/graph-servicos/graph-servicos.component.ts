import { Component, OnInit } from '@angular/core';
import { ServicoService } from 'src/app/services/servico.service';
import * as moment from 'moment';

@Component({
  selector: 'app-graph-servicos',
  templateUrl: './graph-servicos.component.html',
  styleUrls: ['./graph-servicos.component.css']
})
export class GraphServicosComponent implements OnInit {

  chartOptions: any;
  dataChart: any [];

  constructor(
    private servicoService: ServicoService
  ) { }

  ngOnInit(): void {
    moment.locale("pt-BR");
    console.log(moment.now());
    this.getData();
    this.defineChart();
  }

  getData(): void {
    this.dataChart = [];
    this.servicoService.allBackend().subscribe(
      result => {
        const chartPointsResult: any [] = result.data;
        chartPointsResult.forEach(
          chartPoint => {
            this.dataChart.push(
              {
                x: new Date(chartPoint.x),
                y: chartPoint.y
              }
            );
          }
        );
        this.defineChart();
      }
    )
  }

  defineChart(): void {
    this.chartOptions = {
      theme: "light2",
      animationEnabled: true,
      culture: "es",
      zoomEnabled: true,
      title: {
        text: "Serviços realizados"
      },
      axisX:{
        valueFormatString: "DDD DD/MM/YYYY",
        crosshair: {
          enabled: true,
          snapToDataPoint: true
        }
      },
      axisY: {
        title: "Quantidade de serviços",
        crosshair: {
          enabled: true
        }
      },
      data: [{
        type: "line",
        dataPoints: this.dataChart
      }]
    }
  }
}
