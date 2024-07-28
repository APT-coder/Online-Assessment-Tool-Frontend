import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeformat',
  standalone: true
})
  export class TimeFormatPipe implements PipeTransform {
    transform(value: string): string {
      if (!value) return '';
      const timeParts = value.split(':');
      return `${parseInt(timeParts[0], 10)}:${timeParts[1]}`;
    }

}
