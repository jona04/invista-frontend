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
  dataChartQuantity: any [];
  dataChartvalue: any [];

  constructor(
    private servicoService: ServicoService
  ) { }

  ngOnInit(): void {
    moment.locale("pt-BR");
    this.getData();
    this.defineChart();
  }

  getData(): void {
    this.dataChartQuantity = [];
    this.dataChartvalue = [];

    this.servicoService.allBackend().subscribe(
      result => {
        console.log("result.data",result.data);
        const chartPointsQuantity: any [] = result.data.servico_quantity_chart;
        const chartPointsValue: any [] = result.data.servico_value_chart;
        chartPointsQuantity.forEach(
          chartPoint => {
            let dateTime = new Date(chartPoint.x);
            dateTime.setHours(dateTime.getHours()+4);
            this.dataChartQuantity.push(
              {
                label: dateTime.toDateString(),
                y: chartPoint.y
              }
            );
          }
        );
        chartPointsValue.forEach(
          chartPoint => {
            let dateTime = new Date(chartPoint.x);
            dateTime.setHours(dateTime.getHours()+4);
            this.dataChartvalue.push(
              {
                label: dateTime.toDateString(),
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
        text: "Servicos emitidas"
      },
      axisX:{
        valueFormatString: "DDD DD/MM/YYYY",
        crosshair: {
          enabled: true,
          snapToDataPoint: true
        }
      },
      axisY: {
        title: "Quantidade de servicos",
        includeZero: true
      },
      axisY2: {
        title: "Total receita",
        includeZero: true,
      },
      data: [
        {
          type: "column",
          name: "Receita",
          axisYType: "secondary",
          showInLegend: true,
          dataPoints: this.dataChartvalue
        },
        {
          type: "line",
          name: "Quantidade de servicos",
          showInLegend: true,
          dataPoints: this.dataChartQuantity
        }
      ]
    }
  }
}
