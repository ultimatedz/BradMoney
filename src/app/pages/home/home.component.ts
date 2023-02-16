import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
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
