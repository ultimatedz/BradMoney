import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './components/slider/slider.component';
import { InputValidationComponent } from './components/messages/input-validation/input-validation.component';
import { FormValidationComponent } from './components/messages/form-validation/form-validation.component';
import { AlertComponent } from './components/messages/alert/alert.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    SliderComponent,
    InputValidationComponent,
    FormValidationComponent,
    AlertComponent,
    TooltipComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SliderComponent,
    InputValidationComponent,
    FormValidationComponent,
    AlertComponent,
    TooltipComponent,
    LoaderComponent
  ]
})
export class SharedModule { }
