import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import "./InputForm.css";
//MUI
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

function InputForm() {
  //array of the run categories
  const runCats = [
    { id: 1, name: 'Speed' },
    { id: 2, name: 'Long' },
    { id: 3, name: 'Fun' },
    { id: 4, name: 'Casual/Social' },
    { id: 5, name: 'Race' }
  ];


  useEffect(() => {
      dispatch({ type: 'FETCH_RUNS' });
  }, [])

  const runs = useSelector((store) => store.run);
  console.log(runs);

  //states
  const [categories, setCategories] = useState([]);
  const [date, setDate] = useState(new Date());
  const [distance, setDistance] = useState();
  const [time, setTime] = useState();
  const [note, setNote] = useState('');
  const dispatch = useDispatch();

  //handles change for selector box
  const inputChange = (event) => {
    console.log("event and value, ", event, value);
    const {
      target: { value },
    } = event;
    setCategories(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  //change for date/time selector
  const dateChange = (newValue) => {
    setDate(newValue);
  };

  //handles the submit button click
  function clickSubmit() {
    console.log("in click submit");

    let pace = time / distance;
    console.log("our inputs are: ", distance, time, categories, date, note);

    let something = 0
    for (let cat of categories){
        if (cat === "Speed"){
            something = 1
        }else if (cat === "Long"){
            something = 2
        }else if (cat === "Fun"){
            something = 3
        }else if (cat === "Casual/Social"){
            something = 4
        }else if (cat === "Race"){
            something = 5
        }
        console.log("this is something: ", something)
      }
    dispatch({ type: "RUN_INPUTS", payload: { distance, time, pace, date, note, categories: something } })
    // dispatch({ type: "CATEGORIES", payload: { categories } })

      setCategories([]);
      setDistance(0);
      setTime(0);
      setDate(new Date());
      setNote("")
  }

  return (
    <div className="container">
      <h3>Pace will be calculated</h3>
      <div className='inputs'>
        <TextField sx={{ marginRight: 3 }}
          helperText="Enter Run Distance in Miles"
          className="input"
          type="number"
          label="Distance"
          value={distance}
          onChange={(event) => setDistance(event.target.value)}
        />
        <TextField sx={{ marginRight: 3 }}
          helperText="Enter Run Time"
          color='success'
          className="input"
          type="number"
          label="Time"
          value={time}
          onChange={(event) => setTime(event.target.value)}
        />
        <FormControl className='input' sx={{ m: 0, width: 400 }}>
          <InputLabel >Run Categories</InputLabel>
          <Select sx={{ marginTop: 0 }}
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={categories}
            onChange={inputChange}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => selected.join(', ')}
          // MenuProps={MenuProps}
          >
            {runCats.map((runCats) => (
              <MenuItem key={runCats.id} value={runCats.name}>
                <Checkbox checked={categories.indexOf(runCats.name) > -1} />
                <ListItemText primary={runCats.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className='date'>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            label="Date&Time picker"
            value={date}
            onChange={dateChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>

      <div className='notes'>
        <TextField sx={{ marginTop: 5, width: 300 }}
          helperText="Enter any notes here"
          className="input"
          id='notesInput'
          label="Notes"
          value={note}
          onChange={(event) => setNote(event.target.value)}
        />
      </div>

      <div className='inputSubmit'>
        <Button variant="contained" color="success" onClick={() => clickSubmit()} >Submit</Button>
      </div>
      <ul>
        {runs.map((run) => {
          <li> distance: ${run.distance}, time: ${run.time}, pace: ${run.pace} </li>
        })}
      </ul>
    </div>
  );
}

export default InputForm;
