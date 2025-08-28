import React, { useState } from 'react';
import PasswordProtect from './PasswordProtect';
import AdminView from './AdminView';
import UserView from './UserView';

type Role = 'admin' | 'user' | null;

function App() {
  const [role, setRole] = useState<Role>(null);

  const handleAuthenticated = (authenticatedRole: 'admin' | 'user') => {
    setRole(authenticatedRole);
  };

  if (!role) {
    return <PasswordProtect onAuthenticated={handleAuthenticated} />;
  }

  return (
    <div>
      {role === 'admin' ? <AdminView /> : <UserView />}
    </div>
  );
}

export default App;
