import { Component, OnInit } from '@angular/core';
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
  user!: any

  constructor(
    private supaBaseService: SupabaseService,
  ) { }

  async ngOnInit() {
    const session = this.supaBaseService.session

    const { data } = await this.supaBaseService.getUser(session?.user.email!)
    this.user = await JSON.parse(JSON.stringify(data![0]))


    if(!Object.keys(this.user.investments).length){
      const totalizerFiis = this.reducerElements('fiis')
      const totalizerStocks = this.reducerElements('stocks')
      const totalizerTreasure = this.reducerElements('treasure')
      const totalizerFiagro = this.reducerElements('fiagro')
  
      const total = totalizerFiis.map((element, i) => {
        return element + totalizerStocks[i] + totalizerTreasure[i] + totalizerFiagro[i]
      })
  
      const totalizerFiisPercentage = this.reducerElementsPercentage(total, totalizerFiis)
      const totalizerStocksPercentage = this.reducerElementsPercentage(total, totalizerStocks)
      const totalizerTreasurePercentage = this.reducerElementsPercentage(total, totalizerTreasure)
      const totalizerFiagroPercentage = this.reducerElementsPercentage(total, totalizerFiagro)

      this.createChart(totalizerFiisPercentage, totalizerStocksPercentage, totalizerTreasurePercentage, totalizerFiagroPercentage);
    } else {
      this.createChart([0,0,0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0,0,0]);
    }

    const canvas = <HTMLCanvasElement> document.getElementById('myChart');
    const ctx = canvas.getContext('2d');
  }

  reducerElementsPercentage(total: Array<number>, currentArray: Array<number> ){
    const totalizerPercentage = currentArray.map((element, i) => {
      return Number((element / total[i] * 100).toFixed(2))
    })

    return totalizerPercentage
  }

  reducerElements(category: string){
    let totalizer = []

    for(let i = 1; i <= 12; i++){
      totalizer.push(this.user.investments[`${category}`]['2022'][i].reduce((accumulator: any, currentValue: any) => {
        return (accumulator + currentValue.amount)
      }, 0))
    }

    return totalizer
  }

  createChart(fiss: Array<number>, stocks: Array<number>, treasure: Array<number>, fiagro: Array<number> ){
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
          }  ,
          {
            label: "TESOURO",
            data: treasure,
            backgroundColor: '#F2C94C',
            fill: false,
            borderColor: '#F2C94C',
            tension: 0.2
          }  ,
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
