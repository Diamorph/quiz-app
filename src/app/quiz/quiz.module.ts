import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {QuizComponent} from './quiz.component';
import {QuizRoutingModule} from './quiz.routing';
import {QuizService} from './services/quiz.service';

@NgModule({
  declarations: [QuizComponent],
  imports: [
    QuizRoutingModule,
    SharedModule,
  ],
  providers: [QuizService]
})
export class QuizModule { }
