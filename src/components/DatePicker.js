import { LocalizationProvider } from '@mui/x-date-pickers';
import React from 'react';
import { useRecoilState } from 'recoil';
import { addEventDateState } from '../recoil/atoms';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';

function DatePicker() {
    const [addEventDate, setAddEventDate] = useRecoilState(addEventDateState);

    const handleChange = (newValue) => {
        setAddEventDate(newValue ? newValue.format('YYYY-MM-DD') : '');
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
                label="Date desktop"
                inputFormat="MM/DD/YYYY"
                value={addEventDate ? dayjs(addEventDate) : null}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    );
}

export default DatePicker;