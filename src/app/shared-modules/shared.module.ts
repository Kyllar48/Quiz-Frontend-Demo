import { LoggedUserGuard } from './logged-user.guard';
import { UserQuizService } from './user-quiz.service';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AdminUserGuard } from './admin-user.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OrderByDisplayOrderPipe } from './order-by-display-order.pipe';

@NgModule({
  providers: [UserQuizService, LoggedUserGuard, AdminUserGuard],
  imports: [
    HttpClientModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  exports: [
    HttpClientModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    OrderByDisplayOrderPipe,
  ],
  declarations: [OrderByDisplayOrderPipe],
})
export class SharedModule {}
