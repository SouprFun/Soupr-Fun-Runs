import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableCell from '@mui/material/TableCell';
import { Button } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import moment from "moment";
//Sweet Alerts
import swal from 'sweetalert';


function TableItem({ run, i }) {
    
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false);
    const [distEd, setDistEd] = useState(run.distance);
    const [timeEd, setTimeEd] = useState(run.time);
    const [paceEd, setPaceEd] = useState(run.pace);
    const [dateEd, setDateEd] = useState(run.date);
    const [noteEd, setNoteEd] = useState(run.notes);
    const [catEd, setCatEd] = useState(run.cat_id);
    let even = ""
    let something = 0

    let newDate = moment(dateEd).utc().format('YYYY-MM-DD HH:MM:SS');

    if (catEd == 1){
        something = "Speed"
    }else if (catEd == 2){
        something = "Long"
    }else if (catEd == 3){
        something = "Fun"
    }else if (catEd == 4){
        something = "Casual/Social"
    }else if (catEd == 5){
        something = "Race"
    }
    console.log("run: ", run);

    if (i % 2 === 0){
        even = "even"
    }else{
        even = ""
    }

    function clickDelete(runid) {
        console.log("delete", runid);
        dispatch({ type: `DELETE`, payload: { id: runid } })
        swal({
            title: "This run has been deleted!",
            buttons: {
              cancel: "OK",
            },
            icon: "success"
          })
    }

    function clickEdit(event,) {
        console.log("edit", event);
        setEdit(!edit);

    }

    function clickCancel() {
        setEdit(!edit);
        console.log(edit);
    }

    function clickSubmit() {
        setEdit(!edit);
        dispatch({ type: "EDIT_RUN", payload: { id: run.id, distance: distEd, time: timeEd, pace: paceEd, date: dateEd, note: noteEd, cat_id: catEd } })

        swal({
            title: "Your run has been edited!",
            buttons: {
              cancel: "OK",
            },
            icon: "success"
          })
    }

    return (
        <TableRow
            key={run.id}
            className={even}
            sx={{ '&:last-child td, &:last-child th': { border: 0 }
        }}
        >

            {edit ? (
                <>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell><input value={distEd} onChange={(event) => setDistEd(event.target.value)}></input></TableCell>
                    <TableCell><input value={timeEd} onChange={(event) => setTimeEd(event.target.value)}></input></TableCell>
                    <TableCell>{paceEd} seconds per mile</TableCell>
                    <TableCell><input value={dateEd} onChange={(event) => setDateEd(event.target.value)}></input></TableCell>
                    <TableCell><input value={catEd} onChange={(event) => setCatEd(event.target.value)}></input></TableCell>
                    <TableCell><input value={noteEd} onChange={(event) => setNoteEd(event.target.value)}></input></TableCell>
                    <TableCell>
                        <Button variant="contained" color="success" onClick={() => clickSubmit()} >Submit</Button>
                        <Button variant="contained" color="primary" onClick={() => clickCancel()} >Cancel</Button>
                    </TableCell>
                </>
            ) : (
                <>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{run.distance} mile(s)</TableCell>
                    <TableCell>{(run.time/60).toFixed(2)} minutes</TableCell>
                    <TableCell>{(run.pace/60).toFixed(2)} minutes per mile</TableCell>
                    <TableCell>{newDate}</TableCell>
                    <TableCell>{run.run_type}</TableCell>
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