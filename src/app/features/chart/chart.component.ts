import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { plugins } from 'chart.js/dist';
Chart.register(...registerables);


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {
  ngOnInit(){
    var myChart = new Chart("myChart", {
      type: 'bar',
      data: {
          labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP','OCT', 'NOV','DEC'],
          datasets: [{
              label: 'Valor Pago',
              data: [100, 120, 110, 230, 280, 200,150, 105, 280, 350,380, 395],
              barThickness: 10,
              backgroundColor: [
                  '#3AB67D',
                  '#3AB67D',
                  '#3AB67D',
                  '#3AB67D',
                  '#3AB67D',
                  '#3AB67D'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                grid:{
                  display: false
                },
                  beginAtZero: true,
                  ticks:{
                    stepSize:100
                  }
              },
              x: {
                grid:{
                  display:false
                }
              }
          },
          plugins :{
            legend:{
              display:false,
            }
          },
          
      }
  });
  Chart.defaults.elements.bar.borderRadius = 15
  Chart.defaults.elements.bar.backgroundColor ='#D2D1DC'

  }
}
