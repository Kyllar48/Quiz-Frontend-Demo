import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { UserQuizService } from './user-quiz.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AdminUserGuard implements CanActivate {
  constructor(private userQuizService: UserQuizService) {}

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.userQuizService.getLoggedUser()?.isAdmin;
  }
}
