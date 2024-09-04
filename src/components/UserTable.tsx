// components/UserTable.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store'; // Import types for dispatch and state
import { fetchUsers } from '../features/users/userSlice'; // Import the action to fetch users
import SearchInput from './SearchInput'; // Import the SearchInput component

const UserTable: React.FC = () => {
  // Get the dispatch function to send actions to the Redux store
  const dispatch = useDispatch<AppDispatch>();

  // Get user data, loading status, and any error from the Redux store
  const { filteredUsers, status, error } = useSelector((state: RootState) => state.users);

  // Use useEffect to fetch users when the component first loads
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div>
      {/* Render search input fields for filtering users */}
      <div>
        <SearchInput field="name" placeholder="Search by name" />
        <SearchInput field="username" placeholder="Search by username" />
        <SearchInput field="email" placeholder="Search by email" />
        <SearchInput field="phone" placeholder="Search by phone" />
      </div>
      
      {/* Show loading message if data is still being fetched */}
      {status === 'loading' && <p>Loading...</p>}
      
      {/* Show error message if there was a problem fetching the data */}
      {status === 'failed' && <p>Error: {error}</p>}
      
      {/* Render the table if data has been successfully fetched */}
      {status === 'idle' && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {/* Map over filtered users and display them in rows */}
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserTable; // Export the UserTable component to use it elsewhere
