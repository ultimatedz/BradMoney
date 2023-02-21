import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SharedModule } from './shared/shared.module';
import { FeaturesModule } from './features/features.module';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { NewPasswordComponent } from './pages/new-password/new-password.component';
import { ChartComponent } from './features/chart/chart.component';
import { ModalComponent } from './shared/components/modal/modal.component';



@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        RecoveryComponent,
        NewPasswordComponent,
        ModalComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CoreModule,
        SharedModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatCheckboxModule,
        FormsModule,
        ReactiveFormsModule,
        FeaturesModule
    ]
})
export class AppModule { }
