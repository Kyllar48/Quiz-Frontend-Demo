import { AnswerModel } from './answer.model';

export class QuestionModel {
  public id: number;
  public statement: string;
  public answers: AnswerModel[];

  constructor() {
    this.id = -1;
    this.statement = '';
    this.answers = [];
  }
}
