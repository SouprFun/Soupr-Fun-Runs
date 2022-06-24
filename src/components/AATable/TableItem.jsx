import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableCell from '@mui/material/TableCell';
import { Button } from '@mui/material';
import TableRow from '@mui/material/TableRow';



function TableItem({ run, i }) {
    console.log("table item, run: and i:", run, i);

    const [edit, setEdit] = useState(false);
    const [distEd, setDistEd] = useState(run.distance);
    const [timeEd, setTimeEd] = useState(run.time);
    const [paceEd, setPaceEd] = useState(run.pace);
    const [dateEd, setDateEd] = useState(run.date);
    const [noteEd, setnoteEd] = useState(run.notes);


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
                    <TableCell><input value={dateEd} onChange={(event) => setDateEd(event.target.value)}></input></TableCell>
                    <TableCell><input value={noteEd} onChange={(event) => setNoteEd(event.target.value)}></input></TableCell>
                    <TableCell>
                        <Button variant="contained" color="success" onClick={() => clickSubmit()} >Submit</Button>
                    </TableCell>
                </>
            ) : (
                <>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{run.distance} mile(s)</TableCell>
                    <TableCell>{run.time} seconds</TableCell>
                    <TableCell>{run.pace} seconds per mile</TableCell>
                    <TableCell>{run.date}</TableCell>
                    <TableCell>{run.notes}</TableCell>

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