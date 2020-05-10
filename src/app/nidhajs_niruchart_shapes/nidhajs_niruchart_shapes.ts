import { LeafShape,base_rect_leaf_w_text,base_circle_leaf} from '/home/nirudhi/Natrayan/Projects/ETL/nidhajs/lib/nidhajs';
//import { LeafShape,base_circle_leaf, base_rect_leaf_w_text } from 'nidhajs';
import * as d3 from 'd3';

export class custom_dot_with_drag_handler extends LeafShape {

    private prntbasesh:any;
    private dot_radius: number;
    private dot_ver_align: number;
    private dot_hori_align: number;

    constructor(prntshape:any,d) {
    super((<base_rect_leaf_w_text>prntshape.baseshape).width,((<base_rect_leaf_w_text>prntshape.baseshape).height)/2,prntshape,(<base_rect_leaf_w_text>prntshape).groupid,[[""]],{}, d);
    //d.data["obj"] = this;
    this.prntbasesh = (<base_rect_leaf_w_text>prntshape.baseshape);
    this.dot_radius = this.prntbasesh.height/5;
    this.dot_hori_align =  ((<base_rect_leaf_w_text>this.prntbasesh).width);
    this.dot_ver_align = ((<base_rect_leaf_w_text>this.prntbasesh).height)/2;

    this.baseshape = new base_circle_leaf(0,0,this,this.prntbasesh.groupid,this.dot_radius);
    this.create();
  }

  create() {
    this.baseshape.mybaseleaf
      .attr("id","oouterport")
      .attr("class", "port-outer");
    

    //inner circle
    let msx= this.childshape.push(new base_circle_leaf(0,0,this,this.prntbasesh.groupid,this.dot_radius/2));
    this.childshape[msx-1].mybaseleaf
        .attr("id","oinnerport")
        .attr("class", "port-inner");
    let con_base = this.childshape[msx-1];

    msx= this.childshape.push(new base_circle_leaf(0,0,this,this.prntbasesh.groupid,this.dot_radius));
    this.childshape[msx-1].mybaseleaf
         .attr("class", "port-scrim")
         .attr("fill", "green").
         attr("fill-opacity",0.5);
    //this.childshape[msx-1].add_drag_forbase();
    //this.childshape[msx-1].add_drag_on_cpy_forbase([new Connectors(this.childshape[msx-1]),null,null,null]);
    this.childshape[msx-1].add_connector_function(con_base,"Connectors",[null,null,null]);
    this.set_clr();

  }

  moving_bare() {
  }

  recalc_adj_factor() {
    this.x_adjust_factor = (<base_rect_leaf_w_text>this.parentshape.baseshape).width;
    this.y_adjust_factor = ((<base_rect_leaf_w_text>this.parentshape.baseshape).height)/2;
    this.set_x(this.isemptyobject(this.parentshape)?this.get_x():0);
    this.set_y(this.isemptyobject(this.parentshape)?this.get_y():0); 
  }

  size_calc(){

  }

  set_clr() {
    console.log(this);
    console.log(this.data.data.mould_conf);
    let cl = this.data.data.mould_conf.color_config;
    if ("port" in cl){
          this.baseshape.mybaseleaf
            .attr("fill",cl["port"].fill)
            .attr("stroke", cl["port"].stroke)
            .attr("stroke-width", cl["port"].stroke_width);
    }

    if ("drag_port" in cl) {
          this.childshape[1].mybaseleaf
            .attr("fill",cl["drag_port"].fill);

    }
  }
  /*
  drag_cpy(myobj: LeafShape) {
    let msx = new base_circle_leaf(0,0,myobj.parentshape,myobj.parentshape.groupid,myobj.parentshape.dot_radius);
    //console.log("msx----:");
    //console.log(myobj);
    //console.log(msx);
    //console.log("msx----:");
    msx.mybaseleaf
         .attr("class", "port-scrim")
         .attr("fill", "blue");
    msx.iammoving = true;
    msx.add_drag_forbase();
    return msx;    
  }
  */

}

export class custom_dot_no_drag_handler extends LeafShape {
    
    private prntbasesh:any;
    private dot_radius: number;
    //private dot_ver_align: number;
    //private dot_hori_align: number;

