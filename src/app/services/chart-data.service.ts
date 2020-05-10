import { Injectable } from '@angular/core';
import { Mouldtype, Mouldconfigs, MappingChartdata } from '/home/nirudhi/Natrayan/Projects/ETL/niruchart/src/niruchart_models';

import { ChartCommonService } from './chart-common.service';
import { HttpClient } from '@angular/common/http';
import * as d3 from 'd3';
import * as d3dag from 'd3-dag';
import { Observable } from "rxjs";
import { Observer } from "rxjs";
//import * as leafm from "../../../moulds";

export interface ScriptModel {
    name: string,
    src: any,
    loaded: boolean
}

@Injectable()
export class ChartDataService {

  my_Moulds: Mouldconfigs[]; //Store all the allowed Moulds
  //my_saved_Moulds:saved_Moulds[];
  chartdata: MappingChartdata[];  
  nodes:any;
  desc: any;
  nnn: any;
   constructor(private http: HttpClient) { }
 private scripts: ScriptModel[] = [];

  df() {
    return this.http.get('http://127.0.0.1:8081/download_all', { responseType: 'blob'});
  }


  async impcl(leafmoulds: any) {
   // return  await import("../../../moulds");
    /*
    console.log("mould_classes");
    console.log(mould_classes);
    let dd = await mould_classes.then( d =>  { 
      console.log(d);
      this.nnn = {...this.nnn,...d};https://www.google.com/search?q=class+not+exported+error+in+typescript&oq=class+nModule%20%27%22../../../../../node_modules/rxjs/Observer%22%27%20has%20no%20exported%20member%20%27Observer%27.t+exported+error+in+typs&aqs=chrome.1.69i57j33.6751j0j4&sourceid=chrome&ie=UTF-8
       console.log("mould_classeseeee");
        this.nnn =  d; 
       console.log(this.nnn);
                      if ("testclass" in this.nnn) {
                      console.log("found");
                      this.kkd();
                    }
    }
      );*/
      }

  kkd() {
       console.log("good done pr");
    let smm = new this.nnn.testclass();
    smm.ds();
    console.log("good done");
  }
 

   myload(script: ScriptModel): Observable<ScriptModel> {
        return new Observable<ScriptModel>((observer: Observer<ScriptModel>) => {
            var existingScript = this.scripts.find(s => s.name == script.name);

            // Complete if already loaded
            if (existingScript && existingScript.loaded) {
                observer.next(existingScript);
                observer.complete();
            }
            else {
                // Add the script
                this.scripts = [...this.scripts, script];
                console.log("########");
                console.log(this.scripts);
                console.log(script);
                console.log("########");
                // Load the script
                let scriptElement = document.createElement("script");
                scriptElement.type = "text/javascript";
                scriptElement.src = script.src;

                scriptElement.onload = (dd) => {
                  console.log("########---");
                  
                  console.log(dd);
                  console.log(document.scripts[document.scripts.length-1]);
                  console.log("########---");
                    script.loaded = true;
                    observer.next(script);
                    observer.complete();
                };

                scriptElement.onerror = (error: any) => {
                    observer.error("Couldn't load script " + script.src);
                };

                document.getElementsByTagName('body')[0].appendChild(scriptElement);
                console.log(document.getElementsByTagName('body')[0].appendChild(scriptElement));
            }
        });
    }




   get_installed_moulds() {       

     this.my_Moulds = [
       {
        "mouldType": { 
                        "mouldGroup": "io",
                        "moduleId": "pandas",
                        "submoduleId": "read",
                        "mouldId": "io_csv"
                      },
        "dispname": "pandas.read_csv",
        "mould_class":"rect_in_out_port_leaf",
        "color_config" : { "port" : {
                          "fill": "#FFE4C4",
                          "stroke": "#DAA520",
                          "stroke_width": 2
                          },
                          "drag_port" : {
                          "fill": "#FFE4C4",
                          "stroke": "#DAA520",
                          "stroke_width": 2
                          },
                          "body" : {
                          "fill": "#FFE4C4",
                          "stroke": "#DAA520",
                          "stroke_width": 2
                          }
                        },
        "mould_form": {}
       },
       {
        "mouldType": { 
                        "mouldGroup": "io",
                        "moduleId": "pandas",
                        "submoduleId": "read",
                        "mouldId": "io_rpt"
                      },
        "dispname": "pandas.read_rpt",
        "mould_class":"rect_in_out_port_leaf",
        "color_config" :{ "port" : {
                          "fill": "#FFE4C4",
                          "stroke": "#DAA520",
                          "stroke_width": 2
                          },
                          "drag_port" : {
                          "fill": "#FFE4C4",
                          "stroke": "#DAA520",
                          "stroke_width": 2
                          },
                          "body" : {
                          "fill": "#FFE4C4",
                          "stroke": "#DAA520",
                          "stroke_width": 2
                          },
                        },
        "mould_form": {}
       },
     ]
   }
  
