import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./Graph.css";
//victory charts
import {
    VictoryChart, VictoryAxis, VictoryTheme, VictoryVoronoiContainer,
    VictoryLine, VictoryContainer, VictoryScatter,
} from 'victory';

//MUI
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import GraphItem from './GraphItem';



function Graph() {
    const dispatch = useDispatch()
    const runs = useSelector((store) => store.run)
    console.log("in graph runs: ", runs);
    const [selectX, setSelectX] = useState('distance')
    const [selectY, setSelectY] = useState('time')
    const [double, setDouble] = useState(false);

    

    // function handleDouble() {
    //     setDouble(!double)
    // }

    // for (let i = 0; i < runs.length; i++) {
    //     runs[i].push({ index: i,})
    // }
    console.log("new runs: ", runs);

    useEffect(() => {
        dispatch({ type: 'FETCH_RUNS' });
    }, [])

    return (
        <div className='graphPage'>
            <h1>Graphs go here</h1>
            <Button variant="contained" color="success" onClick={() => setDouble(!double)} >Second Graph</Button>
            {double ? (
                <GraphItem runs={runs} selectX={selectX} selectY={selectY} />
            ):(
                <>
                <GraphItem runs={runs} selectX={selectX} selectY={selectY} />
                <GraphItem runs={runs} selectX={selectX} selectY={selectY} />
                </>
            )}
        </div> // graph container
    )
}

export default Graph;