    constructor(prntshape:any,d) {
    super(0,((<base_rect_leaf_w_text>prntshape.baseshape).height)/2,prntshape,(<base_rect_leaf_w_text>prntshape).groupid,[[""]],{},d);
    this.prntbasesh = <base_rect_leaf_w_text>prntshape.baseshape;
    this.dot_radius = this.prntbasesh.height/5;

    this.baseshape = new base_circle_leaf(0,0,this,this.groupid,this.dot_radius,);
    this.create();
    
  }

  create() {
    this.baseshape.mybaseleaf
      .attr("id","oouterport")
      .attr("class", "port-outer");


    let msx= this.childshape.push(new base_circle_leaf(0,0,this,this.groupid,this.dot_radius/2));
    this.childshape[msx-1].mybaseleaf
        .attr("id","oinnerport")
        .attr("class", "port-inner");
      
    this.set_clr();
    /*
    msx= this.childshape.push(new base_circle_leaf(0,0,this,((<base_circle_leaf>this.baseshape).radius)));
    this.childshape[msx-1].mybaseleaf
         .attr("class", "port-scrim")
         .attr("fill", "green");
    this.childshape[msx-1].add_drag_forbase();
    
    constructor(x:number,y:number, prntshape:any,r: number)

        0,
      ((<base_rect_leaf_w_text>this.baseshape).height)/2,this,((<base_rect_leaf_w_text>this.baseshape).height/4)));
    */
  }

  moving_bare() {
  }
  size_calc(){}

  recalc_adj_factor() {
    this.x_adjust_factor = 0;
    this.y_adjust_factor = ((<base_rect_leaf_w_text>this.parentshape.baseshape).height)/2;
    this.set_x(this.isemptyobject(this.parentshape)?this.get_x():0);
    this.set_y(this.isemptyobject(this.parentshape)?this.get_y():0); 
  }

    set_clr() {
      console.log(this.data);
    let cl = this.data.data.mould_conf.color_config;
    if ("port" in cl){
          this.baseshape.mybaseleaf
            .attr("fill",cl["port"].fill)
            .attr("stroke", cl["port"].stroke)
            .attr("stroke-width", cl["port"].stroke_width);
    }
  }

}



export class custom_button_round extends LeafShape {

    private prntbasesh:any;
    private dot_radius: number;
    private dot_ver_align: number;
    private dot_hori_align: number;
    private text_obj_1: any;

    constructor(prntshape:any,d) {
    super((<base_rect_leaf_w_text>prntshape.baseshape).width-30,0,prntshape,(<base_rect_leaf_w_text>prntshape).groupid,[[""]],{}, d);
    console.log("dddddddppppppp");
    console.log(prntshape);
    //d.data["obj"] = prntshape.myroot;
    this.prntbasesh = (<base_rect_leaf_w_text>prntshape.baseshape);
    this.dot_radius = this.prntbasesh.height/5;
    this.dot_hori_align =  ((<base_rect_leaf_w_text>this.prntbasesh).width)-50;
    this.dot_ver_align = ((<base_rect_leaf_w_text>this.prntbasesh).height)/2;

    
    //this.baseshape = new base_circle_leaf(0,0,this,this.prntbasesh.groupid,this.dot_radius);
    
    this.baseshape = new base_rect_leaf_w_text(0,0,this,this.prntbasesh.groupid,10,10);  //Set min height and width of leaf
    
    this.create();
  }

  create() {

    this.baseshape.mybaseleaf
      .attr("id","button")
      .attr("class", "button")
      //.attr("fill","red")
      .attr("rx",1)
      .style("cursor", "pointer")
      .style("fill-opacity","0.3");

      this.baseshape.set_click_event({"event_code":"menu-btn-clk"});
      
      /*
      .on("click",(d)=> { this.baseshape.myroot[0].chart_obj.click_calbk({"even":"click","event_code":"menu-btn-clk","data":{}});
                          alert("node was double clicked"); 
                        });
    */
    
    //inner circle
   (<base_rect_leaf_w_text>this.baseshape).add_text(5,6,"+","white");
   
   this.baseshape.mybaseleaf.raise();

  }

  moving_bare() {
    /*
        this.text_obj_1.attr("x", this.get_x())
               .attr("y", this.get_y());
  */
  }

  leaf_resize() {

   // this.childshape[0].leaf_resize(this);
  }
  size_calc(){

  }

