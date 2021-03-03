import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';

import {RouterModule} from '@angular/router';
import {PointComponent} from './point/point.component';
import {AppRouting} from './app.routing';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MapComponent} from './map/map.component';
import {PointService} from './point/point.service';
import {ReactiveFormsModule} from '@angular/forms';
import { DropzoneComponent } from './dropzone/dropzone.component';
import {NgxDropzoneModule} from 'ngx-dropzone';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PointComponent,
    MapComponent,
    DropzoneComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    RouterModule,
    AppRouting,
    MatInputModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxDropzoneModule
  ],
  providers: [PointService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
