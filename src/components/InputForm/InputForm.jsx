import React from 'react';
import { useState } from 'react'

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
    'Speed',
    'Long',
    'Fun',
    'Casual/Social',
    'Race'
  ]

  //states
  const [categories, setCategories] = useState([]);
  const [date, setDate] = useState(new Date())

  //handles change for selector box
  const inputChange = (event) => {
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

  function clickSubmit() {
    console.log("in click submit");
  }

  return (
    <div className="container">
      <h3>Pace will be calculated</h3>
      <div className='inputs'>
        <TextField
          helperText="Enter Run Distance"
          // id=""
          label="Distance"
        />
        <TextField
          helperText="Enter Run Time"
          color='warning'
          // id=""
          label="Time"
        />
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-checkbox-label">Run Categories</InputLabel>
          <Select
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
              <MenuItem key={runCats} value={runCats}>
                <Checkbox checked={categories.indexOf(runCats) > -1} />
                <ListItemText primary={runCats} />
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
        <TextField
          helperText="Enter any notes here"
          id="notesInput"
          label="Notes"
        />
      </div>

      <div className='inputSubmit'>
        <Button variant="contained" color="warning" onClick={() => clickSubmit()} >Submit</Button>
      </div>
    </div>
  );
}

export default InputForm;
