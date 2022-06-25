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
            <h1>something</h1>
            <TableContainer component={Paper} sx={{ marginLeft: 5, minWidth: 650, maxWidth: 1500 }}>
                <Table sx={{ minWidth: 650, maxWidth: 1500 }} aria-label="simple table">
                    <TableHead>
                        <TableCell>Run #</TableCell>
                        <TableCell>Distance</TableCell>
                        <TableCell>Time</TableCell>
                        <TableCell>Pace</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Notes</TableCell>
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