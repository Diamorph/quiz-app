import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {RoutesUrls} from '../models/router-url.model';

@Injectable({ providedIn: 'root' })
export class RedirectService {

  constructor(
    private _router: Router
  ) {}

  public goToQuiz(id: string): void {
    this._router.navigate(['/', RoutesUrls.quiz, id]);
  }

  public goToMainPage(): void {
    this._router.navigate(['/']);
  }
}
