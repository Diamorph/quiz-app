import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ApiUrlInterceptorService} from './core/interceptors/api-url-interceptor.service';
import {LayoutsModule} from './core/layout/layout.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LayoutsModule,
    AppRoutingModule
  ],
  providers: [
    ApiUrlInterceptorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiUrlInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
