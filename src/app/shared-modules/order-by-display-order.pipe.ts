import { Pipe, PipeTransform } from '@angular/core';
import { AnswerModel } from './models/answer.model';

@Pipe({
  name: 'orderBy',
})
export class OrderByDisplayOrderPipe implements PipeTransform {
  transform(
    value: AnswerModel[],
    order: 'asc' | 'desc' = 'asc'
  ): AnswerModel[] {
    return value.sort((a, b) => {
      if (order === 'asc') {
        return a.displayOrder - b.displayOrder;
      } else if (order === 'desc') {
        return b.displayOrder - a.displayOrder;
      }
      return 0;
    });
  }
}
