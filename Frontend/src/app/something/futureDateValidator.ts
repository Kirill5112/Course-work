import { FormControl } from '@angular/forms';

export function futureDateValidator(control: FormControl): { [key: string]: boolean } | null {
  const date = new Date(control.value);
  const now = new Date();

  if (isNaN(date.getTime())) {
    return { 'invalidDate': true };
  }

  if (date <= now) {
    return { 'futureDate': true };
  }

  return null;
}
