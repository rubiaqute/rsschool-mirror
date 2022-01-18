import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import AppComponent from './app.component';
import CarCustomizationComponent from '../views/car-customization/car-customization.component';
import WinnersComponent from '../views/winners/winners.component';
import CarComponent from '../views/car/car.component';
import FlagComponent from '../views/flag/flag.component';
import MaterialModule from './material/material.module';
import RaceRoadsComponent from '../views/race-roads/race-roads.component';

@NgModule({
  declarations: [
    AppComponent,
    CarCustomizationComponent,
    WinnersComponent,
    CarComponent,
    FlagComponent,
    RaceRoadsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export default class AppModule { }
