import { Component, OnInit } from '@angular/core';
import { NotaService } from 'src/app/services/nota.service';
import { ServicoService } from 'src/app/services/servico.service';

@Component({
  selector: 'app-graph-notas',
  templateUrl: './graph-notas.component.html',
  styleUrls: ['./graph-notas.component.css']
})
export class GraphNotasComponent implements OnInit {

  chartOptions: any;
  dataChart: any [];

  constructor(
    private notaService: NotaService
  ) { }

  ngOnInit(): void {
    this.getData();
    this.defineChart();
  }

  getData(): void {
    this.dataChart = [];
    this.notaService.allBackend().subscribe(
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
      zoomEnabled: true,
      title: {
        text: "Notas emitidas"
      },
      axisX:{
        valueFormatString: "DDD DD/MM/YYYY",
        crosshair: {
          enabled: true,
          snapToDataPoint: true
        }
      },
      axisY: {
        title: "Quantidade de notas",
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
