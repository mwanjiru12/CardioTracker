import { FormControl, Grid, Typography, InputLabel, Select, MenuItem, TextField, Button, Card, CardContent, CardActions } from '@mui/material'
import React from 'react'
import { useRecoilState } from 'recoil'
import { calorieCalcStatementState, calorieCalculatorValueState, newEventDataState } from '../recoil/atoms'
import { Link } from 'react-router-dom'

function CalorieCalculator({ capitalizeFirstLetter }) {

    const [newEventData, setNewEventData] = useRecoilState(newEventDataState)
    const [calorieCalculatorValue, setCalorieCalculatorValue] = useRecoilState(calorieCalculatorValueState)
    const [calorieCalcStatement, setCalorieCalcStatement] = useRecoilState(calorieCalcStatementState)

    const POUNDSTOKILOGRAMS = 2.20462
    const CALORIECOEFFICIENT = .0175

    function handleCalculatorChange(e) {
        const name = e.target.name
        let value = e.target.value
    
        setCalorieCalculatorValue({
            ...calorieCalculatorValue,
            [name]: value,
        })
    }


    function handleCalculation() {
        let result

        const exerciseType = calorieCalculatorValue.exercise_type
        const weight = calorieCalculatorValue.weight
        const time = calorieCalculatorValue.activity_length

        switch(exerciseType) {
            case 'bike':
                result = (weight / POUNDSTOKILOGRAMS) * 9 * CALORIECOEFFICIENT * time
                setNewEventData({
                    ...newEventData,
                        exercise_type: 'bike',
                        calories: result.toFixed(),
                        activity_length: time
                    })
                setCalorieCalcStatement(`biking`)
                break

            case 'run':
                result = (weight / POUNDSTOKILOGRAMS) * 10 * CALORIECOEFFICIENT * time
                setNewEventData({
                    ...newEventData,
                        exercise_type: 'run',
                        calories: result.toFixed(),
                        activity_length: time
                    })
                setCalorieCalcStatement(`running`)
                break

            case 'ski':
                result = (weight / POUNDSTOKILOGRAMS) * 6 * CALORIECOEFFICIENT * time
                setNewEventData({
                    ...newEventData,
                        exercise_type: 'ski',
                        calories: result.toFixed(),
                        activity_length: time
                    })
                setCalorieCalcStatement(`skiing`)
                break

            case 'swim':
                result = (weight / POUNDSTOKILOGRAMS) * 10 * CALORIECOEFFICIENT * time
                setNewEventData({
                    ...newEventData,
                        exercise_type: 'swim',
                        calories: result.toFixed(),
                        activity_length: time
                    })
                setCalorieCalcStatement(`swimming`)
                break

            case 'hike':
                result = (weight / POUNDSTOKILOGRAMS) * 4.8 * CALORIECOEFFICIENT * time
                setNewEventData({
                    ...newEventData,
                        exercise_type: 'hike',
                        calories: result.toFixed(),
                        activity_length: time
                    })
                setCalorieCalcStatement(`hiking`)
                break

            default: console.error('No/not enough values receieved')

        }
        setCalorieCalculatorValue({
            ...calorieCalculatorValue,
            exercise_type: '',
            activity_length: '',
            weight: ''
        })
        
    }



  return (
    <Grid >
        <Grid 
            container
            direction='column'
            alignItems={'center'}
            justifyContent={'center'}
            style={{ minHeight: '95vh'}}
        >
            <Grid item xs={12} align="center">
                <Typography variant='h4' justifySelf={'center'} sx={{ pb: 2 }} >
                    Per Activity Calorie Calculator
                </Typography>
                <FormControl sx={{ m: 2 }} >
                <InputLabel id='exerciseTypeLabel'>Exercise Type</InputLabel>
                <Select
                    value={calorieCalculatorValue.exercise_type}
                    labelId='exerciseTypeLabel'
                    label='Exercise Type'
                    name='exercise_type'
                    onChange={handleCalculatorChange}
                    required
                >
                    <MenuItem value={'bike'}>Bike</MenuItem>
                    <MenuItem value={'run'}>Run</MenuItem>
                    <MenuItem value={'ski'}>Ski</MenuItem>
                    <MenuItem value={'hike'}>Hike</MenuItem>
                    <MenuItem value={'swim'}>Swim</MenuItem>
                </Select>
                <TextField
                    sx={{ m: 2, mt: 4 }}
                    required
                    type='number'
                    autoComplete="off"
                    value={calorieCalculatorValue.activity_length}
                    onChange={handleCalculatorChange}
                    label='Time Active (mins)'
                    name='activity_length'
                />
                <TextField
                    sx={{ m: 2 }}
                    type='number'
                    required
                    autoComplete="off"
                    value={calorieCalculatorValue.weight}
                    onChange={handleCalculatorChange}
                    label='Body Weight (lbs)'
                    name='weight'
                />
                <Button
                    sx={{ m: 2 }}
                    onClick={() => {
                        handleCalculation()
                    }}
                    variant="contained"
                >
                    Calculate
                </Button>
                </FormControl>
            </Grid>
            {newEventData.exercise_type.length > 0 ? (
            <Grid item xs={12} align="center">
                <Card 
                    raised={true} 
                    sx={{ m: 1, border: .5, borderColor: 'primary.main', width: 600}}
                >
                    <CardContent>
                        <Typography variant='h5'>
                            {`${capitalizeFirstLetter(calorieCalcStatement)} for ${newEventData.activity_length} minutes will burn ${newEventData.calories} calories`}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button
                            sx={{ m: 'auto' }}
                            variant="contained"
                            component={Link}
                            to='/new_event'
                            >
                            Add a New Event
                        </Button>
                        <Button
                            sx={{ m: 'auto' }}
                            variant="contained"
                            component={Link}
                            to='/home'
                            >
                            Back to Calendar
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
            ) : (
                null
            )}
        </Grid>
    </Grid>
  )
}

export default CalorieCalculator