import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import useReduxStore from '../../hooks/useReduxStore';

function Nav() {
  const store = useReduxStore();

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (store.user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'Home';
  }

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">Secure Submarine</h2>
      </Link>
      <div className="nav-right">
        <Link className="nav-link" to={loginLinkData.path}>
          {loginLinkData.text}
        </Link>

        {store.user.id && (
          <>
            <Link className="nav-link" to="/secrets">
              Secrets Page
            </Link>
            <LogOutButton className="nav-link" />
          </>
        )}

        <Link className="nav-link" to="/about">
          About
        </Link>
      </div>
    </div>
  );
}

export default Nav;
