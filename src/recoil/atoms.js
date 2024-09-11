import dayjs from "dayjs";
import { atom } from "recoil";

export const loggedInState = atom({
    key: 'loggedInState',
    default: false,
})

export const usernameState = atom({
    key: 'usernameState',
    default: "",
})

export const passwordState = atom({
    key: 'passwordState',
    default: "",
})

export const currentUser = atom({
    key: 'currentUser',
    default: [],
})

export const showPassword = atom({
    key: 'showPassword',
    default: false,
})

export const errorMessageState = atom({
    key: "errorMessageState",
    default: "",
})

export const activityEventsState = atom({
    key: "activityEventsState",
    default: [],
})

export const selectedCalendarEventState = atom({
    key: "selectedCalendarEventState",
    default: 1,
})

export const activitiesByDayState = atom({
    key: "activitiesByDayState",
    default: [],
})

export const selectedDateState = atom({
    key: "selectedDateState",
    default: {
        active_day: {
            date: "2022-08-31",
            day_of_week: "wednesday"
        }
    }
})

export const deletingActivityState = atom({
    key: "deletingActivityState",
    default: 1
})

export const newEventDataState = atom({
    key: 'newEventDataState',
    default: {
        exercise_type: "",
        calories: '',
        activity_length: '',
        distance: '',
        rating: 0,
        active_day_id: null
    },
})

export const addEventDateState = atom({
    key: "addEventDateState",
    default: dayjs()
})

export const activeDaysForNewEventState = atom({
    key: "activeDaysForNewEventState",
    default: {
        date: dayjs('2019-01-25')
    }
})

export const multipleActivitiesSameDayState = atom({
    key: "multipleActivitiesSameDayState",
    default: [],
})

export const calorieCalculatorValueState = atom({
    key: "calorieCalculatorValueState",
    default: {
        activity_length: '',
        weight: '',
        exercise_type: ''
    },
})

export const calorieCalcStatementState = atom({
    key: 'calorieCalcStatementState',
    default: "",
})

export const personalRecordSelectState = atom({
    key: 'personalRecordSelectState',
    default: {
        exercise_type: '',
        sort_by: ''
    },
})

export const topActivityDataState = atom({
    key: 'topActivityDataState',
    default: {
        id: null,
        exercise_type: '',
    },
})

export const activityForDeletingParentState = atom({
    key: "activityForDeletingParentState",
    default: []
})