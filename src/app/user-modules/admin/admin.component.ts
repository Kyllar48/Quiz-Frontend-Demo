import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/shared-modules/models/user.model';
import { UserQuizService } from 'src/app/shared-modules/user-quiz.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  public loggedUser: UserModel;
  public nonAdminUsers$: Observable<UserModel[]>;

  constructor(private userQuizService: UserQuizService) {}
  ngOnInit(): void {
    this.loggedUser = this.userQuizService.getLoggedUser();
    this.nonAdminUsers$ = this.userQuizService.getNonAdminUsers();
  }

  public upgradeUserRole(userId: number): void {
    this.userQuizService.grantAdmin(userId).subscribe({
      complete: () => {
        this.nonAdminUsers$ = this.userQuizService.getNonAdminUsers();
      },
    });
  }
}
