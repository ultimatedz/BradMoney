import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent {
  public chart: any;
  ngOnInit(){
    this.createChart();
    const canvas = <HTMLCanvasElement> document.getElementById('myChart');
    const ctx = canvas.getContext('2d');
    // console.log(ctx);
  }

  createChart(){
    this.chart = new Chart("MyChart", {
      plugins: [ChartDataLabels],
      type: 'line', 
      data: {
        labels: ['01/22', '02/22', '03/22','04/22',
								 '05/22', '06/22', '07/22','08/22','09/22', '10/22','11/22','12/22' ], 
	       datasets: [
          {
            label: "FISS",
            data: ['0','3', '5', '7', '9','15','10.5','13','18.55','19','17','20.31'],
            backgroundColor: '#2F80ED',
            fill: false,
            borderColor: '#2F80ED',
            tension: 0.2
          },
          {
            label: "AÇÕES",
            data: ['0','5', '10', '15', '20','25','27.5','30','33.55','35','40','42.85'],
            backgroundColor: '#EB5757',
            fill: false,
            borderColor: '#EB5757',
            tension: 0.2
          }  ,
          {
            label: "TESOURO",
            data: ['0','3', '4', '5', '7','9','11','12','13.55','15','17','17.46'],
            backgroundColor: '#F2C94C',
            fill: false,
            borderColor: '#F2C94C',
            tension: 0.2
          }  ,
          {
            label: "FIAGRO",
            data: ['0','4', '5', '6', '7','8','11','13','14.55','16','17','19.33'],
            backgroundColor: '#3AB67D',
            fill: false,
            borderColor: '#3AB67D',
            tension: 0.2
          }  
        ]
      },
      options: {
        layout:{
          padding:{
            right: 55
          }
        },
        plugins:{
          datalabels:{
            font:{
              family: "Poppins",
              weight: 700
            },
            formatter: function(value){
              return value + ('%')
            },
            anchor:'end',
            align:'right',
            offset: 5,
            display: function (context){
              return (context.dataIndex === context.dataset.data.length-1);
            },
            opacity: function(context){
              return context.active ? 1 :0.5;
            }
            
          }
        },
        elements:{
          point:{
            radius:3
          }
        },
        aspectRatio:2.5,
        scales:{
          y:{
              ticks:{
                display:false
              }
            
          }
        },
      }
      
    }); 
    Chart.defaults.elements.line.borderWidth = 7
    Chart.defaults.elements.line.tension=1

    
  }
  
}
