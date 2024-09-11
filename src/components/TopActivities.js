import { FormControl, Grid, MenuItem, Paper, Select, Typography, InputLabel, Button, Card, CardContent, Rating, Box, CardActions } from '@mui/material'
import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import useAuthorizedFetch from '../lib/useAuthorizedFetch'
import { currentUser, personalRecordSelectState, topActivityDataState } from '../recoil/atoms'

function TopActivities({ GradientBox, ENDPOINT, capitalizeFirstLetter, handleDeleteActivity }) {

    const [personalRecordSelect, setPersonalRecordSelect] = useRecoilState(personalRecordSelectState)
    const [topActivityData, setTopActivityData] = useRecoilState(topActivityDataState)
    const user = useRecoilValue(currentUser)

    const authFetchTopActivity = useAuthorizedFetch()


    function handleTopSelectChange(e) {
        const name = e.target.name
        let value = e.target.value
    
        setPersonalRecordSelect({
            ...personalRecordSelect,
            [name]: value,
        })
    }

    function handleFetchRecords() {
        authFetchTopActivity(`${ENDPOINT}/activities/${personalRecordSelect.exercise_type}/top/${personalRecordSelect.sort_by}`)
        .then(j => j !== null ? handleMatchToUser(j) : setTopActivityData({
            ...j,
            no_data: true,
        }))
    }

    function handleMatchToUser(json) {
        const userFilteredActivities = json.filter(a => a.active_day.user_id === user.id)
        if(userFilteredActivities.length > 0 ) {
            setTopActivityData(userFilteredActivities[0])
        } else {
            setTopActivityData({
                ...json,
                no_data: true,
            })
        }
    }


  return (
    
    <GradientBox style={{ minHeight: '95vh'}}>
        <Grid container direction={'column'} alignContent='center'>
            <Grid item>
                <Paper elevation={20} sx={{ p: 2, width: '60vw', border: 3, borderColor: 'primary.main', mb: 5}}>
                    <Typography align='center' variant='h2'>
                        Your Personal Records
                    </Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl sx={{ minWidth: '10vw', pr: .5}}>
                    <InputLabel id='exerciseTypeLabel'>Exercise Type</InputLabel>
                    <Select
                        value={personalRecordSelect.exercise_type}
                        labelId='exerciseTypeLabel'
                        label='Exercise Type'
                        name='exercise_type'
                        onChange={handleTopSelectChange}
                    >
                        <MenuItem value={'bike'}>Bike</MenuItem>
                        <MenuItem value={'run'}>Run</MenuItem>
                        <MenuItem value={'ski'}>Ski</MenuItem>
                        <MenuItem value={'hike'}>Hike</MenuItem>
                        <MenuItem value={'swim'}>Swim</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ minWidth: '10vw', pl: .5}}>
                    <InputLabel id='sortByLabel'>Sort Activities By</InputLabel>
                    <Select
                        value={personalRecordSelect.sort_by}
                        labelId='sortByLabel'
                        label='Sort Activities By'
                        name='sort_by'
                        onChange={handleTopSelectChange}
                    >
                        <MenuItem value={'distance'}>Distance</MenuItem>
                        <MenuItem value={'activity_length'}>Time Spent Active</MenuItem>
                        <MenuItem value={'calories'}>Calories</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center" sx={{ pt: 4}}>
                <Button
                    variant='contained'
                    onClick={handleFetchRecords}
                >
                    Search
                </Button>
            </Grid>
            {topActivityData.id === null ? null : (
                (topActivityData.no_data === true ? (
                    <Grid item>
                        <Paper elevation={20} sx={{ p: 2, width: '60vw', border: 3, borderColor: 'primary.main', mt: 5}}>
                            <Typography align='center' variant='h2'>
                                No Personal Bests for this Activity Type
                            </Typography>
                        </Paper>
                    </Grid>
                ) : (                <Grid item xs={12} align="center">
                <Card 
                    raised={true} 
                    sx={{ m: 1, border: .5, borderColor: 'primary.main', width: 600}}
                >
                    <CardContent>
                    <Typography align='center' variant='h6'>
                        Exercise Type:
                    </Typography>
                    <Typography align='center' variant='h4'>
                        {capitalizeFirstLetter(topActivityData.exercise_type)}
                    </Typography>
                    <Typography align='center' variant='h6'>
                        Calories Burned:
                    </Typography>
                    <Typography align='center' variant='h4'>
                        {topActivityData.calories}
                    </Typography>
                    <Typography align='center' variant='h6'>
                        Duration:
                    </Typography>
                    <Typography align='center' variant='h4'>
                        {topActivityData.activity_length} minutes
                    </Typography>
                    <Typography align='center' variant='h6'>
                        Distance:
                    </Typography>
                    <Typography align='center' variant='h4'>
                        {topActivityData.distance} miles
                    </Typography>
                    <Grid container alignContent={'center'}>
                        <Rating 
                            value={topActivityData.rating}
                            readOnly
                            max={10}
                            sx={{ m: 'auto'}}
                        />
                    </Grid>
                    <Typography align='center' variant='h6'>
                        This Personal Best Was Set On:
                    </Typography>
                    <Typography align='center' variant='h4'>
                        {capitalizeFirstLetter(topActivityData.active_day.day_of_week)}, {topActivityData.active_day.date}
                    </Typography>
                    </CardContent>
                    <Box display={'flex'}>
                        <CardActions sx={{ m: 'auto'}}>
                            <Button variant='contained' sx={{ m: 'auto' }} onClick={() => {
                                    handleDeleteActivity(topActivityData)
                                }}>
                                delete
                            </Button>
                        </CardActions>
                    </Box>
                </Card>
            </Grid>))
            )}
        </Grid>
    </GradientBox>



  )
}

export default TopActivities