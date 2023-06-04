export class UserModel {
  public id: number;
  public username: string;
  public password: string;
  public isAdmin: boolean;

  constructor() {
    this.id = -1;
    this.username = '';
    this.password = '';
    this.isAdmin = false;
  }
}
