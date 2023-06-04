import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user-modules/login/login.component';
import { SignupComponent } from './user-modules/signup/signup.component';
import { AdminComponent } from './user-modules/admin/admin.component';
import { LoggedUserGuard } from './shared-modules/logged-user.guard';
import { AdminUserGuard } from './shared-modules/admin-user.guard';
import { QuizViewerComponent } from './general-modules/quiz-viewer/quiz-viewer.component';
import { QuizEditorComponent } from './general-modules/quiz-editor/quiz-editor.component';
import { QuizDetailsComponent } from './general-modules/quiz-details/quiz-details.component';
import { QuizTrialComponent } from './general-modules/quiz-trial/quiz-trial.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'grant-admin',
    component: AdminComponent,
    canActivate: [LoggedUserGuard, AdminUserGuard],
  },
  {
    path: 'dashboard',
    component: QuizViewerComponent,
    canActivate: [LoggedUserGuard],
  },
  {
    path: 'dashboard/:id',
    component: QuizDetailsComponent,
    canActivate: [LoggedUserGuard],
  },
  {
    path: 'dashboard/:id/test',
    component: QuizTrialComponent,
    canActivate: [LoggedUserGuard],
  },
  {
    path: 'editor/:id',
    component: QuizEditorComponent,
    canActivate: [LoggedUserGuard, AdminUserGuard],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
