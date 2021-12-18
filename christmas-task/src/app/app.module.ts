import { NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToysComponent } from '../app_pages/toys/toys.component';
import { FooterComponent } from '../app_views/footer/footer.component';
import { NavigationComponent } from '../app_views/navigation/navigation.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { StorageServiceComponent } from '../app_services/storage-service/storage-service.component';








@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavigationComponent,
    StorageServiceComponent,
    
    // ToysBoxComponent,
    // FavouriteComponent,
    // SortBarComponent,
    // FilterBarComponent,
    // FilterServiceComponent,
    // ToyCardsComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxSliderModule,
    RouterModule.forRoot([
      { path: 'toys', component: ToysComponent },
      // { path: '', component: ToysBoxComponent },
      // { path: '', component: FavouriteComponent },
      // { path: '', component: SortBarComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
