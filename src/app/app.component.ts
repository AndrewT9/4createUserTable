import { Component } from '@angular/core';
import { UserListComponent } from "./users/user-list/user-list.component";

@Component({
  selector: 'app-root',
  imports: [UserListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
