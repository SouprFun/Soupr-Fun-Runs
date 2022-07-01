import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./Graph.css";
//victory charts
import {
    VictoryChart, VictoryAxis, VictoryTheme,
    VictoryVoronoiContainer, VictoryLine,
} from 'victory';

//MUI
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import { blue } from '@mui/material/colors';

function GraphItem({ runs, double, num }) {
    const [selectX, setSelectX] = useState('distance')
    const [selectY, setSelectY] = useState('time')
    let color = "";
    let size = 6;
    let offset = 0;

    //let range = {x:[], y:[]};
    
    
    //handles selectorbox for the y-axis
    const handleYAxis = (event) => {
        setSelectY(event.target.value);
        console.log("y-axis is: ", selectY);
    };

    //handles selectorbox for the X-axis
    const handleXAxis = (event) => {
        setSelectX(event.target.value);
        console.log("x-axis is: ", selectX);
    };

    
    if (!double) { //if table is doubled
        size = 800
        offset = 2

    }else {
        size = 1600
        offset = 0
    }

    if (num === 1) {
        color = "#FF0073"
    } else {
        color = "#73FF00"
    }
    /*
    if(selectX === 'index'){
            range.x = [0, runs.length -1];
    }else if (selectX === 'distance'){
        for (let run of runs){
            if (holder < run.distance){
                holder = run.distance;

            }
        }
        range.x = [0, holder];
    }

    if (selectY === 'distance'){
        for (let run of runs){
            if (holder < run.distance){
                holder = run.distance;
            }
        }
        range.y = [0, holder];

    }else if (selectY === 'time'){
        for (let run of runs){
            if (holder < run.time){
                holder = run.time;
            }
        }
        range.y = [0, (holder/60).toFixed(0)];

    }else if (selectY === 'time'){
        for (let run of runs){
            if (holder < run.pace){
                holder = run.pace;
            }
        }
        range.y = [0, (holder/60).toFixed(0)]
    }
    */
    return (
        <div className='graph'>
            <div>
                <FormControl sx={{ marginLeft: 10 }}>
                    <InputLabel sx={{color: 'warning'}} id="">Y-Axis</InputLabel>
                    <Select
                        color='warning'
                        value={selectY}
                        label="Y-Axis"
                        onChange={handleYAxis}
                        sx={{border: 'black'}}
                    >
                        <MenuItem value={'distance'}>Distance</MenuItem>
                        <MenuItem value={'time'}>Time</MenuItem>
                        <MenuItem value={'pace'}>Pace</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ marginLeft: 10 }}>
                    <InputLabel sx={{color: 'purple'}} id="">X-Axis</InputLabel >
                    <Select
                    color='warning'
                        value={selectX}
                        label="X-Axis"
                        onChange={handleXAxis}
                    >
                        <MenuItem value={'index'}>Run #</MenuItem>
                        <MenuItem value={'distance'}>Distance</MenuItem>
                        <MenuItem value={'date'}>Date</MenuItem>
                    </Select>
                </FormControl>

            </div>
            {/* <Grid container spacing={0}> */}
                {/* <Grid item s={12} md={8} lg={6} xl={6}> */}
                    <VictoryChart
                        height={800}
                        width={size}
                        domainPadding={20}
                        padding={{ left: 90, top: 50, right: 10, bottom: 50 }}
                        minDomain={{ y: 0 }}
                        theme={VictoryTheme.material}
                        containerComponent={
                            <VictoryVoronoiContainer
                                voronoiDimension="x"
                                labels={({ datum }) => (`
                            Run #: ${datum.index} 
                            dist: ${datum.distance} 
                            Time: ${(datum.time/60).toFixed(2)} 
                            pace: ${(datum.pace/60).toFixed(2)}
                            `)}
                            />
                        }
                    >
                        <VictoryAxis
                            label={selectX}
                            style={{
                                axisLabel: { padding: 30, fontSize: 20 },
                                color: 'black'
                            }}
                        />
                        <VictoryAxis
                            dependentAxis
                            label={selectY}
                            style={{
                                axisLabel: { padding: 40, fontSize: 20 }
                            }}
                        />
                        <VictoryLine
                            data={runs}
                            x={selectX}
                            y={selectY}
                            style={{
                                data: {
                                    stroke: color,
                                    strokeWidth: (5)
                                }
                            }}
                        />
                    </VictoryChart>
                {/* </Grid> */}
            {/* </Grid> */}
        </div>
    )
}

export default GraphItem;