  /*
  preparedataforchart() {
    this.getchartdata();   //Data Saved in Database
    if (this.chartdata.length) {

    }
    this.dagstratifyChartdata();
  } */

  get_saved_chart() {
    /*
    this.my_saved_Moulds = [
      {
        
      }
    ]
    */
  }
  

getchartdata(projdetforchart) {
  let projexists: boolean = true;
  
  if ("newproject" in projdetforchart && projdetforchart.newproject) {
    
      // Hit backend to create a new project
      // Return empty chardata for blank
      projexists = false;      
      this.chartdata = [];
    
  } 


  if (projexists) {
      
      if("leafname" in projdetforchart && projdetforchart.leafname.length>0) {
        this.chartdata = [];
        //Hit backend to fetch the details of the leaf view of the leaf in the project
      } else {
          //Hit backend to fetch the details of the main view of the project
          this.chartdata = [
          {
            "id": "Eve",
            "x":400,
            "y":40,
            "mould_conf": {
                            "mouldType": {
                                            "mouldGroup": "test",
                                            "moduleId": "",
                                            "submoduleId": "",
                                            "mouldId": "",
                            },
                            "dispname": "pandas.read_rpt",
                            "mould_class":"rect_in_out_port_leaf",
                "color_config" :{ "port" : {
                                  "fill": "black",
                                  "stroke": "black",
                                  "stroke_width": 0
                                  },
                                  "drag_port" : {
                                  "fill": "green",
                                  "stroke": "green",
                                  "stroke_width": 2
                                  },
                                  "body" : {
                                  "fill": "#FFE4C4",
                                  "stroke": "#DAA520",
                                  "stroke_width": 2
                                  },
                                },
                            },
            "leaf_d_txt": [[{'textval':'Eves leaf'}]],
            /*
            "nodeconf" : {
                "nodetype": {},
                  "color": "#FFE4C4",
                  "bordercolor": "#DAA520",
                  "borderwidth": 2,
                  "iport": 0,
                  "oport": 1,
                  "iplug": true,
                  "oplug": false
              },
              */
            "parentIds": [],
            "nodedata": {
                  "text": "test name eve"
              }
          },
          {
            "id": "Cain",
            "x":450,
            "y":120,
            "mould_conf": {
                            "mouldType": {
                                            "mouldGroup": "test",
                                            "moduleId": "",
                                            "submoduleId": "",
                                            "mouldId": "",
                            },
                            "dispname": "pandas.read_rpt",
                            "mould_class":"rect_in_out_port_leaf",
                "color_config" :{ "port" : {
                                  "fill": "black",
                                  "stroke": "black",
                                  "stroke_width": 0
                                  },
                                  "drag_port" : {
                                  "fill": "green",
                                  "stroke": "green",
                                  "stroke_width": 2
                                  },
                                  "body" : {
                                  "fill": "#FFE4C4",
                                  "stroke": "#DAA520",
                                  "stroke_width": 2
                                  },
                                },
                            },
            "leaf_d_txt": [[{'textval':'Cain leaf'}]],        
                /*
            "nodeconf" : {
                  "nodetype": {},
                  "color": "#FFE4C4",
                  "bordercolor": "#DAA520",
                  "borderwidth": 2,
                  "iport": 1,
                  "oport": 1,
                  "iplug": false,
                  "oplug": false,
              },
              */
            "parentIds": [],
            "nodedata": {
                  "text": "test name for cain fll of fund and joy"
              },
          },
          {
            "id": "Seth",
            "x":490,
            "y":240,
            "mould_conf": {
                            "mouldType": {
                                            "mouldGroup": "test",
                                            "moduleId": "",
                                            "submoduleId": "",
                                            "mouldId": "",
                            },
                            "dispname": "pandas.read_rpt",
                            "mould_class":"rect_in_out_port_leaf",
                "color_config" :{ "port" : {
                                  "fill": "black",
                                  "stroke": "black",
                                  "stroke_width": 0
                                  },
                                  "drag_port" : {
                                  "fill": "green",
                                  "stroke": "green",
                                  "stroke_width": 2
                                  },
                                  "body" : {
                                  "fill": "#FFE4C4",
                                  "stroke": "#DAA520",
                                  "stroke_width": 2
                                  },
                                },
                            },
            "leaf_d_txt": [[{'textval':'Seth leaf'}]],        
                /*          
            "nodeconf" : {
                  "nodetype": {},
                  "color": "#FFE4C4",
                  "bordercolor": "#DAA520",
                  "borderwidth": 2,
                  "iport": 1,
                  "oport": 1,
                  "iplug": false,
                  "oplug": false,
              },
              */
            "parentIds": ["Eve","Cain"],
            "nodedata": {
                  "text": "seth"      
              }
          }
        ,
          {
            "id": "Enos",
            "x":520,
            "y":340,
            "mould_conf": {
                            "mouldType": {
                                            "mouldGroup": "test",
                                            "moduleId": "",
                                            "submoduleId": "",
                                            "mouldId": "",
                            },
                            "dispname": "pandas.read_rpt",
                            "mould_class":"rect_in_out_port_leaf",
                "color_config" :{ "port" : {
                                  "fill": "black",
                                  "stroke": "black",
                                  "stroke_width": 0
                                  },
                                  "drag_port" : {
                                  "fill": "green",
                                  "stroke": "green",
                                  "stroke_width": 2
                                  },
                                  "body" : {
                                  "fill": "#FFE4C4",
                                  "stroke": "#DAA520",
                                  "stroke_width": 2
                                  },
                                },
                            },
            "leaf_d_txt": [[{'textval':'Enos leaf'}]],        
                /*       
            "nodeconf" : {
                  "nodetype": {},
                  "color": "#FFE4C4",
                  "bordercolor": "#DAA520",
                  "borderwidth": 2,
                  "iport": 1,
                  "oport": 1,
                  "iplug": false,
                  "oplug": false,
              },   
              */
            "parentIds": ["Eve","Seth"],
            "nodedata": {
                  "text": "Enos"      
              }
          }
          /*,
          {
            "id": "Noam",
                "x":460,
            "y":120,  
            "parentIds": ["Seth"],
            "iport": true,
            "oport": true,
            "color": "#FFE4C4",
            "bordercolor": "#DAA520",
            "borderwidth": 2
          },
          {
            "id": "Abel",
                "x":460,
            "y":200,  
            "summa":"Abel  test values",
            "parentIds": ["Eve"],
            "iport": true,
            "oport": true,
                "color": "#FFE4C4",
            "bordercolor": "#DAA520",
            "borderwidth": 2
          },
          {
            "id": "Awan",
                "x":635,
            "y":240,  
            "parentIds": ["Eve"],
            "iport": true,
            "oport": true,
                "color": "#FFE4C4",
            "bordercolor": "#DAA520",
            "borderwidth": 2
          },
          {
            "id": "Enoch",
            "x":260,
            "y":240,  
            "parentIds": ["Eve"],
            "iport": true,
            "oport": true,
            "color": "#FFE4C4",
            "bordercolor": "#DAA520",
            "borderwidth": 2
          },
          {
            "id": "Azura",
                "x":835,
            "y":125,  
            "parentIds": ["Eve"],
            "iport": true,
            "oport": true,
                "color": "#FFE4C4",
            "bordercolor": "#DAA520",
            "borderwidth": 2
          }*/
        ];
      }
    }
}

dagstratifyChartdata() {
let strat = d3dag.dagStratify();
this.nodes = strat(this.chartdata);
this.desc = this.nodes.descendants();
console.log(this.nodes);
console.log(this.nodes.links());
console.log(this.nodes.descendants());

//childlinks = nodes.links().filter( d => d.source.id =="Eve")  //replace Eve with current node//
//parentlinks = nodes.links().filter( d => d.target.id =="Eve")  //replace Eve with current node

}
 

}