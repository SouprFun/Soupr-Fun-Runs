import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./Graph.css";

//MUI
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import GraphItem from './GraphItem';

function Graph() {
    const dispatch = useDispatch()
    const runs = useSelector((store) => store.run)
    console.log("in graph runs: ", runs);
    const [double, setDouble] = useState(true);
    let minutes = []

    for (let i = 0; i < runs.length; i++) {
        runs[i].index = i;
        }
    console.log("new runs: ", runs, minutes);

    useEffect(() => {
        dispatch({ type: 'FETCH_RUNS' });
    }, []);

    return (
        <div className='graphPage'>
            <h1>Your Runs Graphed</h1>
            <Button variant="contained" className='double Button' color="secondary" onClick={() => setDouble(!double)} >Second Graph</Button>
            <div>
                {double ? (
                    <Grid container spacing={0}>
                        <Grid item xs={12}>
                            <GraphItem runs={runs} double={double} num={1} />
                        </Grid>
                    </Grid>
                ) : (
                    <Grid container spacing={0}>
                        <Grid item xs={6}>
                            <GraphItem runs={runs} double={double} num={1} />
                        </Grid>
                        <Grid item xs={6}>
                            <GraphItem runs={runs} double={double} num={2} />
                        </Grid>
                    </Grid>
                )}
            </div>
        </div> // graph container
    )
}

export default Graph;