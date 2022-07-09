import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <h2>{heading}</h2>

      <div className="grid">
        <div className="grid-col grid-col_8">
          
          <h3>Directions</h3>
          <ul>
            <li>Register an account</li>
            <li> Login </li>
            <li> Click "New Run" at the top left </li>
            <li> Input run distance in miles, run time in seconds, category and notes are optional.</li>
            <li> Date/time will choose the current date/time if you don't select your own.</li>
            <li> Click the "My Runs" link at the top to see your runs in a table.</li>
            <li> Click "Graphs" link at the top to see the runs graphed and select what criteria you want graphed.</li>
            <li> Have fun! :)</li>
          </ul>
        </div>
        <div className="grid-col grid-col_4">
          <RegisterForm />
          <p></p>
          <center>
            <h4>Already a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
