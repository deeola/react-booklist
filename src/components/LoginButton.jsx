import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div>
        <p>Loading</p>
      </div>
    );
  }

  return (
    !isAuthenticated && (
      <li className="p-1 focus:bg-booklistBlue-dark text-center sm:text-left">
        <button
          className="font-semibold"
          type="button"
          onClick={() => loginWithRedirect()}
        >
          Log In
        </button>
      </li>
    )
  );
};

export default LoginButton;
