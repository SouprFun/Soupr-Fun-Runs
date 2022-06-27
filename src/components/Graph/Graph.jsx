import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//victory charts
import {
    VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, createContainer,
    VictoryVoronoiContainer, VictoryLine, VictoryContainer, VictoryScatter,
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
    const [selectX, setSelectX] = useState(1)
    const [selectY, setSelectY] = useState(1)

    //const graphContainer = createContainer("voronoi", "container")

    //handles selectorbox for the y-axis
    const handleYAxis = (event) => {
        setSelectY(event.target.value);
        console.log(selectY);
    };

    //handles selectorbox for the X-axis
    const handleXAxis = (event) => {
        setSelectX(event.target.value);
        console.log(selectX);
    };


    let data = [];
    let data2 = [];
    let datum = [];
    for (let i = 0; i < runs.length; i++) {
        data.push({ distance: runs[i].distance, pace: runs[i].pace })
        data2.push({ id: i, pace: runs[i].pace })
        datum.push({ y: runs[i].pace, x: i})
    }

    console.log("datum:", datum);
    console.log("datum.y, datum.x:", );

    //console.log("data 2", data2);
    //console.log("data for graph", data);

    useEffect(() => {
        dispatch({ type: 'FETCH_RUNS' });
    }, [])

    return (
        <div>
            <h1>Graphs go here</h1>
            <div>

                <FormControl sx={{ marginLeft: 10 }}>
                    <InputLabel id="">Y-Axis</InputLabel>
                    <Select
                        value={selectX}
                        label="X-Axis"
                        onChange={handleYAxis}
                    >
                        <MenuItem value={1}>Distance</MenuItem>
                        <MenuItem value={2}>Time</MenuItem>
                        <MenuItem value={3}>Pace</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ marginLeft: 10 }}>
                    <InputLabel id="">X-Axis</InputLabel>
                    <Select
                        value={selectX}
                        label="X-Axis"
                        onChange={handleXAxis}
                    >
                        <MenuItem value={1}>Run #</MenuItem>
                        <MenuItem value={2}>Distance</MenuItem>
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
                        //<VictoryContainer responsive={false} />
                        <VictoryVoronoiContainer
                        responsive={false} 
                        voronoiDimension="x"
                        labels={( datum ) => `y: ${datum.y}`}
                      />

                        // <VictoryVoronoiContainer
                        //     responsive={false}
                        //     mouseFollowTooltips
                        //     voronoiDimension="y"
                        //     labels={(datum) => { `y: ${datum.y}`}}
                        // /> 
                    }
                    minDomain={{ y: 0 }}

                    theme={VictoryTheme.warm}
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
                    {/*<VictoryLine
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
                   } <VictoryScatter
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
                        data={data2}
                        labels={({ datum }) => datum.x}
                        style={{
                            data: {
                                stroke: "#36f00c",
                                strokeWidth: (5)
                            }
                        }}
                        x="id"
                        y="pace"
                        colorScale={"warm"}
                    />
                </VictoryChart>
            </div>
        </div>
    )
}

export default Graph;