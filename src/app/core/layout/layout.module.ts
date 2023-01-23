import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {WrapperComponent} from './wrapper/wrapper.component';

const components = [
  WrapperComponent,
]

@NgModule({
  imports: [SharedModule],
  declarations: [...components],
  exports: [...components]
})
export class LayoutsModule {}
