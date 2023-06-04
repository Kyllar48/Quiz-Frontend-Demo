import { Injectable } from '@angular/core';
import { UserQuizService } from './user-quiz.service';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable()
export class LoggedUserGuard implements CanActivate {
  constructor(private userQuizService: UserQuizService) {}

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return !!this.userQuizService.getLoggedUser();
  }
}
