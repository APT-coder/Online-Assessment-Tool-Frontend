import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'utcToIst',
  standalone: true
})
export class UtcToIstPipe implements PipeTransform {

  transform(value: string | Date): string {
    const utcDate = new Date(value);
    const istDate = new Date(utcDate.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    return istDate.toLocaleString();
  }

}
