import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'month-picker';
  disabled = true;
  model1: string = '';
  model2: string = '';
  model3: string = '05/2020'
}
