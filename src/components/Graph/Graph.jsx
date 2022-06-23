import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack } from 'victory';


function Graph(){
    const dispatch = useDispatch()
    const runs = useSelector((store) => store.run)
    console.log("in graph runs: ", runs);

    let data = []
    for (let run of runs) {
        data.push({distance: run.distance, pace: run.pace})
    }

    console.log("data for graph", data);

    useEffect(() => {
        dispatch({ type: 'FETCH_RUNS' });
        }, [])
        
    return (
        <div>
            <h1>Graphs go here</h1>
            <VictoryChart domainPadding={30}>
                <VictoryAxis 
                tickValues={[0, 2, 4, 6, 8, 10]}
                />
                <VictoryAxis
                dependentAxis
                tickFormat={(x) => parseFloat(x/60).toFixed(2)}
                />
                <VictoryBar
                data={data}
                x="distance"
                y="pace"
                />
            </VictoryChart>
        </div>
    )
}

export default Graph;