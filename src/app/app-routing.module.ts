import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './core/guards/auth.guard';
import {WrapperComponent} from './core/layout/wrapper/wrapper.component';
import {RoutesUrls} from './core/models/router-url.model';

const routes: Routes = [
  {
    path: '', component: WrapperComponent, children: [
      {path: '', pathMatch: 'full', loadChildren: () => import('./main-page/main-page.module').then(m => m.MainPageModule)},
      {path: RoutesUrls.quiz, canActivate: [AuthGuard], loadChildren: () => import('./quiz/quiz.module').then(m => m.QuizModule)}
    ]
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
