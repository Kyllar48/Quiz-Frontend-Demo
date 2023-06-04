import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { QuizModel } from 'src/app/shared-modules/models/quiz.model';
import { Observable, Subscription } from 'rxjs';
import { UserQuizService } from 'src/app/shared-modules/user-quiz.service';
import { UserModel } from 'src/app/shared-modules/models/user.model';
import { UserQuizSolutionModel } from 'src/app/shared-modules/models/user-quiz-solution.model';

@Component({
  selector: 'app-quiz-details',
  templateUrl: './quiz-details.component.html',
  styleUrls: ['./quiz-details.component.scss'],
})
export class QuizDetailsComponent implements OnInit {
  public loggedUser: UserModel;
  public selectedQuiz: QuizModel;
  public history$: Observable<UserQuizSolutionModel[]>;
  public paramsSubscription: Subscription;
  public loaded = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userQuizService: UserQuizService
  ) {}

  ngOnInit(): void {
    this.loggedUser = this.userQuizService.getLoggedUser();

    this.paramsSubscription = this.route.params.subscribe((params: any) => {
      this.userQuizService.getQuizById(+params['id']).subscribe({
        next: (res: QuizModel) => {
          this.selectedQuiz = res;
          this.history$ = this.userQuizService.getUserHistory(
            this.loggedUser.id,
            this.selectedQuiz.id
          );
          this.loaded = true;
        },
      });
    });
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

  navigateToQuizTrial(): void {
    this.router.navigate(['test'], {
      relativeTo: this.route,
      state: { questions: JSON.stringify(this.selectedQuiz.questions) },
    });
  }
}
