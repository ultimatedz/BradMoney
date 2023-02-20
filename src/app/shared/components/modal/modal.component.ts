import { Component, Input } from '@angular/core';
import { Modal } from '../../models/modal.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  
  @Input() modalsList: Modal[] = []

}
