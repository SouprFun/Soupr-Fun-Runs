import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./Graph.css";

//MUI
import Button from '@mui/material/Button';
import GraphItem from './GraphItem';



function Graph() {
    const dispatch = useDispatch()
    const runs = useSelector((store) => store.run)
    console.log("in graph runs: ", runs);
    const [double, setDouble] = useState(false);

    

    // function handleDouble() {
    //     setDouble(!double)
    // }

    for (let i = 0; i < runs.length; i++) {
        runs[i].index=i;
    }
    console.log("new runs: ", runs);

    useEffect(() => {
        dispatch({ type: 'FETCH_RUNS' });
    }, [])

    return (
        <div className='graphPage'>
            <h1>Graphs go here</h1>
            <Button variant="contained" color="success" onClick={() => setDouble(!double)} >Second Graph</Button>
            <div>
            {double ? (
                <GraphItem runs={runs} />
            ):(
                <div>
                <GraphItem runs={runs} />
                <GraphItem runs={runs} />
                </div>
            )}
            </div>
        </div> // graph container
    )
}

export default Graph;