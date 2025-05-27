import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserAddComponent } from '../user-add/user-add.component';
import { Observable } from 'rxjs';
import { UserQuery } from '../../../store/user.query';
import { UserService } from '../../../store/user.service';
import { User } from '../../../store/user.model';
import { COLUMNS_TITLE } from '../../../utils/column.data';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UserAddComponent],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  providers: [UserQuery],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  public users$: Observable<User[]>;
  public canAdd$: Observable<boolean>;

  public columns: { key: keyof User; label: string }[] = COLUMNS_TITLE;
  public showAddModal = false;

  constructor(private userQuery: UserQuery, private userService: UserService) {
    this.users$ = this.userQuery.users$;
    this.canAdd$ = this.userQuery.canAdd$;
  }

  public trackById(_: number, user: User): number {
    return user.id;
  }

  public toggleActive(id: number): void {
    this.userService.toggleActive(id);
  }

  public openAddModal(): void {
    this.showAddModal = true;
  }

  public onUserCreated(name: string): void {
    this.userService.addUser(name);
    this.showAddModal = false;
  }

  public closeModal(): void {
    this.showAddModal = false;
  }
}
