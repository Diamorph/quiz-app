import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {DirectivesModule} from './directives/directives.module';

const commonModules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  DirectivesModule
];

@NgModule({
  imports: [...commonModules],
  exports: [...commonModules],
})
export class SharedModule {}
