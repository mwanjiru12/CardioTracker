import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { 
  addEventDateState, 
  newEventDataState, 
  currentUser, 
  activeDaysForNewEventState, 
  multipleActivitiesSameDayState 
} from '../recoil/atoms';
import { 
  Button, 
  FormControl, 
  Grid, 
  InputLabel, 
  MenuItem, 
  Rating, 
  Select, 
  TextField, 
  Typography 
} from '@mui/material';
import DatePicker from './DatePicker';
import useAuthorizedFetch from '../lib/useAuthorizedFetch';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

function NewEvent({ ENDPOINT }) {
  const [newEventData, setNewEventData] = useRecoilState(newEventDataState);
  const addEventDate = useRecoilValue(addEventDateState);
  const [activeDaysForNewEvent, setActiveDaysForNewEvent] = useRecoilState(activeDaysForNewEventState);
  const [multipleActivitiesSameDay, setMultipleActivitiesSameDay] = useRecoilState(multipleActivitiesSameDayState);
  const user = useRecoilValue(currentUser);
  const authFetch = useAuthorizedFetch();

  useEffect(() => {
    const fetchActiveDays = async () => {
      try {
        const response = await authFetch(`${ENDPOINT}/active_days/`);
        const userActiveDays = response.filter(e => e.user_id === user.id);

        if (userActiveDays.length > 0) {
          const lastActiveDay = userActiveDays[userActiveDays.length - 1];
          setActiveDaysForNewEvent(lastActiveDay);
        } else {
          setActiveDaysForNewEvent({ date: '2020-01-01' });
        }

        setMultipleActivitiesSameDay(userActiveDays);
      } catch (error) {
        console.error('Error fetching active days:', error);
      }
    };

    fetchActiveDays();
  }, [authFetch, user.id, ENDPOINT, setActiveDaysForNewEvent, setMultipleActivitiesSameDay]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewEventData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const transformedEventDate = addEventDate ? dayjs(addEventDate).format('YYYY-MM-DD') : '';

  const getDayName = (dateStr, locale) => {
    return new Date(dateStr).toLocaleDateString(locale, { weekday: 'long' });
  };

  const handleNewEventSubmit = async () => {
    try {
      const dayToDayOfWeek = new Date(transformedEventDate);
      const diff = Math.floor((Date.parse(activeDaysForNewEvent.date) - Date.parse(transformedEventDate)) / 86400000);

      const newActiveDayObj = {
        date: transformedEventDate,
        day_of_week: getDayName(dayToDayOfWeek, 'en-US'),
        streak: diff >= -2 && diff <= 0 ? activeDaysForNewEvent.streak + 1 : 1,
        user_id: user.id
      };

      const response = await authFetch(`${ENDPOINT}/active_days/`, 'POST', newActiveDayObj);

      if (response.status === 422) {
        await handleMultipleActivitySameDay(newActiveDayObj);
      } else {
        const activeDay = await response.json();
        await handleActivityPost(activeDay);
      }
    } catch (error) {
      console.error('Error submitting new event:', error);
    }
  };

  const handleActivityPost = async (activeDay) => {
    try {
      const transformedNewEventData = {
        ...newEventData,
        active_day_id: activeDay.id
      };

      await authFetch(`${ENDPOINT}/activities/`, 'POST', transformedNewEventData);
      setNewEventData({
        exercise_type: "",
        calories: '',
        activity_length: '',
        distance: '',
        rating: 0
      });
    } catch (error) {
      console.error('Error posting activity:', error);
    }
  };

  const handleMultipleActivitySameDay = async (newActiveDayObj) => {
    try {
      const publishedDate = new Date(newActiveDayObj.date).getTime();
      const duplicateSubmittedDates = multipleActivitiesSameDay.map(d => ({
        id: d.id,
        date: new Date(d.date).getTime() + 21600000 // Adding 6 hours to avoid exact match
      }));

      const matchingDuplicateDates = duplicateSubmittedDates.filter(d => d.date === publishedDate);

      if (matchingDuplicateDates.length > 0) {
        const transformedDuplicateEventDayData = {
          ...newEventData,
          active_day_id: matchingDuplicateDates[0].id
        };

        await authFetch(`${ENDPOINT}/activities/`, 'POST', transformedDuplicateEventDayData);
        setNewEventData({
          exercise_type: "",
          calories: '',
          activity_length: '',
          distance: '',
          rating: 0
        });
      }
    } catch (error) {
      console.error('Error handling multiple activities on the same day:', error);
    }
  };

  return (
    <Grid container direction='column' alignItems='center' justifyContent='center' style={{ minHeight: '95vh' }}>
      <Grid item xs={12} align="center" sx={{ pb: 3 }}>
        <Typography variant='h4' sx={{ pb: 2 }}>
          Date of Activity
        </Typography>
        <DatePicker />
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant='h4' sx={{ pb: 2 }}>
          Activity Details
        </Typography>
        <FormControl sx={{ m: 2 }}>
          <InputLabel id='exerciseTypeLabel'>Exercise Type</InputLabel>
          <Select
            value={newEventData.exercise_type}
            labelId='exerciseTypeLabel'
            label='Exercise Type'
            name='exercise_type'
            onChange={handleFormChange}
          >
            <MenuItem value='bike'>Bike</MenuItem>
            <MenuItem value='run'>Run</MenuItem>
            <MenuItem value='ski'>Ski</MenuItem>
            <MenuItem value='hike'>Hike</MenuItem>
            <MenuItem value='swim'>Swim</MenuItem>
          </Select>
          <TextField
            sx={{ m: 2, mt: 4 }}
            type='number'
            required
            autoComplete="off"
            value={newEventData.calories}
            onChange={handleFormChange}
            label='Calories Burned'
            name='calories'
          />
          <TextField
            sx={{ m: 2 }}
            type='number'
            required
            autoComplete="off"
            value={newEventData.distance}
            onChange={handleFormChange}
            label='Distance'
            name='distance'
          />
          <TextField
            sx={{ m: 2 }}
            type='number'
            required
            autoComplete="off"
            value={newEventData.activity_length}
            onChange={handleFormChange}
            label='Exercise Time'
            name='activity_length'
          />
          <Rating
            sx={{ m: 1 }}
            value={parseInt(newEventData.rating, 10)}
            max={10}
            name='rating'
            onChange={(e) => setNewEventData(prevState => ({
              ...prevState,
              rating: parseInt(e.target.value, 10)
            }))}
          />
          <Button
            sx={{ m: 2 }}
            onClick={handleNewEventSubmit}
            variant="contained"
            component={Link}
            to='/home'
          >
            Submit
          </Button>
        </FormControl>
      </Grid>
    </Grid>
  );
}

export default NewEvent;