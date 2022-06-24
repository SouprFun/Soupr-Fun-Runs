import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//MUI
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button } from '@mui/material';

function AATable() {
    const [edit, setEdit] = useState(false)
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_RUNS' });
    }, [])

    
    const rows = useSelector((store) => store.run);
    console.log("rows is: ", rows);

    const runs = [
        { id: 1, distance: 5, time: 2400, pace: 0, date: '1-20-2022', cat: "long", note: "this was fun" },
        { id: 2, distance: 10, time: 4800, pace: 0, date: '1-22-2022', cat: "long", note: "this was long" },
        { id: 3, distance: 1, time: 320, pace: 0, date: '1-24-2022', cat: "fast", note: "this was fast" },
        { id: 4, distance: 8, time: 3600, pace: 0, date: '1-26-2022', cat: "long", note: "this was fun" },
        { id: 5, distance: 5, time: 2100, pace: 0, date: '2-20-2022', cat: "long", note: "this was fun" },
        { id: 6, distance: 13.1, time: 6090, pace: 0, date: '2-23-2022', cat: "long", note: "this was fun" },
    ]

function clickEdit(event, id){
    console.log("edit", id, event);
    setEdit(!edit);

}

function clickDelete(runid){
    console.log("delete", runid);
    dispatch({type: `DELETE`, payload:{id:runid}})
    
}

function clickSubmit(){
    setEdit(!edit);
}

    return (
        <div>
            <h1>something</h1>
            <TableContainer component={Paper} sx={{ marginLeft: 20, minWidth: 650, maxWidth: 900 }}>
                <Table sx={{ minWidth: 650, maxWidth: 900 }} aria-label="simple table">
                    <TableHead>
                        <TableCell>Run #</TableCell>
                        <TableCell>Distance</TableCell>
                        <TableCell>Time</TableCell>
                        <TableCell>Pace</TableCell>
                    </TableHead>
                    <TableBody>
                        {rows.map((run, i) => (
                            <TableRow
                                key={run.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>{i+1}</TableCell>
                                <TableCell>{run.distance}</TableCell>
                                <TableCell>{run.time}</TableCell>
                                <TableCell>{run.pace}</TableCell>
                                {edit ? (
                                    <TableCell>
                                    <Button variant="contained" color="success" onClick={() => clickSubmit()} >Submit</Button>
                                </TableCell>
                                ):(
                                <TableCell>
                                    <Button variant="contained" color="warning" onClick={() => clickEdit(event, run.id)} >Edit</Button>
                                    <Button variant="contained" color="error" onClick={() => clickDelete(run.id)} >Delete</Button>
                                </TableCell>
)}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )

}

export default AATable;