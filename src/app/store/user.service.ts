import { DestroyRef, inject, Injectable } from '@angular/core';
import { UserStore } from './user.store';
import { NameService } from '../services/shared.service';
import { User } from './user.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly destroyRef = inject(DestroyRef);

  constructor(private userStore: UserStore, private nameService: NameService) {
    this.userStore
      ._select((state) => state.users)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((users) => {
        this.nameService.updateTakenNamesFromUsers(users);
      });
  }

  public toggleActive(id: number): void {
    this.userStore.update((state) => ({
      users: state.users.map((u) =>
        u.id === id ? { ...u, active: !u.active } : u
      ),
    }));
  }

  public addUser(name: string): void {
    this.userStore.update((state) => {
      const newUser: User = {
        id: Math.max(...state.users.map((u) => u.id)) + 1,
        name,
        active: false,
      };
      return {
        users: [...state.users, newUser],
      };
    });
  }
}
