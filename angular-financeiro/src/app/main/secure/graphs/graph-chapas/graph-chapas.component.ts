import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ChapaService } from 'src/app/services/chapa.service';

@Component({
  selector: 'app-graph-chapas',
  templateUrl: './graph-chapas.component.html',
  styleUrls: ['./graph-chapas.component.css']
})
export class GraphChapasComponent implements OnInit {

  chartOptions: any;
  dataChartQuantity: any [];
  dataChartvalue: any [];

  constructor(
    private chapaService: ChapaService
  ) { }

  ngOnInit(): void {
    moment.locale("us");
    this.getData();
    this.defineChart();
  }

  getData(): void {
    this.dataChartQuantity = [];
    this.dataChartvalue = [];

    this.chapaService.allBackend().subscribe(
      result => {
        const chartPointsQuantity: any [] = result.data.chapa_quantity_chart;
        const chartPointsValue: any [] = result.data.chapa_value_chart;
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
        text: "Chapas impressas"
      },
      axisX:{
        valueFormatString: "DDD DD/MM/YYYY",
        crosshair: {
          enabled: true,
          snapToDataPoint: true
        }
      },
      axisY: {
        title: "Quantidade de chapas",
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
          name: "Quantidade de chapas",
          showInLegend: true,
          dataPoints: this.dataChartQuantity
        }
      ]
    }
  }
}
