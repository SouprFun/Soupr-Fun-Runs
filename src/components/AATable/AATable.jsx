import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./table.css";


//MUI
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import TableItem from './TableItem';

function AATable() {
 
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_RUNS' });
    }, [])

    const rows = useSelector((store) => store.run);
    console.log("rows is: ", rows);

    return (
        <div>
            <h1>Your Runs</h1>
            <TableContainer id='tableContainer' component={Paper} sx={{ marginLeft: 5}}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableCell className='tableHeaderCell'>Run #</TableCell>
                        <TableCell className='tableHeaderCell' >Distance</TableCell>
                        <TableCell className='tableHeaderCell' >Time</TableCell>
                        <TableCell className='tableHeaderCell' >Pace</TableCell>
                        <TableCell className='tableHeaderCell' >Date</TableCell>
                        <TableCell className='tableHeaderCell' >Category</TableCell>
                        <TableCell className='tableHeaderCell' >Notes</TableCell>
                        <TableCell className='tableHeaderCell' ></TableCell>

                    </TableHead>
                    <TableBody>
                        {rows.map((run, i) => (<TableItem run={run} i={i} />))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )

}

export default AATable;