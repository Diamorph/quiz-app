import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {firstValueFrom} from 'rxjs';
import {LocalStorageKey} from '../core/models/local-storage-key.model';
import {IQuizListDTOItem} from '../core/models/quiz.model';
import {UserCreator} from '../core/models/user.model';
import {RedirectService} from '../core/services/redirect.service';
import {UserService} from '../core/services/user.service';
import {MainPageService} from './services/main-page.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  public quizForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    quizId: new FormControl('', [Validators.required])
  });
  public quizList: IQuizListDTOItem[] = [];
  public showQuizList: boolean = false;

  get username(): FormControl {
    return this.quizForm.get('username') as FormControl;
  }

  get quizId(): FormControl {
    return this.quizForm.get('quizId') as FormControl;
  }

  constructor(
    private _mainPageService: MainPageService,
    private _userService: UserService,
    private _redirectService: RedirectService
  ) { }

  ngOnInit(): void {
    const userId: string = localStorage.getItem(LocalStorageKey.userId);
    if (userId) {
      this._loadUser(userId);
    }
   this._loadQuizList();
  }

  private _loadQuizList(): void {
    this._mainPageService.getQuizList().subscribe({
      next: data => {
        this.quizList = data.quizList;
      },
      error: err => {
        console.log(`Can't load quiz list!\n Error Occurred:\n`, err);
      }
    });
  }

  public toggleQuizList(): void {
    if (!this.username.value) {
      return;
    }
    this.showQuizList = true;
  }

  public back(): void {
    this.showQuizList = false;
  }

  public async startQuiz(): Promise<void> {
    if (this.quizForm.invalid) {
      return;
    }
    if (!localStorage.getItem(LocalStorageKey.userId)) {
      await this._createUser();
    }
    this._redirectService.goToQuiz(this.quizId.value);
  }

  public chooseQuiz(quizId: string): void {
    this.quizId.patchValue((quizId === this.quizId.value) ? '' : quizId);
  }

  private async _createUser(): Promise<void> {
    return firstValueFrom(
      this._userService.createUser(UserCreator.createUser(this.username.value))
    )
      .then(user => localStorage.setItem('userId', user.id))
      .catch(err => console.log(`Error while creating user:\n`, err))
  }

  private _loadUser(userId: string): void {
    this._userService.getUserById(userId).subscribe({
      next: user => {
        this.username.patchValue(user.name);
        this.toggleQuizList();
      },
      error: err => {
        if (err.status === 404) {
          console.log('User Not Found\n', err);
          localStorage.removeItem(LocalStorageKey.userId);
          return;
        }
        console.log(`Error while loading user\n`, err);
      }
    })
  }
}
