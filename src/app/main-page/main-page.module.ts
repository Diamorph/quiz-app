import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {MainPageComponent} from './main-page.component';
import {MainPageRoutingModule} from './main-page.routing';
import {MainPageService} from './services/main-page.service';

@NgModule({
  declarations: [MainPageComponent],
  imports: [
    MainPageRoutingModule,
    SharedModule,
  ],
  providers: [MainPageService]
})
export class MainPageModule { }
