// comment this whenyou don't use the ng-niruchart library

import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { ChartDataService } from '../../services/chart-data.service';
import { ChartCommonService } from '../../services/chart-common.service';
//import { NiruChart } from '/home/nirudhi/Natrayan/Projects/ETL/niruchart/lib/niruchart';

import { NgNiruchartComponent } from '/home/nirudhi/Natrayan/Projects/ETL/nat-workspace/projects/ng-niruchart/src/lib/ng-niruchart.component';
import { DomSanitizer } from '@angular/platform-browser';
import * as niruchart_shapes from '../../nidhajs_niruchart_shapes/nidhajs_niruchart_shapes';

// comment this whenyou don't use the ng-niruchart library



// comment this when not using ng-niruchart library
/*
import { Component, OnInit, Input, ViewEncapsulation, HostListener } from '@angular/core';
import { ChartDataService } from './services/chart-data.service';
import { ChartCommonService } from './services/chart-common.service';
import { NgNiruchartComponent } from 'ng-niruchart';
import { DomSanitizer } from '@angular/platform-browser';
import * as niruchart_shapes from './nidhajs_niruchart_shapes/nidhajs_niruchart_shapes';
*/
// comment this when not using ng-niruchart library


interface template  {
  text: string,
   col: string
}

interface projectdetails {
  projname: string,
  newproject: boolean;
  leafname: string
}

