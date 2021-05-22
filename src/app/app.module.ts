import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{ FormsModule } from '@angular/forms';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faChevronLeft, faChevronRight, fas, faUser} from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt, far } from '@fortawesome/free-regular-svg-icons';

import { AppComponent } from './app.component';
import { MonthPickerComponent } from './month-picker/month-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    MonthPickerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
    library.addIcons(faUser, faCalendarAlt, faChevronLeft, faChevronRight);
}
 }
