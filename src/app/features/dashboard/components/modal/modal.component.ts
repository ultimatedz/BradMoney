import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() modalList!: any

  handleCloseModal(){
    document.querySelector('#modal')?.classList.add('hidden')
  }
}
