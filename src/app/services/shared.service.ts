import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../store/user.model';

@Injectable({ providedIn: 'root' })
export class NameService {
  private takenNamesSubject = new BehaviorSubject<string[]>([]);
  public takenNames$: Observable<string[]> = this.takenNamesSubject.asObservable();

  public updateTakenNamesFromUsers(users: User[]): void {
    const names = users.map(user => user.name);
    this.takenNamesSubject.next(names);
  }

  public updateTakenNames(names: string[]): void {
    this.takenNamesSubject.next(names);
  }
}