// types/userTypes.ts
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

export interface UserState {
  users: User[];
  filteredUsers: User[];
  searchTerms: {
    name: string;
    username: string;
    email: string;
    phone: string;
  };
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}
