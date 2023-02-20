import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  messageInterval = setInterval(() => {
    this.alertTimer--
    this.barProgress()
  },1)

  @Input() message!: string
  @Input() alertTimer!: number

  constructor(){}

  barProgress(){
    const barTimer = document.querySelector<HTMLElement>('#bar-timer')
    barTimer!.style.width = `${(((this.alertTimer) / 500) * 100).toFixed(2)}%`
    
    if(this.alertTimer <= 0){
      document.querySelector<HTMLElement>('#alert-container')!.style.display = 'none'
      clearInterval(this.messageInterval)
    }
  }
}
