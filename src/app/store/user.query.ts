import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { UserState } from './user.model';
import { UserStore } from './user.store';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class UserQuery extends Query<UserState> {
  public users$ = this.select((state) => state.users);

  public canAdd$ = this.select((state) => state.users).pipe(
    map((users) => users.every((u) => u.active) && users.length < 5)
  );

  constructor(store: UserStore) {
    super(store);
  }
}
