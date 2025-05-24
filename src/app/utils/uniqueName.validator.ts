import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, timer, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { NameService } from '../services/shared.service';


export function uniqueNameValidator(
  nameService: NameService
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return timer(500).pipe(
      switchMap(() => {
        const name = control.value?.trim();
        if (!name) {
          return of(null);
        }
        return nameService.takenNames$.pipe(
          take(1),
          switchMap(takenNames => {
            const isTaken = takenNames.includes(name);
            return of(isTaken ? { notUnique: true } : null);
          })
        );
      })
    );
  };
}