  recalc_adj_factor() {
    this.x_adjust_factor =  (<base_rect_leaf_w_text>this.parentshape.baseshape).width-30;
    this.y_adjust_factor = 0;
    this.set_x(this.isemptyobject(this.parentshape)?this.get_x():0);
    this.set_y(this.isemptyobject(this.parentshape)?this.get_y():0); 
  }



  
  }



export class custom_rect_in_out_port_leaf extends LeafShape {
  
  public rectcornerradius: number = 5;
  
  constructor(x:number,y:number, prntshape:any,groupid : string,t: any[],chartobj, d: any) {
    super(x,y,prntshape,groupid,t,chartobj,d);
    //console.log(this);
    //console.log("ttette");
    //consloe.log("ererer");
    this.baseshape = new base_rect_leaf_w_text(0,0,this,groupid,150,10);  //Set min height and width of leaf
    // constructor(x:number,y:number, prntshape:any, groupid:string, w: number,h: number) {
    //this.baseshape.set_myroot();
    this.text_obj.init_text();
    this.create();
  }

  create() {
    this.baseshape.mybaseleaf
        .attr("class", "input-leaf")
        .attr("rx", this.rectcornerradius)
        .attr("ry", this.rectcornerradius)
        .attr("stroke-width", 2)
        .attr("fill", "#FFE4C4" )
        .attr("stroke","#DAA520" );


    this.baseshape.add_drag_forbase();

    let msx = this.childshape.push(new custom_dot_with_drag_handler(this, this.data));
    //console.log(this);
    //console.log(this.myroot);
    if (!("outport" in this.myroot[0].connect_ports)) {
      this.myroot[0].connect_ports["outport"] = [];
    }
    this.myroot[0].connect_ports.outport.push(this.childshape[msx-1]);

    msx = this.childshape.push(new custom_dot_no_drag_handler(this,this.data));
    if (!("inport" in this.myroot[0].connect_ports)) {
      this.myroot[0].connect_ports["inport"] = [];
    }
    this.myroot[0].connect_ports.inport.push(this.childshape[msx-1]);
    this.myroot[0].chart_obj.push_leaf("draw_area",this);

    msx = this.childshape.push(new custom_button_round(this, this.data));
  }

  leaf_resize() {
    //this.childshape[0].leaf_resize(this);
  }

    /*

    //@TESTING CODES
    this.childshape.push(new custom_dot_with_drag_handler(             /* -->  this is test for NON BASE shape as child 
    //this.childshape.push(new base_circle_leaf(      /* -->  this is test for BASE shape as child 
      ((<base_rect_leaf_w_text>this.baseshape).width),
      ((<base_rect_leaf_w_text>this.baseshape).height)/2,this,((<base_rect_leaf_w_text>this.baseshape).height/4)));
    //@TESTING CODES


    //@TESTING CODES
    this.childshape.push(new custom_dot_no_drag_handler(             /* -->  this is test for NON BASE shape as child 
    //this.childshape.push(new base_circle_leaf(      /* -->  this is test for BASE shape as child 
      0,
      ((<base_rect_leaf_w_text>this.baseshape).height)/2,this,((<base_rect_leaf_w_text>this.baseshape).height/4)));
    //@TESTING CODES
*/

  recalc_adj_factor() {
    this.set_x(this.isemptyobject(this.parentshape)?this.get_x():0);
    this.set_y(this.isemptyobject(this.parentshape)?this.get_y():0); 
  }

  moving_bare() {}
  size_calc(){}

    set_clr() {
      console.log(this.data);
    let cl = this.data.data.mould_conf.color_config;
    if ("body" in cl){
          this.baseshape.mybaseleaf
            .attr("fill", cl["body"].fill)
            .attr("stroke", cl["body"].stroke)
            .attr("stroke-width", cl["body"].stroke_width);
    }
  }

}




export class custom_rect_in_out_port_leaf_n extends LeafShape {
  
  public rectcornerradius: number = 5;
  
  constructor(x:number,y:number, prntshape:any,groupid : string,t: any[],chartobj, d: any) {
    super(x,y,prntshape,groupid,t,chartobj,d);
    //console.log(this);
    //console.log("ttette");
    //consloe.log("ererer");
    this.baseshape = new base_rect_leaf_w_text(0,0,this,groupid,250,20);  //Set min height and width of leaf
    // constructor(x:number,y:number, prntshape:any, groupid:string, w: number,h: number) {
    //this.baseshape.set_myroot();
    this.text_obj.init_text();
    this.create();
  }

