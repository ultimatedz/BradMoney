import { Component, Input, OnInit, OnDestroy, SimpleChanges } from '@angular/core';
import { Slider } from '../../models/slider.model';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit, OnDestroy{

  @Input() slidesList: Slider[] = []

  count = 1
  nextImageInterval = setInterval(() => {
    this.nextImage()
  }, 3000)

  ngOnInit(): void {
    const radioElement: HTMLInputElement = document.querySelector('#customer1')!
    if(radioElement){
      radioElement.checked = true
    }

    this.nextImageInterval
  }

  ngOnDestroy(): void {
    clearInterval(this.nextImageInterval)
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
    clearInterval(this.nextImageInterval)
    this.nextImageInterval = setInterval(() => {
      this.nextImage()
    }, 3000)
    this.count = id
  }
}
