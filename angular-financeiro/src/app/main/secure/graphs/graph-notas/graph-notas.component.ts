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
  dataChartQuantity: any [];
  dataChartvalue: any [];

  constructor(
    private notaService: NotaService
  ) { }

  ngOnInit(): void {
    this.getData();
    this.defineChart();
  }

  getData(): void {
    this.dataChartQuantity = [];
    this.dataChartvalue = [];

    this.notaService.allBackend().subscribe(
      result => {
        const chartPointsQuantity: any [] = result.data.nota_quantity_chart;
        const chartPointsValue: any [] = result.data.nota_value_chart;
        chartPointsQuantity.forEach(
          chartPoint => {
            this.dataChartQuantity.push(
              {
                x: new Date(chartPoint.x),
                y: chartPoint.y
              }
            );
          }
        );
        chartPointsValue.forEach(
          chartPoint => {
            this.dataChartvalue.push(
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
        includeZero: true
      },
      axisY2: {
        title: "Total receita",
        includeZero: true,
      },
      data: [
        {
          type: "column",
          axisYType: "secondary",
          dataPoints: this.dataChartvalue
        },
        {
          type: "line",
          dataPoints: this.dataChartQuantity
        }
      ]
    }
  }
}
