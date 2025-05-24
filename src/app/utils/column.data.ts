import { User } from '../store/user.model';

export const COLUMNS_TITLE: Array<{ key: keyof User; label: string }> = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'active', label: 'Active' },
];

export const USERS_DATA = [
  { id: 1, name: 'Alice', active: true },
  { id: 2, name: 'Bob', active: false },
  { id: 3, name: 'Carol', active: true },
];
