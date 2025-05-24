import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { UserState } from './user.model';
import { USERS_DATA } from '../utils/column.data';

const initialState: UserState = {
  users: USERS_DATA,
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'users' })
export class UserStore extends Store<UserState> {
  constructor() {
    super(initialState);
  }
}
