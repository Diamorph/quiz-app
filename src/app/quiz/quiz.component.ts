import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {interval, Subject, takeUntil, tap} from 'rxjs';
import {IQuiz, IQuizQuestion, QuizQuestionType} from '../core/models/quiz.model';
import {RedirectService} from '../core/services/redirect.service';
import {QuizService} from './services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit, OnDestroy {
  public quiz: IQuiz;
  public currentQuestionNumber: number = 0;
  public loading: boolean = true;
  public questionType: typeof QuizQuestionType = QuizQuestionType;
  public answerForm: FormGroup;
  public quizFinished: boolean = false;
  public quizTime: number = 1000 * 60 * 15; // 15 min
  public startTime: number;
  public timeLeft: number = this.quizTime;
  private _unsubscribe$: Subject<void> = new Subject<void>();
  constructor(
    private _quizService: QuizService,
    private _redirectService: RedirectService,
    private _route: ActivatedRoute
  ) { }

  get answerControlAsFormControl(): FormControl {
    return this.answerForm.get('answer') as FormControl;
  }

  get answerControlAsFormArray(): FormArray {
    return this.answerForm.get('answer') as FormArray;
  }

  get currentQuestion(): IQuizQuestion {
    return this.quiz.questions[this.currentQuestionNumber];
  }

  ngOnInit(): void {
    this._loadQuiz(this._route.snapshot.paramMap.get('id'));
  }

  private _loadQuiz(quizId: string): void {
    this._quizService.getQuiz(quizId).subscribe({
      next: (quiz) => {
        this.currentQuestionNumber = 0;
        this.quiz = quiz;
        this._createAnswerControlForNextQuestion();
        this.loading = false;
        this._timeSub();
      },
      error: err => {
        this.loading = false;
        if (err.status === 404) {
          console.log('Quiz not found', err);
          this._redirectService.goToMainPage();
          return;
        }
        console.log('Error while loading quiz', err);
      }
    });
  }

  public sendAnswer(): void {
    this.answerForm.markAsTouched();
    if (this.answerForm.invalid) {
      return;
    }
    this._quizService.sendAnswer(this.quiz.id, this.quiz.questions[this.currentQuestionNumber].id, this._getAnswer()).subscribe({
      next: value => {
        if (this.currentQuestionNumber + 1 === this.quiz.questions.length) {
          this.quizFinished = true;
          this._closeSubscriptions();
          return;
        }
        this.currentQuestionNumber++;
        this._createAnswerControlForNextQuestion();
      },
      error: err => {
        console.log('Error while sending answer!!!\n', err);
      }
    });
  }

  private _getAnswer(): any {
    const question: IQuizQuestion = this.currentQuestion;
    if (question.type === QuizQuestionType.multiChoice) {
      return this.answerControlAsFormArray.value
        .map((checked, i) => checked ? question.answers[i] : null)
        .filter(a => a !== null)
    } else {
      return this.answerControlAsFormControl.value;
    }
  }

  private _createAnswerControlForNextQuestion(): void {
    const question: IQuizQuestion = this.currentQuestion;
    if (question.type === QuizQuestionType.multiChoice) {
      this._createMultiAnswerForm(question.answers.length)
    } else {
      this._createAnswerForm();
    }
  }

  private _createAnswerForm(): void {
    this.answerForm = new FormGroup({
      answer: new FormControl('', [Validators.required])
    })
  }

  private _createMultiAnswerForm(optionsLength: number): void {
    this.answerForm = new FormGroup({
      answer: new FormArray([], [minSelectedCheckboxes(1)])
    });
    for (let i = 0; i < optionsLength; i++) {
      this.answerControlAsFormArray.push(new FormControl(false));
    }
  }

  public goToMainPage(): void {
    this._redirectService.goToMainPage();
  }

  private _timeSub(): void {
   interval(1000).pipe(
     tap(() => {
       if (!this.startTime) {
         this.startTime = new Date().getTime();
       }
     }),
     takeUntil(this._unsubscribe$)
   ).subscribe({
     next: () => {
       const timeFromStart: number = new Date().getTime() - this.startTime;
       this.timeLeft = this.quizTime - timeFromStart;
       if (this.timeLeft <= 0) {
         this._closeSubscriptions();
       }
     },
     error: err => {
       console.log('interval error occurred');
     },
     complete: () => {
       if (!this.quizFinished) {
         this.quizFinished = true;
         this.timeLeft = 0;
       }
     }
   });
  }

  ngOnDestroy() {
    this._closeSubscriptions();
  }

  private _closeSubscriptions(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}

function minSelectedCheckboxes(min = 1) {
  const validator: ValidatorFn = (formArray: FormArray) => {
    const totalSelected = formArray.controls
      .map(control => control.value)
      .reduce((prev, next) => next ? prev + next : prev, 0);
    return totalSelected >= min ? null : { required: true };
  };
  return validator;
}
