import { UserQuizService } from './../../shared-modules/user-quiz.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserFormModel } from 'src/app/shared-modules/models/user-form.model';
import { UserModel } from 'src/app/shared-modules/models/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  public signUpErrors = {
    userNotFound: false,
    passwordNotMatching: false,
  };

  constructor(
    private userQuizService: UserQuizService,
    private router: Router
  ) {}
  public onSignUp(user: UserFormModel): void {
    if (user.password !== user.confirmPassword) {
      this.signUpErrors.passwordNotMatching = true;
    } else {
      this.userQuizService
        .signUpUser(user.username, user.password)
        .subscribe((user: UserModel) => {
          this.userQuizService.setLoggedUser(user);
          this.router.navigate(['/dashboard']);
        });
    }
  }
}
