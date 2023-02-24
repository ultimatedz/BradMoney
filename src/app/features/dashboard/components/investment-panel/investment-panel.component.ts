import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-investment-panel',
  templateUrl: './investment-panel.component.html',
  styleUrls: ['./investment-panel.component.scss']
})
export class InvestmentPanelComponent implements OnInit{
  groupTotalizer!: any
  investmentListTotalizer!:any
  investmentListArray!: any

  @Input() allInvestments!: any
  @Input() investmentList!: any
  @Input() investmentType!: string
  @Input() className!: string

  constructor(){}

  ngOnInit(): void {
    this.investmentListArray = Object.keys(this.investmentList)

    const newArray: any = []

    const actions = Object.keys(this.investmentList)
    const allInvestmentsList = Object.keys(this.allInvestments)

    let totalInvestment = 0
    let totalInvestments = 0

    allInvestmentsList.forEach(investmentGroup => {
      Object.keys(this.allInvestments[investmentGroup]).forEach(investments => {
        this.allInvestments[investmentGroup][investments].forEach((investment: any) => {
          totalInvestments += investment.amount
        })
      })
    })

    actions.forEach(investment => this.investmentList[investment].forEach((element: any) => totalInvestment += element.amount))

    actions.forEach(investment => {
      let acc = 0
      this.investmentList[investment].forEach((element: any) => {
        acc = acc + element.amount
      })
      newArray[investment] = {
        amountTotal: acc,
        percentage: isNaN(Number(( acc / totalInvestment * 100).toFixed(2))) ? 0 : Number(( acc / totalInvestment * 100).toFixed(2)),
        valueTotal: acc * 11.25
      }
    })

    this.investmentListTotalizer = newArray
    this.groupTotalizer = {
      amountTotal: totalInvestment,
      valueTotal: totalInvestment * 11.25,
      percentage: isNaN(Number(( totalInvestment / totalInvestments * 100).toFixed(2))) ? 0 : Number(( totalInvestment / totalInvestments * 100).toFixed(2))
    }
  }
}
