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
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


function Graph() {
    const dispatch = useDispatch()
    const runs = useSelector((store) => store.run)
    console.log("in graph runs: ", runs);
    const [selectX, setSelectX] = useState('distance')
    const [selectY, setSelectY] = useState('time')
    const [double, setDouble] = useState(false);
    // let data = [];
    // let data2 = [];
    //const graphContainer = createContainer("voronoi", "container")

    //handles selectorbox for the y-axis
    const handleYAxis = (event) => {
        setSelectY(event.target.value);
        console.log("y-axis is: ",selectY);
    };

    //handles selectorbox for the X-axis
    const handleXAxis = (event) => {
        setSelectX(event.target.value);
        console.log("x-axis is: ",selectX);
    };

    // function handleDouble() {
    //     setDouble(!double)
    // }
    
    // for (let i = 0; i < runs.length; i++) {
    //     runs[i].push({ index: i,})
    // }
    console.log("new runs: ", runs);
    /*
    x:
        1:id
        2:distance
    y:
        1:distance
        2:time
        3:pace
    
    function graphData(){
        //x: id, y: pace
        if(selectX===1 && selectY == 1){
            for (let i = 0; i < runs.length; i++) {
                data.push({ id: i, pace: runs[i].pace })
            }
        // x: distance, y: pace
        } else if(selectX===2 && selectY == 1){
            for (let i = 0; i < runs.length; i++) {
                data.push({ id: i, pace: runs[i].pace })
            }
        }
        
    }
    
     for (let i = 0; i < runs.length; i++) {
         data.push({ distance: runs[i].distance, pace: runs[i].pace })
         data2.push({ id: i, pace: runs[i].pace })
     }
*/
    //console.log("data 2", data2);
    //console.log("data for graph", data);

    useEffect(() => {
        dispatch({ type: 'FETCH_RUNS' });
    }, [])

    return (
        <div className='graphPage'>
            <h1>Graphs go here</h1>
            <div className='graph1'>

                <FormControl sx={{ marginLeft: 10 }}>
                    <InputLabel id="">Y-Axis</InputLabel>
                    <Select
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
                        <MenuItem value={'id'}>Run #</MenuItem>
                        <MenuItem value={'distance'}>Distance</MenuItem>
                    </Select>
                </FormControl>

            </div>
            <div>
                <VictoryChart
                    height={800}
                    width={800}
                    domainPadding={20}
                    padding={{ left: 90, top: 50, right: 10, bottom: 50 }}
                    containerComponent={
                        <VictoryVoronoiContainer
                        responsive={false} 
                        voronoiDimension="x"
                        labels={({ datum }) => (`
                            Run #: ${datum.id} 
                            dist: ${datum.distance} 
                            Time: ${datum.time} 
                            pace: ${datum.pace}
                            `)}
                      />

                    }
                    minDomain={{ y: 0 }}

                    theme={VictoryTheme.material}
                >
                    <VictoryAxis
                        label="Run #"
                        style={{
                            axisLabel: { padding: 30, fontSize: 20 }
                        }}
                        tickValues={[0, 2, 4, 6, 8, 10]}
                    />
                    <VictoryAxis
                        dependentAxis
                        label="pace"
                        style={{
                            axisLabel: { padding: 40, fontSize: 20 }
                        }}
                        tickFormat={(x) => parseFloat(x / 100).toFixed(2)}
                    />
                    {/*
                    <VictoryLine
                        data={data}
                        style={{
                            data: {
                                stroke: "#c43a31",
                                strokeWidth: (3)
                            }
                        }}
                        x="distance"
                        y="pace"
                        colorScale={"warm"}
                    />
                    <VictoryScatter
                        data={data}
                        style={{
                            data: {
                                stroke: "#c43a31",
                                strokeWidth: (3)
                            }
                        }}
                        x="distance"
                        y="pace"
                        colorScale={"warm"}
                    />*/}
                    <VictoryLine
                        data={runs}
                        x={selectX}
                        y={selectY}
                        style={{
                            data: {
                                stroke: "#36f00c",
                                strokeWidth: (5)
                            }
                        }}
                    />
                </VictoryChart>
            </div>
        </div>
    )
}

export default Graph;