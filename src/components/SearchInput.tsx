// components/SearchInput.tsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { setFilter } from '../features/users/userSlice';
import { UserState } from '../types/userTypes';

interface SearchInputProps {
  field: keyof UserState['searchTerms'];
  placeholder: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ field, placeholder }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilter({ field, value: e.target.value }));
  };

  return <input type="text" onChange={handleChange} placeholder={placeholder} />;
};

export default SearchInput;