  create() {
    this.baseshape.mybaseleaf
        .attr("class", "input-leaf")
        .attr("rx", this.rectcornerradius)
        .attr("ry", this.rectcornerradius)
        .attr("stroke-width", 2)
        .attr("fill", "#FFE4C4" )
        .attr("stroke","#DAA520" );


    this.baseshape.add_drag_forbase();

    let msx = this.childshape.push(new custom_dot_with_drag_handler(this, this.data));
    
    //console.log(this);
    //console.log(this.myroot);
    if (!("outport" in this.myroot[0].connect_ports)) {
      this.myroot[0].connect_ports["outport"] = [];
    }
    this.myroot[0].connect_ports.outport.push(this.childshape[msx-1]);
    msx = this.childshape.push(new custom_dot_with_drag_handler_n(this, this.data));
    this.myroot[0].connect_ports.outport.push(this.childshape[msx-1]);

    msx = this.childshape.push(new custom_dot_no_drag_handler(this,this.data));
    if (!("inport" in this.myroot[0].connect_ports)) {
      this.myroot[0].connect_ports["inport"] = [];
    }
    this.myroot[0].connect_ports.inport.push(this.childshape[msx-1]);

      msx = this.childshape.push(new custom_dot_no_drag_handler_n(this,this.data));  
          this.myroot[0].connect_ports.inport.push(this.childshape[msx-1]);
    this.myroot[0].chart_obj.push_leaf("draw_area",this);
  }

  leaf_resize() {
    //this.childshape[0].leaf_resize(this);
  }

    /*

    //@TESTING CODES
    this.childshape.push(new custom_dot_with_drag_handler(             /* -->  this is test for NON BASE shape as child 
    //this.childshape.push(new base_circle_leaf(      /* -->  this is test for BASE shape as child 
      ((<base_rect_leaf_w_text>this.baseshape).width),
      ((<base_rect_leaf_w_text>this.baseshape).height)/2,this,((<base_rect_leaf_w_text>this.baseshape).height/4)));
    //@TESTING CODES


    //@TESTING CODES
    this.childshape.push(new custom_dot_no_drag_handler(             /* -->  this is test for NON BASE shape as child 
    //this.childshape.push(new base_circle_leaf(      /* -->  this is test for BASE shape as child 
      0,
      ((<base_rect_leaf_w_text>this.baseshape).height)/2,this,((<base_rect_leaf_w_text>this.baseshape).height/4)));
    //@TESTING CODES
*/

  

  moving_bare() {}
  recalc_adj_factor() {
    this.set_x(this.isemptyobject(this.parentshape)?this.get_x():0);
    this.set_y(this.isemptyobject(this.parentshape)?this.get_y():0); 
  }
  size_calc(){}

    set_clr() {
      console.log(this.data);
    let cl = this.data.data.mould_conf.color_config;
    if ("body" in cl){
          this.baseshape.mybaseleaf
            .attr("fill", cl["body"].fill)
            .attr("stroke", cl["body"].stroke)
            .attr("stroke-width", cl["body"].stroke_width);
    }
  }

}


export class custom_dot_with_drag_handler_n extends LeafShape {

    private prntbasesh:any;
    private dot_radius: number;
    private dot_ver_align: number;
    private dot_hori_align: number;

    constructor(prntshape:any,d) {
    super((<base_rect_leaf_w_text>prntshape.baseshape).width,0,prntshape,(<base_rect_leaf_w_text>prntshape).groupid,[[""]],{},d);
   // d.data["obj"] = this;
    this.prntbasesh = (<base_rect_leaf_w_text>prntshape.baseshape);
    this.dot_radius = this.prntbasesh.height/5;
    this.dot_hori_align =  ((<base_rect_leaf_w_text>this.prntbasesh).width);
    this.dot_ver_align = ((<base_rect_leaf_w_text>this.prntbasesh).height)/2;

    this.baseshape = new base_circle_leaf(0,0,this,this.prntbasesh.groupid,this.dot_radius);
    this.create();
  }

