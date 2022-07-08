import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './UserPage.css';
import { textAlign } from '@mui/system';


function UserPage() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({ type: 'FETCH_RUNS' });
  }, []);

  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const runs = useSelector((store) => store.run);
  console.log("runs are: ", runs);

  let totalDist = 0
  let totalTime = 0
  let avgPace = 0

  for (let run of runs) {
    totalDist += run.distance;
    totalTime += run.time;
  }

  avgPace = totalTime / totalDist;

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <div>
        <LogOutButton className="btn" />
      </div>
      <div className='cards'>
        <Card variant="outlined" className='card' sx={{ width: 200 }}>
          <CardContent>
            <Typography gutterBottom>
              Total Miles Ran
            </Typography>
            <Typography>
              {totalDist} miles
            </Typography>
          </CardContent>
        </Card>
        <Card variant="outlined" className='card' sx={{ width: 200 }}>
          <CardContent>
            <Typography gutterBottom>
              Total Time Ran
            </Typography>
            <Typography>
              {(totalTime / 60).toFixed(2)} minutes
            </Typography>
          </CardContent>
        </Card>
        <Card variant="outlined" className='card' sx={{ width: 200 }}>
          <CardContent>
            <Typography gutterBottom>
              Avrage Pace
            </Typography>
            <Typography>
              {(avgPace / 60).toFixed(2)} minutes per mile.
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
