// components/SearchInput.tsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store'; // Importing AppDispatch type to use dispatch
import { setFilter } from '../features/users/userSlice'; // Importing the action to set filters
import { UserState } from '../types/userTypes'; // Importing types for user state

// Define the props that SearchInput component will receive
interface SearchInputProps {
  field: keyof UserState['searchTerms']; // The field in the user state to filter (like name, email)
  placeholder: string; // Placeholder text for the input field
}

// Functional component for the search input field
const SearchInput: React.FC<SearchInputProps> = ({ field, placeholder }) => {
  // Getting the dispatch function to send actions to the Redux store
  const dispatch = useDispatch<AppDispatch>();

  // Function to handle changes in the input field
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Dispatch an action to update the filter state in Redux
    dispatch(setFilter({ field, value: e.target.value }));
  };

  // Render the input field with an onChange event handler
  return <input type="text" onChange={handleChange} placeholder={placeholder} />;
};

export default SearchInput; // Export the component to use it elsewhere in the app
