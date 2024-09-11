import FullCalendar from '@fullcalendar/react'
import { Box, Button, Card, CardActions, CardContent, Grid, Paper, Rating, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import useAuthorizedFetch from '../lib/useAuthorizedFetch'
import { activitiesByDayState, deletingActivityState, selectedCalendarEventState, selectedDateState } from '../recoil/atoms'

function Event({ENDPOINT, capitalizeFirstLetter, GradientBox, handleDeleteActivity, deleteParentActiveDay}) {

    const selectedCalendarEvent = useRecoilValue(selectedCalendarEventState)
    const [activitiesByDay, setActivitiesByDay] = useRecoilState(activitiesByDayState)
    const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState)
    const deletingActivity = useRecoilValue(deletingActivityState)

    const authFetchActiveDayActivities = useAuthorizedFetch()
    const authFetchActiveDay = useAuthorizedFetch()


    useEffect(() => {
        authFetchActiveDayActivities(`${ENDPOINT}/active_days/${selectedCalendarEvent}/activities`).then(setActivitiesByDay)
        authFetchActiveDay(`${ENDPOINT}/active_days/${selectedCalendarEvent}`).then(setSelectedDate)
    }, [deletingActivity])


    const calorieSum = activitiesByDay.reduce((acc, obj) => {
        return acc + obj.calories
    }, 0)

    const distanceSum = activitiesByDay.reduce((acc, obj) => {
        return acc + obj.distance
    }, 0)
    
    const activityLengthSum = activitiesByDay.reduce((acc, obj) => {
        return acc + obj.activity_length
    }, 0)



  return (

    <GradientBox style={{ minHeight: '95vh'}}>
        <Grid container direction={'column'} alignContent='center'>
            <Grid item>
                <Paper elevation={20} sx={{ p: 2, width: '60vw', border: 3, borderColor: 'primary.main', mb: 5}}>
                    <Typography align='center' variant='h2'>
                        Activities for {capitalizeFirstLetter(selectedDate.active_day.day_of_week)}, {selectedDate.active_day.date}
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
        <Grid container direction={'column'} alignContent='center'>
            {activitiesByDay.length <= 0 ? (
                <Typography variant='h3'>
                    No data from this date
                </Typography>
            ) : (
                activitiesByDay.map(activity => (
                    <Grid item xs={4} key={activity.id}>
                        <Card 
                            raised={true} 
                            sx={{ m: 1, border: .5, borderColor: 'primary.main', width: 600}}
                        >
                            <CardContent>
                            <Typography align='center' variant='h6'>
                                Exercise Type:
                            </Typography>
                            <Typography align='center' variant='h4'>
                                {capitalizeFirstLetter(activity.exercise_type)}
                            </Typography>
                            <Typography align='center' variant='h6'>
                                Calories Burned:
                            </Typography>
                            <Typography align='center' variant='h4'>
                                {activity.calories}
                            </Typography>
                            <Typography align='center' variant='h6'>
                                Duration:
                            </Typography>
                            <Typography align='center' variant='h4'>
                                {activity.activity_length} minutes
                            </Typography>
                            <Typography align='center' variant='h6'>
                                Distance:
                            </Typography>
                            <Typography align='center' variant='h4'>
                                {activity.distance} miles
                            </Typography>
                            <Grid container alignContent={'center'}>
                                <Rating 
                                    value={activity.rating}
                                    readOnly
                                    max={10}
                                    sx={{ m: 'auto'}}
                                />
                            </Grid>
                            </CardContent>
                            <Box display={'flex'}>
                                <CardActions sx={{ m: 'auto'}}>
                                    <Button variant='contained' sx={{ m: 'auto' }} onClick={() => {
                                            handleDeleteActivity(activity)
                                        }}>
                                        delete
                                    </Button>
                                </CardActions>
                            </Box>
                        </Card>
                    </Grid>
                ))
            )}
        </Grid>
        <Grid container direction={'column'} alignContent='center'>
            <Grid item>
                <Card 
                    raised={true} 
                    sx={{ m: 1, border: .5, borderColor: 'primary.main', width: 900}}
                >
                    <CardContent>
                    <Typography align='center' variant='h3'>
                        Daily Totals:
                    </Typography>
                    <Typography align='center' variant='h6'>
                        Calories Burned
                    </Typography>
                    <Typography align='center' variant='h4'>
                        {calorieSum}
                    </Typography>
                    <Typography align='center' variant='h6'>
                        Total Duration
                    </Typography>
                    <Typography align='center' variant='h4'>
                        {activityLengthSum} minutes
                    </Typography>
                    <Typography align='center' variant='h6'>
                        Total Distance
                    </Typography>
                    <Typography align='center' variant='h4'>
                        {distanceSum} miles
                    </Typography>
                    </CardContent>
                    <Box display={'flex'}>
                        <CardActions sx={{ m: 'auto'}}>
                            <Button 
                                variant='contained'
                                component={Link}
                                to='/home'
                                onClick={deleteParentActiveDay}
                            >
                                Back To Calendar
                            </Button>
                        </CardActions>
                    </Box>
                </Card>
            </Grid>
        </Grid>
    </GradientBox>
    )
}

export default Event