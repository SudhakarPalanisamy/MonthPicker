import { Component, ElementRef, forwardRef, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-month-picker',
  templateUrl: './month-picker.component.html',
  styleUrls: ['./month-picker.component.css'],
  providers: [
    {
      provide:NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MonthPickerComponent),
      multi: true
    }
  ],
  host:{
    '(document:click)':'closeDatePopupDiv($event)'
  }
})

export class MonthPickerComponent implements OnInit {
  @Input() name: string = 'month';
  @Input('model') model: string ='';
  @Input('disabled') disabled: boolean = false;
  @Input('placeHolder') placeHolder: string = 'MM/YYYY';

  @Output('onSelectedItem') onSelectedItem=new EventEmitter<any>();

   pattern: RegExp = /^(0[123456789]|10|11|12)([/])[1-2][0-9][0-9][0-9]$/

  public _el;
  currentMonth: number;
  currentYear: number;

  showDate = false;

  monthList: Month[] =[];

  
  constructor(el: ElementRef) {
    this._el = el;

        let now= new Date();
    this.currentMonth = now.getMonth()+1;
    this.currentYear = now.getFullYear();

    this.monthList = [
      {Id: 1, Text: 'January'},
      {Id: 2, Text: 'February'},
      {Id: 3, Text: 'March'},
      {Id: 4, Text: 'April'},
      {Id: 5, Text: 'May'},
      {Id: 6, Text: 'June'},
      {Id: 7, Text: 'July'},
      {Id: 8, Text: 'August'},
      {Id: 9, Text: 'September'},
      {Id: 10, Text: 'October'},
      {Id: 11, Text: 'November'},
      {Id: 12, Text: 'December'},

    ]
   }


  ngOnInit(): void {
  
    
  }

  onMonthSelect(month: number){
    this.currentMonth = month;
    this.model= [this.pad(this.currentMonth), this.pad(this.currentYear)].join('/');
    this.showDate = false;
    this.onSelectedItem.emit(this.model);
  }

  onMonthChange(){
    if(this.validateMonth(this.model)){
      let date = this.model.split('/');
      this.currentMonth = Number.parseInt(date[0]);
      this.currentYear = Number.parseInt(date[1]);
    }
    else{
      this.model = '';
    }
    this.onSelectedItem.emit(this.model);
  }

  onPrevYearSelected(){
    this.currentYear = this.currentYear -1;
    this.model= [this.pad(this.currentMonth), this.pad(this.currentYear)].join('/');
    this.onSelectedItem.emit(this.model);
  }

  onNextYearSelected(){
    this.currentYear = this.currentYear +1;
    this.model= [this.pad(this.currentMonth), this.pad(this.currentYear)].join('/');
    this.onSelectedItem.emit(this.model);
  }

  getCustomClass(month: number){
    if(this.currentMonth == month){
      if(this.model != null && this.model != '' && this.model != undefined){
        return 'selected-btn active'
      }

      var curDate = new Date();
      if(this.currentYear == curDate.getFullYear())
        return 'active current-month-btn';
    }

    return '';

  }

  getCustomLabelClass(month: number){
    var curDate = new Date();
    var curCalendarMonth = curDate.getMonth() +1;
    if(month == curCalendarMonth && this.currentYear == curDate.getFullYear())
      return 'text-info';
      else 
      return '';
  }

  validateMonth(date: string): boolean{
    if(date){
      if(date != undefined && date.length != 0 && date.toString().match(this.pattern))
        return true;
    }
    return false;
  }


  handleKeyboardEvent(event: KeyboardEvent){
    if(event.keyCode == 37){ //left arrow
      this.currentMonth = this.currentMonth -1;
      if(this.currentMonth == 0){
        this.currentMonth = 12;
        this.currentYear = this.currentYear -1;
      }
    }
    else if(event.keyCode == 39){ //right arrow
      this.currentMonth = this.currentMonth +1;
      if(this.currentMonth == 13){
        this.currentMonth = 1;
        this.currentYear = this.currentYear + 1;
      }
    }
    else if(event.keyCode == 38){ //up arrow
      this.currentMonth = this.currentMonth -3;
      if(this.currentMonth < 1){
        this.currentMonth = 12 + this.currentMonth;
        this.currentYear = this.currentYear -1;
      }
    }
    else if(event.keyCode == 40){ //down arrow
      this.currentMonth = this.currentMonth + 3;
      if(this.currentMonth > 12){
        this.currentMonth = this.currentMonth - 12;
        this.currentYear = this.currentYear + 1;
      }
    }
    else if(event.keyCode == 13){ //enter
      this.model = [this.pad(this.currentMonth), this.pad(this.currentYear)].join('/');
      this.showDate = false;
      this.onSelectedItem.emit(this.model);
      }
    }
  

  closeDatePopupDiv(event: any){
    let _event = event?.target;
    let _in = false;
    do{
      if(_event == this._el.nativeElement){
        _in = true;
      }

      _event = _event.parentNode;
    }while(_event);

    if(!_in){
      this.showDate = false;
    }
  }

  pad(input: number){
    return (input<10) ? '0' + input :input;

  }
}


export interface Month{
  Id: number;
  Text: string;

}