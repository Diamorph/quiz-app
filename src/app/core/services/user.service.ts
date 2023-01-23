import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, take} from 'rxjs';
import {api} from '../../../environments/api';
import {IUser} from '../models/user.model';

@Injectable({providedIn: 'root'})
export class UserService {

  constructor(
    private _http: HttpClient
  ) {}

  public getUsers(): Observable<any> {
    return this._http.get(api.getUsers).pipe(
      take(1)
    )
  }

  public createUser(user: IUser): Observable<IUser> {
    return this._http.post<IUser>(api.postUsers, user).pipe(
      take(1)
    );
  }

  public getUserById(id: string): Observable<IUser> {
    return this._http.get<IUser>(api.getUser.replace('{id}', id)).pipe(
      take(1)
    );
  }
}