  create() {
    this.baseshape.mybaseleaf
      .attr("id","oouterport")
      .attr("class", "port-outer");
    

    //inner circle
    let msx= this.childshape.push(new base_circle_leaf(0,0,this,this.prntbasesh.groupid,this.dot_radius/2));
    this.childshape[msx-1].mybaseleaf
        .attr("id","oinnerport")
        .attr("class", "port-inner");
    let con_base = this.childshape[msx-1];

    msx= this.childshape.push(new base_circle_leaf(0,0,this,this.prntbasesh.groupid,this.dot_radius));
    this.childshape[msx-1].mybaseleaf
         .attr("class", "port-scrim")
         .attr("fill", "green");
    //this.childshape[msx-1].add_drag_forbase();
    //this.childshape[msx-1].add_drag_on_cpy_forbase([new Connectors(this.childshape[msx-1]),null,null,null]);
    this.childshape[msx-1].add_connector_function(con_base,"Connectors",[null,null,null]);
    this.set_clr();

  }

  moving_bare() {
  }

  recalc_adj_factor() {
    this.x_adjust_factor =  (<base_rect_leaf_w_text>this.parentshape.baseshape).width;
    this.y_adjust_factor = 0;
    this.set_x(this.isemptyobject(this.parentshape)?this.get_x():0);
    this.set_y(this.isemptyobject(this.parentshape)?this.get_y():0); 
  }

  leaf_resize() {

   // this.childshape[0].leaf_resize(this);
  }
  size_calc(){

  }


  set_clr() {
    console.log(this);
    console.log(this.data.data.mould_conf);
    let cl = this.data.data.mould_conf.color_config;
    if ("port" in cl){
          this.baseshape.mybaseleaf
            .attr("fill",cl["port"].fill)
            .attr("stroke", cl["port"].stroke)
            .attr("stroke-width", cl["port"].stroke_width);
    }

    if ("drag_port" in cl) {
          this.childshape[1].mybaseleaf
            .attr("fill",cl["drag_port"].fill);

    }
  }
  /*
  drag_cpy(myobj: LeafShape) {
    let msx = new base_circle_leaf(0,0,myobj.parentshape,myobj.parentshape.groupid,myobj.parentshape.dot_radius);
    //console.log("msx----:");
    //console.log(myobj);
    //console.log(msx);
    //console.log("msx----:");
    msx.mybaseleaf
         .attr("class", "port-scrim")
         .attr("fill", "blue");
    msx.iammoving = true;
    msx.add_drag_forbase();
    return msx;    
  }
  */

}




export class custom_dot_no_drag_handler_n extends LeafShape {
    
    private prntbasesh:any;
    private dot_radius: number;
    //private dot_ver_align: number;
    //private dot_hori_align: number;

    constructor(prntshape:any,d) {
    super(0,0,prntshape,(<base_rect_leaf_w_text>prntshape).groupid,[[""]],{},d);
    this.prntbasesh = <base_rect_leaf_w_text>prntshape.baseshape;
    this.dot_radius = this.prntbasesh.height/5;

    this.baseshape = new base_circle_leaf(0,0,this,this.groupid,this.dot_radius,);
    this.create();
    
  }

  create() {
    this.baseshape.mybaseleaf
      .attr("id","oouterport")
      .attr("class", "port-outer");


    let msx= this.childshape.push(new base_circle_leaf(0,0,this,this.groupid,this.dot_radius/2));
    this.childshape[msx-1].mybaseleaf
        .attr("id","oinnerport")
        .attr("class", "port-inner");
      
    this.set_clr();
    /*
    msx= this.childshape.push(new base_circle_leaf(0,0,this,((<base_circle_leaf>this.baseshape).radius)));
    this.childshape[msx-1].mybaseleaf
         .attr("class", "port-scrim")
         .attr("fill", "green");
    this.childshape[msx-1].add_drag_forbase();
    
    constructor(x:number,y:number, prntshape:any,r: number)

        0,
      ((<base_rect_leaf_w_text>this.baseshape).height)/2,this,((<base_rect_leaf_w_text>this.baseshape).height/4)));
    */
  }

  moving_bare() {
  }

  recalc_adj_factor() {
    this.set_x(this.isemptyobject(this.parentshape)?this.get_x():0);
    this.set_y(this.isemptyobject(this.parentshape)?this.get_y():0); 
  }

  size_calc(){}

    set_clr() {
      console.log(this.data);
    let cl = this.data.data.mould_conf.color_config;
    if ("port" in cl){
          this.baseshape.mybaseleaf
            .attr("fill",cl["port"].fill)
            .attr("stroke", cl["port"].stroke)
            .attr("stroke-width", cl["port"].stroke_width);
    }
  }

}