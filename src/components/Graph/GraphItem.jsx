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


function GraphItem({ runs, double, num }) {
    const [selectX, setSelectX] = useState(0)
    const [selectY, setSelectY] = useState(0)
    let color = "";
    let size = 6;
    let offset = 0;
    const yArray = [
        { key: 'distance', label: 'Distance (Miles)' },
        { key: 'time', label: 'Time (Seconds)' },
        { key: 'pace', label: 'Pace (Seconds per Mile)' }
    ]

    const xArray = [
        { key: 'index', label: 'Run #' },
        { key: 'distance', label: 'Distance (Miles)' },
        { key: 'date', label: 'Date' }
    ]
    let graphY = yArray[selectY];
    let graphX = xArray[selectX];


    //handles selectorbox for the y-axis
    const handleYAxis = (event) => {
        console.log('event target value: ', xArray[event.target.value] );
        setSelectY(event.target.value);
        console.log("y-axis is: ", selectY);
        
        graphY = xArray[event.target.value]
        console.log("graph Y is: ", graphY);
    };

    //handles selectorbox for the X-axis
    const handleXAxis = (event) => {
        setSelectX(event.target.value);
        console.log("x-axis is: ", selectX);
        
        graphX = yArray[event.target.value]
        console.log("graph X is: ", graphX);
    };


    if (!double) { //if table is doubled
        size = 800
        offset = 2

    } else {
        size = 1600
        offset = 0
    }

    if (num === 1) {
        color = "#FF0073"
    } else {
        color = "#73FF00"
    }
    console.log('runs ', runs );
    console.log('graphX', graphX);
    console.log('graphy', graphY);
    return (
        <div className='graph'>
            <div>
                <FormControl sx={{ marginLeft: 10 }}>
                    <InputLabel sx={{ color: 'warning' }} id="">Y-Axis</InputLabel>
                    <Select
                        color='warning'
                        value={selectY}
                        label="Y-Axis"
                        onChange={handleYAxis}
                        sx={{ border: 'black' }}
                    >
                        {yArray.map((selector, i) => (
                            <MenuItem key={i} value={i}>{selector.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl sx={{ marginLeft: 10 }}>
                    <InputLabel sx={{ color: 'purple' }} id="">X-Axis</InputLabel >
                    <Select
                        color='warning'
                        value={selectX}
                        label="X-Axis"
                        onChange={handleXAxis}
                    >
                        {xArray.map((selector, i) => (
                            <MenuItem key={i} value={i}>{selector.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

            </div>
            <div>
                <h3>{`${graphX.label} vs ${graphY.label} `} </h3>
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
                            Dist: ${datum.distance} 
                            Time: ${datum.time} 
                            pace: ${datum.pace}
                            `)}
                    />
                }
            >
                <VictoryAxis
                    label={graphX.label}
                    style={{
                        axisLabel: { padding: 30, fontSize: 20 },
                        fill: 'orange'
                    }}
                />
                <VictoryAxis
                    dependentAxis
                    label={graphY.label}
                    style={{
                        axisLabel: { padding: 40, fontSize: 20 },
                        fill: 'orange'
                    }}
                />
                <VictoryLine
                    data={runs}
                    x={graphX.key}
                    y={graphY.key}
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