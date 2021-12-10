import { NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { ToysBoxComponent } from './toys-box/toys-box.component';


@NgModule({
  declarations: [
    AppComponent,
    ToysBoxComponent,
    FavouriteComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: ToysBoxComponent },
      { path: '', component: FavouriteComponent },
    ])
  ],
  providers: [
    ToysBoxComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
