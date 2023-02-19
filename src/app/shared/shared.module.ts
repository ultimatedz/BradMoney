import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './components/slider/slider.component';
import { InputValidationComponent } from './components/messages/input-validation/input-validation.component';
import { FormValidationComponent } from './components/messages/form-validation/form-validation.component';

@NgModule({
  declarations: [
    SliderComponent,
    InputValidationComponent,
    FormValidationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SliderComponent,
    InputValidationComponent,
    FormValidationComponent
  ]
})
export class SharedModule { }
