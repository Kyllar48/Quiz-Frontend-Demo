import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AnswerModel } from 'src/app/shared-modules/models/answer.model';
import { QuestionModel } from 'src/app/shared-modules/models/question.model';
import { QuizModel } from 'src/app/shared-modules/models/quiz.model';
import { UserModel } from 'src/app/shared-modules/models/user.model';
import { UserQuizService } from 'src/app/shared-modules/user-quiz.service';

@Component({
  selector: 'app-quiz-editor',
  templateUrl: './quiz-editor.component.html',
  styleUrls: ['./quiz-editor.component.scss'],
})
export class QuizEditorComponent {
  public loggedUser: UserModel;
  public selectedQuiz: QuizModel;
  public editOn = false;
  public loaded = false;
  public questionForm: FormGroup;
  public validationErrors: {
    statementError?: boolean;
    answer1Error?: boolean;
    answer2Error?: boolean;
    answer3Error?: boolean;
    answer4Error?: boolean;
    correctAnswerError?: boolean;
  };
  public paramsSubscription: Subscription;

  constructor(
    private userQuizService: UserQuizService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loggedUser = this.userQuizService.getLoggedUser();

    this.questionForm = this.formBuilder.group({
      statement: '',
      answerCheck: '0',
      answerOne: '',
      answerTwo: '',
      answerThree: '',
      answerFour: '',
    });
    this.validationErrors = {};

    this.paramsSubscription = this.route.params.subscribe((params: any) => {
      this.userQuizService.getQuizById(+params['id']).subscribe({
        next: (res: QuizModel) => {
          this.selectedQuiz = res;
          this.loaded = true;
        },
      });
    });
  }

  public deleteQuestion(question: QuestionModel): void {
    this.userQuizService.deleteQuestion(question.id).subscribe({
      complete: () => {
        const index = this.selectedQuiz.questions.findIndex(
          (q) => q.id === question.id
        );
        if (index >= 0) {
          this.selectedQuiz.questions.splice(index, 1);
        }
      },
    });
  }

  public addQuestion(): void {
    if (this.validForm()) {
      const question = this.getQuestionValueFromForm();
      this.userQuizService
        .addQuestion(this.selectedQuiz.id, question.statement, question.answers)
        .subscribe({
          next: (addedQuestion: QuestionModel) => {
            this.selectedQuiz.questions.push(addedQuestion);
            this.resetForm();
          },
        });
    }
  }

  public validForm(): boolean {
    this.validationErrors = {
      statementError: !this.questionForm.controls.statement.value,
      answer1Error: !this.questionForm.controls.answerOne.value,
      answer2Error: !this.questionForm.controls.answerTwo.value,
      answer3Error: !this.questionForm.controls.answerThree.value,
      answer4Error: !this.questionForm.controls.answerFour.value,
      correctAnswerError: !['1', '2', '3', '4'].includes(
        this.questionForm.controls.answerCheck.value
      ),
    };
    return !Object.values(this.validationErrors).some((val) => val);
  }

  private getQuestionValueFromForm(): QuestionModel {
    return {
      statement: this.questionForm.controls.statement.value,
      answers: [
        {
          statement: this.questionForm.controls.answerOne.value,
          isCorrect: this.questionForm.controls.answerCheck.value === '1',
        },
        {
          statement: this.questionForm.controls.answerTwo.value,
          isCorrect: this.questionForm.controls.answerCheck.value === '2',
        },
        {
          statement: this.questionForm.controls.answerThree.value,
          isCorrect: this.questionForm.controls.answerCheck.value === '3',
        },
        {
          statement: this.questionForm.controls.answerFour.value,
          isCorrect: this.questionForm.controls.answerCheck.value === '4',
        },
      ] as AnswerModel[],
    } as QuestionModel;
  }

  public resetForm(): void {
    this.editOn = false;
    this.questionForm.reset({
      statement: '',
      answerCheck: '0',
      answerOne: '',
      answerTwo: '',
      answerThree: '',
      answerFour: '',
    });
  }
}
