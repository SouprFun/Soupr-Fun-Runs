import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableCell from '@mui/material/TableCell';
import { Button } from '@mui/material';
import TableRow from '@mui/material/TableRow';



function TableItem({ run, i }) {
    const [edit, setEdit] = useState(false);
    const [distEd, setDistEd] = useState(run.distance);
    const [timeEd, setTimeEd] = useState(run.time)
    const [paceEd, setPaceEd] = useState(run.pace)


    function clickDelete(runid) {
        console.log("delete", runid);
        dispatch({ type: `DELETE`, payload: { id: runid } })

    }

    function clickEdit(event,) {
        console.log("edit", event);
        setEdit(!edit);

    }

    function clickSubmit() {
        setEdit(!edit);
        
    }

    return (
        <TableRow
            key={run.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >

            {edit ? (
                <>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell><input value={distEd} onChange={(event) => setDistEd(event.target.value)}></input></TableCell>
                    <TableCell><input value={timeEd} onChange={(event) => setTimeEd(event.target.value)}></input></TableCell>
                    <TableCell><input value={paceEd} onChange={(event) => setPaceEd(event.target.value)}></input></TableCell>

                    <TableCell>
                        <Button variant="contained" color="success" onClick={() => clickSubmit()} >Submit</Button>
                    </TableCell>
                </>
            ) : (
                <>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{run.distance}</TableCell>
                    <TableCell>{run.time}</TableCell>
                    <TableCell>{run.pace}</TableCell>
                    <TableCell>
                        <Button variant="contained" color="warning" onClick={() => clickEdit(run.id)} >Edit</Button>
                        <Button variant="contained" color="error" onClick={() => clickDelete(run.id)} >Delete</Button>
                    </TableCell>
                </>
            )}
        </TableRow>
    )


}

export default TableItem;