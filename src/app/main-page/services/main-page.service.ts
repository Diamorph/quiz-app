import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of, switchMap, take} from 'rxjs';
import {api} from '../../../environments/api';
import {IQuiz, IQuizListDTO} from '../../core/models/quiz.model';

@Injectable()
export class MainPageService {

  constructor(
    private _http: HttpClient
  ) {}

  public getQuizList(): Observable<IQuizListDTO> {
    return this._http.get<IQuiz[]>(api.getQuizzes).pipe(
      switchMap(ql => {
        return of({
          quizList: ql.map(q => ({id: q.id, name: q.name}))
        })
      }),
      take(1)
    )
  }
}
