import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { CustomMaterialModule } from './material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';

import { ChartDataService } from './services/chart-data.service';
import { ChartCommonService } from './services/chart-common.service';
//import { ChartSidemenuService } from './services/chart-sidemenu.service';

//import { NgNiruchartModule } from 'ng-niruchart';
import { NgNiruchartModule } from '/home/nirudhi/Natrayan/Projects/ETL/nat-workspace/projects/ng-niruchart/src/lib/ng-niruchart.module';
import { ChartComponent } from './components/chart/chart.component';
import { ChartlandingComponent } from './components/chartlanding/chartlanding.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    ChartlandingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FlexLayoutModule,
    NgNiruchartModule,    
  ],
  providers: [ChartDataService, ChartCommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
