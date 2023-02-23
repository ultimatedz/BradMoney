import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { SupabaseService } from 'src/app/shared/services/supabase.service';
Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  user!: any

  constructor(
    private supaBaseService: SupabaseService,
  ) { }

  async ngOnInit() {
    const session = this.supaBaseService.session

    const { data } = await this.supaBaseService.getUser(session?.user.email!)
    this.user = await JSON.parse(JSON.stringify(data![0]))

    const totalizer = []

    for(let i = 1; i <= 12; i++){
      totalizer.push(this.user.payments['2022'][i].reduce((accumulator: any, currentValue: any) => {
        return (accumulator + currentValue.amount)
      }, 0))
    }

    var myChart = new Chart("myChart", {
      type: 'bar',
      data: {
        labels: ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AUG', 'SET', 'OUT', 'NOV', 'DEZ'],
        datasets: [{
          label: 'Valor Pago',
          data: totalizer,
          barThickness: 15,
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
            grid: {
              display: false
            },
            beginAtZero: true,
            ticks: {
              stepSize: 100
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        },
        plugins: {
          legend: {
            display: false,
          }
        },
      }
    });
    Chart.defaults.elements.bar.borderRadius = 10
    Chart.defaults.elements.bar.backgroundColor = '#D2D1DC'

  }
}
