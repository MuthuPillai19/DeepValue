import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { GraphContainerRoutingModule } from './graphcontainer/graphcontainer-routing.module';

import { AppComponent } from './app.component';
import { ParamselectorComponent } from './paramselector/paramselector.component';
import { GraphcontainerComponent } from './graphcontainer/graphcontainer.component';
import { ParamSelectorService } from './paramselector/paramselector.service';

// To use Animations  
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

// For FusionChart   
import * as FusionCharts from 'fusioncharts';  
import * as Charts from 'fusioncharts/fusioncharts.charts';  
import * as FintTheme from 'fusioncharts/themes/fusioncharts.theme.fint';  
import { FusionChartsModule } from 'angular4-fusioncharts';
import { BarChartComponent } from './graphcontainer/bar-chart/bar-chart.component';  
FusionChartsModule.fcRoot(FusionCharts, Charts, FintTheme);

@NgModule({
  declarations: [
    AppComponent,
    ParamselectorComponent,
    GraphcontainerComponent,
    BarChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FusionChartsModule,
    BrowserAnimationsModule,
    GraphContainerRoutingModule
  ],
  providers: [
    ParamSelectorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
