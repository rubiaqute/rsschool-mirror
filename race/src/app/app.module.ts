import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CarCustomizationComponent } from '../views/car-customization/car-customization.component';
import { FormsModule } from '@angular/forms';
import { WinnersComponent } from '../views/winners/winners.component';

@NgModule({
  declarations: [
    AppComponent,
    CarCustomizationComponent,
    WinnersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
