import { NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { ToysBoxComponent } from './toys-box/toys-box.component';
import { SortBarComponent } from './sort-bar/sort-bar.component';
import { FilterBarComponent } from './filter-bar/filter-bar.component';
import { FilterServiceComponent } from './filter-service/filter-service.component';
import { ToyCardsComponent } from './toy-cards/toy-cards.component';


@NgModule({
  declarations: [
    AppComponent,
    ToysBoxComponent,
    FavouriteComponent,
    SortBarComponent,
    FilterBarComponent,
    FilterServiceComponent,
    ToyCardsComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: ToysBoxComponent },
      { path: '', component: FavouriteComponent },
      { path: '', component: SortBarComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
