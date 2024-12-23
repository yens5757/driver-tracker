import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ass3strsub',
  standalone: true
})
export class Ass3strsubPipe implements PipeTransform {

  transform(value: string): string {
    return value ? value.toUpperCase() : '';
  }

}
