export class UserFormModel {
  public username: string;
  public password: string;
  public confirmPassword: string;
  constructor() {
    this.username = '';
    this.password = '';
    this.confirmPassword = '';
  }
}
