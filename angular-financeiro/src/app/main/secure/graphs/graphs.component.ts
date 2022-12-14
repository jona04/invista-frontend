import { Component, OnInit } from '@angular/core';
import { ServicoService } from 'src/app/services/servico.service';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {

  chartOptions: any;
  dataChart: any [];
  test: any [];

  constructor(
    private servicoService: ServicoService
  ) { }

  ngOnInit(): void {
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
        xValueFormatString: "dd mm YYYY",
        dataPoints: this.dataChart
      }]
    }
  }
}
