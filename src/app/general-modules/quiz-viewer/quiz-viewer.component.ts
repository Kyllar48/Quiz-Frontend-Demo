import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { QuizModel } from 'src/app/shared-modules/models/quiz.model';
import { UserModel } from 'src/app/shared-modules/models/user.model';
import { UserQuizService } from 'src/app/shared-modules/user-quiz.service';

@Component({
  selector: 'app-quiz-viewer',
  templateUrl: './quiz-viewer.component.html',
  styleUrls: ['./quiz-viewer.component.scss'],
})
export class QuizViewerComponent implements OnInit {
  public loggedUser: UserModel;
  public quizzes$: Observable<QuizModel[]>;
  constructor(
    private userQuizService: UserQuizService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.loggedUser = this.userQuizService.getLoggedUser();
    this.quizzes$ = this.userQuizService.getQuizes();
  }

  public navigateToQuiz(quiz: QuizModel, isEditorPage: boolean): void {
    if (isEditorPage) {
      this.router.navigate([`/editor/${quiz.id}`]);
    } else {
      this.router.navigate([quiz.id], {
        relativeTo: this.route,
      });
    }
  }

  public logout(): void {
    this.loggedUser = null;
  }
}
