import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./table.css";


//MUI
import { createTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import TableItem from './TableItem';

function AATable() {
    
    // const useStyles = makeStyles((theme) =>({
    //     tableContainer:{
    //         borderRadius: 15,
    //         margin: "10px 10px",
    //     },
    //     tableHeaderCell: {
    //         fontWeight: 'bold',
    //         backgroundColor: theme.palette.primary.dark,
    //         color: theme.palette.getContrastText(theme.primary.dark)
    //     }
    // }))
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_RUNS' });
    }, [])

    //const classes = useStyles()

    const rows = useSelector((store) => store.run);
    console.log("rows is: ", rows);

    return (
        <div>
            <h1>something</h1>
            <TableContainer className='tableContainer' component={Paper} sx={{ marginLeft: 5, minWidth: 650, maxWidth: 1500 }}>
                <Table sx={{ minWidth: 650, maxWidth: 1500 }} aria-label="simple table">
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