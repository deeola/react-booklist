import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
  const { logout, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <li className="p-1 focus:bg-booklistBlue-dark text-center sm:text-left">
        <button
          className="font-semibold"
          type="button"
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          Log Out
        </button>
      </li>
    )
  );
};

export default LogoutButton;
