import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserFormModel } from 'src/app/shared-modules/models/user-form.model';
import { UserModel } from 'src/app/shared-modules/models/user.model';
import { UserQuizService } from 'src/app/shared-modules/user-quiz.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public loginErrors = {
    userNotFound: false,
    passwordNotMatching: false,
  };

  constructor(
    private userQuizService: UserQuizService,
    private router: Router
  ) {}
  onLogin(credentials: UserFormModel) {
    this.userQuizService
      .loginUser(credentials.username, credentials.password)
      .subscribe({
        next: (res: UserModel) => {
          if (res?.id > 0) {
            this.userQuizService.setLoggedUser(res);
            this.router.navigate(['/dashboard']);
          } else {
            this.loginErrors.userNotFound = true;
          }
        },
        error: (err: any) => {
          this.loginErrors.userNotFound = true;
        },
      });
  }
}
