import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of, take} from 'rxjs';
import {api} from '../../../environments/api';
import {IQuiz} from '../../core/models/quiz.model';

@Injectable()
export class QuizService {
  constructor(
    private _http: HttpClient
  ) {}

  public getQuiz(id: string): Observable<IQuiz> {
    return this._http.get<IQuiz>(api.getQuiz.replace('{id}', id)).pipe(
      take(1)
    );
  }

  public sendAnswer(quizId: string, questionId: string, answer: any): Observable<boolean> {
    console.log('Sending answer\n', {
      quizId,
      questionId,
      answer
    });
    return of(true);
  }
}