interface tabdetails {
  "id": string,
  "name": string,
  "type": string
}


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class ChartComponent implements OnInit {

  @Input() projdet: projectdetails;

  canvas: any;
  myzoom: any;
  nodecontainer:any;
  nodelayer: any;
  nodegroup: any;
  mygrid: any;
  chartdispWidth =100;
  retgroup: any;
  linklayer: any;
  connec:any;
  chartdispHeight: number = 500;
  
  //Node config details START
  nodeWidth = 204;
  nodeHeight = 40;
  plugWidth = 40;
  dotcircleradius = 10;
  rectcornerradius = 6;
  nodestrkwidth = 2;
  nodestrkcolor = "red";
  dragme_inputdoot: any;
  node_plug_hide = 5;
  node_text_margin = 10;  //per side margin
  dragdot  : any;
  node_max_x_drag : number = 100;
  node_x_drag: number;
  //Node config details END
  
  // Side Menu
  MySideMenu: any;
  editmode: boolean = false;
  sidemenureq: boolean = false;
  sidemenuwidth: number = 230;
  // Side Menu
  
  inputs = [{"text": "inleaf1", "col": "red","outlest": [1,1]}, {"text": "inleaf2", "col": "blue","outlest": [1,1]}, {"text": "inleaf3", "col": "green","outlest": [1,1]}];
  //outputs = [{"text": "outleaf1", "col": "blue","outlest": [1,1]}, {"text": "outleaf2", "col": "red","outlest": [1,1]}, {"text": "outleaf3", "col": "green","outlest": [1,1]}];
  
  inputstartx = 20;
  inputstarty = 20;
  outputstartx = 700;
  outputstarty = 20;
  verticalmargin = 20;
  elementwidth = 120;
  elementheight = 50;
  //dsd
  
     xx:any;
    yy: any;
  inputcontainer : any;
  outputcontainer : any;
  inputcontainer1 = "input-container";
  outputcontainer1 = "output-container";
  coordinates : any;
  dragline: any;
  dotpositionABS = [0, 0];
  drawnode_cont:any;
  data_list: any;
  myline: any
  pathid = 0;
  active_pathid: number;
  md: any;
  cont_w = 10;
  cont_h = 500;
  bezierWeight = 0.775;
  mychartobj: any;
  mould_classes: any;
  dds: any;
  confs = [];
  tabs :tabdetails[] = [];
  selected = 0;
  projectname: string;
  projdetforchart: projectdetails;
  tabid : number;

  constructor(  private chartDataServ: ChartDataService,
                private chartCommonServ: ChartCommonService,
                private sanitizer: DomSanitizer
                //private chartSidemenuServ: ChartSidemenuService
                              ) {             
                this.tabid = 0;
     }
  
  
    ngOnInit() 
    {
      this.projectname = this.projdet["projname"];
      this.projdetforchart = this.projdet;
      this.initchart(this.projdetforchart);
           console.log("(*(*(*)))");
           /*
      let dd =  import(niruchart_shapes).
          then( (d: any) =>  { 
            console.log("(*(*(*)))");
            console.log(d);
            this.mould_classes = {...this.mould_classes,...d};
            
            console.log("mould_classeseeee");
              this.mould_classes =  d; 
            console.log(this.mould_classes);
                            if ("testclass" in this.mould_classes) {
                            console.log("found");
                            this.initchart();
                          }
          });
  */
  
    }
  
    initchart(projdetforchart,tabdet = {}) {
      this.chartDataServ.getchartdata(projdetforchart);
      this.chartDataServ.get_installed_moulds();
    
    // comment this whenyou use the ng-niruchart library
    /*
      this.mychartobj = new NiruChart(window.innerWidth*.95,
                          this.chartCommonServ.chartdispHeight,
                          [niruchart_shapes],
                          this.chartDataServ.my_Moulds,
                          this.chartDataServ.chartdata,"natchartcanvas",250,
                          this.call_back_method
                          ); 
    */
  // comment this whenyou use the ng-niruchart library
  
    this.dds = {};
    this.dds["chart_width"] = window.innerWidth*.95;
    //this.dds["chart_height"]= this.chartCommonServ.chartdispHeight;
    this.dds["chart_height"]=  window.innerHeight*.67;
    this.dds["leafmould_class"] = [];
    this.dds["leafmould_class"].push(niruchart_shapes);  
    //this.dds["leafmould_class"] = niruchart_shapes;
    console.log("niruchart_shapes");
    console.log(this.dds["leafmould_class"]);
    this.dds["leafmould"] = this.chartDataServ.my_Moulds;
    this.dds["leafdata"]= this.chartDataServ.chartdata;
    //this.dds["leafdata"]= {};
    //this.dds["chartsvgid"] = "natchartcanvas";    
    this.dds["sidemneuwidth"] = 250;
    let ss: tabdetails;
    console.log(projdetforchart);
    console.log(this.isemptyobject(tabdet));
    if (this.isemptyobject(tabdet)) {    
      if ("leafname" in projdetforchart && projdetforchart.leafname.length > 0) {
        this.tabid = this.tabid + 1;
        ss = {
          "id":  "tabid"+this.tabid,
          "name": projdetforchart.leafname,
          "type": "L"
        };
      } else {
        this.tabid = this.tabid + 1;
        ss = {
                    "id": "tabid"+this.tabid,
                    "name": projdetforchart.projname,
                    "type": "P"
                  };                
      }
    } else {
      ss = <tabdetails>tabdet;
    }
    this.tabs.push(ss);
    console.log(this.tabs)  ;
    console.log("this.tabs")  ;
    this.dds["tabs"] = this.tabs[this.tabs.length - 1];
    this.dds["chartsvgid"] = this.tabs[this.tabs.length - 1].id;
    this.confs.push(this.dds);
    this.selected = this.tabs.length - 1;
    }
  
    resize() {
      console.log("innerwidth");
       console.log(window.innerWidth);
      this.mychartobj.resize_draw_area(window.innerWidth*.9,this.chartCommonServ.chartdispHeight);
    }
  
  call_back_method(ev) {
    console.log("kdkdkdkdk");
      switch(ev.event_code) {
        case("menu-btn-clk"): {
          console.log("inside compsss method");
          console.log(ev);
          break;
        }
      }
  }
  
  zoomreset() {
    this.mychartobj.zoom_reset();
  }
  
  update_text() {
    //this.mychartobj.chart_leafs.draw_area.leafs[5][0].text_array[0][0].textval = "Enos Leaf updated to new value";
      console.log( this.mychartobj.chart_leafs.draw_area);
      this.mychartobj.chart_leafs.draw_area.leafs[4][1].text_array[0][0].textval = "Seth Leaf updated to new value to see";
    this.mychartobj.chart_leafs.draw_area.leafs[4][1].myroot[0].text_modify();
    
  }
  
  addTab(selleafname:string) {  
    this.tabid = this.tabid + 1;  
    let ss = {
      "id": "tabid"+this.tabid,
      "name": selleafname,
      "type": "L"
    }
    this.projdetforchart = {
      "projname"   : this.projectname,
      "newproject" : false,
      "leafname"   : selleafname
    }
    //this.tabs.push(ss);    
    this.initchart(this.projdetforchart,ss);
    this.selected = this.tabs.length - 1;
  }
  
  selectedsetValue(e) {
    console.log(e);
    this.selected = e;
  }
  
  isemptyobject(obj: any): boolean {
      
    if(obj !== undefined) {
      if ((Object.keys(obj).length === 0 && obj.constructor === Object)) {
        return true;
      }
    }  
    return false;    
  
  }

  }
