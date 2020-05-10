import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-chartlanding',
  templateUrl: './chartlanding.component.html',
  styleUrls: ['./chartlanding.component.scss']
})
export class ChartlandingComponent implements OnInit {

  stage:string;
  projdet: any;
  constructor() { }

  ngOnInit(): void {
    this.stage = "init";
  }

  emailFormControl = new FormControl('', [
    Validators.required    
  ]);

  matcher = new MyErrorStateMatcher();

  projtype(typ) {
    this.stage = typ;
  }

  finalsubmit(typ) {
    console.log(typ);
    if (typ == 'new') {
      console.log(this.emailFormControl.value);

      this.projdet = {
        'projname'    : this.emailFormControl.value,
        'newproject' : true
      }
    }else if (typ == 'ext') {
      this.projdet = {
        'projname'   : 'natproject',
        'newproject' : false
      }
    }
    
    this.stage = 'don';
    
  }

}
