// features/users/userSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { User, UserState } from '../../types/userTypes';

const initialState: UserState = {
  users: [],
  filteredUsers: [],
  searchTerms: {
    name: '',
    username: '',
    email: '',
    phone: '',
  },
  status: 'idle',
  error: null,
};

// Thunk to fetch users from the API
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!response.ok) throw new Error('Failed to fetch users');
  return response.json() as Promise<User[]>;
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<{ field: keyof UserState['searchTerms']; value: string }>) => {
      const { field, value } = action.payload;
      state.searchTerms[field] = value;

      // Filtering users based on the search terms
      state.filteredUsers = state.users.filter(user =>
        Object.keys(state.searchTerms).every(key => {
          const searchTerm = state.searchTerms[key as keyof UserState['searchTerms']];
          const userValue = user[key as keyof User];
          return typeof userValue === 'string' && userValue.toLowerCase().includes(searchTerm.toLowerCase());
        })
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.status = 'idle';
        state.users = action.payload;
        state.filteredUsers = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch users';
      });
  },
});

export const { setFilter } = userSlice.actions;
export default userSlice.reducer;
