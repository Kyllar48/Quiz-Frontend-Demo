export class UserQuizSolutionModel {
  public id: number;
  public userId: number;
  public quizId: number;
  public score: number;
  public total: number;
  constructor() {
    this.id = -1;
    this.userId = -1;
    this.quizId = -1;
    this.score = -1;
    this.total = 0;
  }
}
