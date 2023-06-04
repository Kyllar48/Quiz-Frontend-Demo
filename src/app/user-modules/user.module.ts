import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AdminComponent } from './admin/admin.component';
import { UserFormComponent } from './user-form/user-form.component';
import { SharedModule } from '../shared-modules/shared.module';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    AdminComponent,
    UserFormComponent,
  ],
  exports: [LoginComponent, SignupComponent],
  imports: [SharedModule],
})
export class UserModule {}
