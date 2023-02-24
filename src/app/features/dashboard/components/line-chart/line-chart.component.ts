import { Component, Input, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { SupabaseService } from 'src/app/shared/services/supabase.service';


@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
  public chart: any;
  groupTotalizer!: any
  investmentListTotalizer!: any
  investmentListArray!: any

  @Input() allInvestments!: any

  constructor() { }

  ngOnInit() {

    const fiisArray: Array<number> = this.calcAmountTotal('fiis')
    const stocksArray: Array<number> = this.calcAmountTotal('stocks')
    const treasureArray: Array<number> = this.calcAmountTotal('treasure')
    const fiagroArray: Array<number> = this.calcAmountTotal('fiagro')

    const fiisArrayPercentage = this.calcPercentage(fiisArray, stocksArray, treasureArray, fiagroArray)
    const stocksArrayPercentage = this.calcPercentage(stocksArray, fiisArray, treasureArray, fiagroArray)
    const treasureArrayPercentage = this.calcPercentage(treasureArray, fiisArray, stocksArray, fiagroArray)
    const fiagroArrayPercentage = this.calcPercentage(fiagroArray, fiisArray, stocksArray, treasureArray)

    this.createChart(fiisArrayPercentage, stocksArrayPercentage, treasureArrayPercentage, fiagroArrayPercentage);

    const canvas = <HTMLCanvasElement>document.getElementById('myChart');
    const ctx = canvas.getContext('2d');
  }

  calcPercentage(arrayTarget: Array<number>, secondArray: Array<number>, thirdArray: Array<number>, fourthArray: Array<number>){
    const newArray = arrayTarget.map((value, i) => {
      const totalMonth = arrayTarget[i] + secondArray[i] + thirdArray[i] + fourthArray[i]
      if(isNaN(Number((arrayTarget[i] / totalMonth * 100).toFixed(2)))){
        return 0
      } else {
        return Number((arrayTarget[i] / totalMonth * 100).toFixed(2))
      }
    })

    return newArray
  }

  calcAmountTotal(group: string) {
    const newArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    const actions = Object.keys(this.allInvestments[group])

    actions.forEach(investment => {
      this.allInvestments[group][investment].forEach((element: any) => {
        const date = element.date.split('/')
        newArray[date[1] - 1] += element.amount
      })
    })
    return newArray
  }

  createChart(fiss: Array<number>, stocks: Array<number>, treasure: Array<number>, fiagro: Array<number>) {
    this.chart = new Chart("MyChart", {
      plugins: [ChartDataLabels],
      type: 'line',
      data: {
        labels: ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AUG', 'SET', 'OUT', 'NOV', 'DEZ'],
        datasets: [
          {
            label: "FISS",
            data: fiss,
            backgroundColor: '#2F80ED',
            fill: false,
            borderColor: '#2F80ED',
            tension: 0.2
          },
          {
            label: "AÇÕES",
            data: stocks,
            backgroundColor: '#EB5757',
            fill: false,
            borderColor: '#EB5757',
            tension: 0.2
          },
          {
            label: "TESOURO",
            data: treasure,
            backgroundColor: '#F2C94C',
            fill: false,
            borderColor: '#F2C94C',
            tension: 0.2
          },
          {
            label: "FIAGRO",
            data: fiagro,
            backgroundColor: '#3AB67D',
            fill: false,
            borderColor: '#3AB67D',
            tension: 0.2
          }
        ]
      },
      options: {
        layout: {
          padding: {
            right: 55
          }
        },
        plugins: {
          datalabels: {
            font: {
              family: "Poppins",
              weight: 700
            },
            formatter: function (value) {
              return value + ('%')
            },
            anchor: 'end',
            align: 'right',
            offset: 5,
            display: function (context) {
              return (context.dataIndex === context.dataset.data.length - 1);
            },
            opacity: function (context) {
              return context.active ? 1 : 0.5;
            }

          }
        },
        elements: {
          point: {
            radius: 3
          }
        },
        aspectRatio: 2.5,
        scales: {
          y: {
            ticks: {
              display: false
            }

          }
        },
      }

    });
    Chart.defaults.elements.line.borderWidth = 7
    Chart.defaults.elements.line.tension = 1


  }

}
