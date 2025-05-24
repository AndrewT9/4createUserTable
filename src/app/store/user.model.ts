export interface User {
  id: number;
  name: string;
  active: boolean;
}

export interface UserState {
  users: User[];
}