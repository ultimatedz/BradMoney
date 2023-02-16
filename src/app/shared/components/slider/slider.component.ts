import { Component, Input, OnInit } from '@angular/core';
import { Slider } from '../../models/slider.model';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit{

  @Input() slidesList: Slider[] = []

  count = 1

  ngOnInit(): void {
    const radioElement: HTMLInputElement = document.querySelector('#customer1')!
    if(radioElement){
      radioElement.checked = true
    }

    setInterval(() => {
      this.nextImage()
    }, 3000)
  }

  nextImage(){
    this.count++
    if(this.count>4){
      this.count = 1
    }

    const elementSelected: HTMLInputElement = document.querySelector(`#customer${this.count}`)!
    elementSelected.checked = true
  }

  updateCount(id: number){
    this.count = id
  }
}
