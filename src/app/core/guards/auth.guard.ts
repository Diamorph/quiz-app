import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {LocalStorageKey} from '../models/local-storage-key.model';
import {RedirectService} from '../services/redirect.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private _redirectService: RedirectService) {}

  public canActivate(): boolean {
    if (localStorage.getItem(LocalStorageKey.userId)) {
      return true;
    } else {
      this._redirectService.goToMainPage();
      return false;
    }
  }
}
