import {NgModule} from '@angular/core';
import {NumbersOnlyDirective} from './numbers-only.directive';


const directives = [
  NumbersOnlyDirective,
];
@NgModule({
  declarations: directives,
  exports: directives,
})
export class DirectivesModule {}
