import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'aBase64'
})
export class ABase64Pipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
