import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserFormModel } from 'src/app/shared-modules/models/user-form.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent {
  @Input() public isLoginForm: boolean;
  @Input() public signLogErrors: {
    userNotFound: boolean;
    passwordNotMatching: boolean;
  };
  @Output() public formSubmitted = new EventEmitter<UserFormModel>();
  public userForm: FormGroup;

  constructor(private formBuiler: FormBuilder) {}
  ngOnInit(): void {
    this.userForm = this.formBuiler.group({
      username: '',
      password: '',
      passwordConfirm: '',
    });
  }

  public formClicked(): void {
    this.formSubmitted.emit({
      username: this.userForm.controls.username.value,
      password: this.userForm.controls.password.value,
      confirmPassword: this.userForm.controls.passwordConfirm.value,
    } as UserFormModel);
  }
}
