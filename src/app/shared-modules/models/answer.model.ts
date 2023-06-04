export class AnswerModel {
  public id: number;
  public statement: string;
  public displayOrder: number;
  public isCorrect: boolean;

  constructor() {
    this.id = -1;
    this.statement = '';
    this.displayOrder = 0;
    this.isCorrect = false;
  }
}
