import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'optionsFilter',
  standalone: true
})
export class PipePipe implements PipeTransform {

  transform(value: any): string[] {
    if (!value) {
      return [];
    }

    const { option1, option2, option3, option4 } = value;
    const result = [option1, option2, option3, option4];

    // Log the result to the console
    console.log('Filtered options:', result);

    return result;
  }
}


