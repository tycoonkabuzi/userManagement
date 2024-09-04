// App.tsx
import React from 'react';
import UserTable from './components/UserTable';

const App: React.FC = () => {
  return (
    <div>
      <h1>User Management</h1>
      <p>Task for Smart: JUNIOR FRONTEND DEVELOPER ASSIGNMENT</p>
      <UserTable />
    </div>
  );
};

export default App;
