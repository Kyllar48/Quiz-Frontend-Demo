import { UserQuizSolutionModel } from './../../shared-modules/models/user-quiz-solution.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Subscribable, Subscription, filter } from 'rxjs';
import { QuestionModel } from 'src/app/shared-modules/models/question.model';
import { QuizModel } from 'src/app/shared-modules/models/quiz.model';
import { UserModel } from 'src/app/shared-modules/models/user.model';
import { UserQuizService } from 'src/app/shared-modules/user-quiz.service';

@Component({
  selector: 'app-quiz-trial',
  templateUrl: './quiz-trial.component.html',
  styleUrls: ['./quiz-trial.component.scss'],
})
export class QuizTrialComponent implements OnInit {
  public loggedUser: UserModel;
  public selectedQuiz: QuizModel;
  public questions: QuestionModel[];
  public questionAnswer: boolean[];
  private paramsSubscription: Subscription;
  public submitted = false;
  public solution = {
    score: 0,
    total: -1,
  };
  public loaded = false;

  constructor(
    private route: ActivatedRoute,
    private userQuizService: UserQuizService
  ) {}

  ngOnInit(): void {
    this.loggedUser = this.userQuizService.getLoggedUser();

    this.paramsSubscription = this.route.params.subscribe((params: any) => {
      this.userQuizService.getQuizById(+params['id']).subscribe({
        next: (res: QuizModel) => {
          this.selectedQuiz = res;
          this.questions = this.selectedQuiz.questions;
          this.questionAnswer = new Array(this.questions.length).fill(null);
          this.loaded = true;
        },
      });
    });
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

  public onSubmitForm(): void {
    if (this.questionAnswer.every((qa) => qa !== null)) {
      this.solution.score = this.questionAnswer.filter((qa) => qa).length;
      this.solution.total = this.questionAnswer.length;
      this.userQuizService
        .addSolution({
          id: 0,
          userId: this.loggedUser.id,
          quizId: this.selectedQuiz.id,
          score: this.solution.score,
          total: this.solution.total,
        } as UserQuizSolutionModel)
        .subscribe({
          complete: () => {
            this.submitted = true;
          },
        });
    }
  }

  public onSelectAnswer(index: number, value: boolean): void {
    this.questionAnswer[index] = value;
  }
}
