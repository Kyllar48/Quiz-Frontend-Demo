import { QuestionModel } from './question.model';

export class QuizModel {
  public id: number;
  public title: string;
  public theory: string;
  public questions: QuestionModel[];

  constructor() {
    this.id = -1;
    this.title = '';
    this.theory = '';
    this.questions = [];
  }
}
