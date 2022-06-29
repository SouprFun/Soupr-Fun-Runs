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
import Grid from '@mui/material/Grid';

function GraphItem({runs, double, num}){
    const [selectX, setSelectX] = useState('distance')
    const [selectY, setSelectY] = useState('time')
    let color = "#36f00c";
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

    if (double){

    }

    if (num === 1 ){
        color = "#006400"
    }else {
        color = "#00008b"
    }

    return(
        <div className='graph'>
                <div>
                    <FormControl sx={{ marginLeft: 10 }}>
                        <InputLabel id="">Y-Axis</InputLabel>
                        <Select
                            color='success'
                            value={selectY}
                            label="Y-Axis"
                            onChange={handleYAxis}
                        >
                            <MenuItem value={'distance'}>Distance</MenuItem>
                            <MenuItem value={'time'}>Time</MenuItem>
                            <MenuItem value={'pace'}>Pace</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl sx={{ marginLeft: 10 }}>
                        <InputLabel id="">X-Axis</InputLabel>
                        <Select
                            value={selectX}
                            label="X-Axis"
                            onChange={handleXAxis}
                        >
                            <MenuItem value={'index'}>Run #</MenuItem>
                            <MenuItem value={'distance'}>Distance</MenuItem>
                        </Select>
                    </FormControl>

                </div>
                <div>
                    <VictoryChart
                        minWidth={400}
                        minHeight={400}
                        maxHeight={1000}
                        maxWidth={1000}
                        height={800}
                        width={800}
                        domainPadding={20}
                        padding={{ left: 90, top: 50, right: 10, bottom: 50 }}
                        minDomain={{ y: 0 }}
                        theme={VictoryTheme.material}
                        containerComponent={
                            <VictoryVoronoiContainer
                                // responsive={false}
                                voronoiDimension="x"
                                labels={({ datum }) => (`
                            Run #: ${datum.index} 
                            dist: ${datum.distance} 
                            Time: ${datum.time} 
                            pace: ${datum.pace}
                            `)}
                            />
                        }
                    >
                        <VictoryAxis
                            label={selectX}
                            style={{
                                axisLabel: { padding: 30, fontSize: 20 }
                            }}
                            tickValues={[0, 2, 4, 6, 8, 10]}
                        />
                        <VictoryAxis
                            dependentAxis
                            label={selectY}
                            style={{
                                axisLabel: { padding: 40, fontSize: 20 }
                            }}
                            tickFormat={(x) => parseFloat(x / 60).toFixed(2)}
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
                </div> {/* chart div */}
            </div> 
    )
}

export default GraphItem;