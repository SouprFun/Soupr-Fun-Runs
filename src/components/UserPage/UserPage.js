import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import useReduxStore from '../../hooks/useReduxStore';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const store = useReduxStore();
  return (
    <div className="container">
      <h1 id="welcome">Welcome, {store.user.username}!</h1>
      <p>Your ID is: {store.user.id}</p>
      <LogOutButton className="log-in" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
