import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useReduxStore from '../../hooks/useReduxStore';

function SecretsPage() {
  const dispatch = useDispatch();
  const store = useReduxStore();

  useEffect(() => {
    dispatch({ type: 'FETCH_SECRETS' });
  }, [dispatch]);

  return (
    <div className="container">
      <h2>Submarine Secrets</h2>
      <p>
        Currently logged in as <b>{store.user.username}</b>
      </p>
      <p>
        Clearance level: <b>{store.user.clearance_level}</b>
      </p>
      <ul>
        {store.secrets.map((secret) => (
          <li>
            Clearance: {secret.secrecy_level} | Content: {secret.content}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SecretsPage;
