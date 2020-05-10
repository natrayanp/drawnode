import { Injectable } from '@angular/core';
//import { ChartSidemenuService } from './chart-sidemenu.service';
import { ChartDataService } from './chart-data.service';
import * as d3 from 'd3';
import * as d3dag from 'd3-dag';

@Injectable()
export class ChartCommonService {
  windowWidth: number;
  chartdispHeight: number = 500;
  constructor(private chartDataServ: ChartDataService,)
              //private chartSidemenuServ: ChartSidemenuService) 
              {
                this.chartdispHeight = 500;
               }
  
}