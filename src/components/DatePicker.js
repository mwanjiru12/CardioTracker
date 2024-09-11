import { LocalizationProvider } from '@mui/x-date-pickers'
import React from 'react'
import { useRecoilState } from 'recoil'
import { addEventDateState } from '../recoil/atoms'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import TextField from '@mui/material/TextField';


function DatePicker() {

    const [addEventDate, setAddEventDate] = useRecoilState(addEventDateState)

    const handleChange = (newValue) => {
        setAddEventDate(newValue)
    }


  return (
    
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
            label="Date desktop"
            inputFormat="MM/DD/YYYY"
            value={addEventDate}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
        />
    </LocalizationProvider>

  )
}

export default DatePicker