import { Grid } from '@mui/material'
import React, { useEffect, useMemo } from 'react'
import useAuthorizedFetch from '../lib/useAuthorizedFetch'
import "react-big-calendar/lib/css/react-big-calendar.css"
import { useRecoilState, useRecoilValue } from 'recoil'
import { activityEventsState, currentUser, selectedCalendarEventState } from '../recoil/atoms'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useNavigate } from 'react-router-dom'
import { StyleWrapper } from './StyleWrapper'



function Home({ ENDPOINT }) {

  const [activityEvents, setActivityEvents] = useRecoilState(activityEventsState)
  const [selectedCalendarEvent, setSelectedCalendarEvent] = useRecoilState(selectedCalendarEventState)
  const user = useRecoilValue(currentUser)
  
  const navigate = useNavigate()
  const eventAuthFetch = useAuthorizedFetch()

  useEffect(() => {
    if (user) {
      eventAuthFetch(`${ENDPOINT}/active_days`)
      .then(json => json.filter(e => e.user_id === user.id))
      .then(setActivityEvents)
      .catch(err => console.log(err))
    } 
    else {
      console.log('No User')
    }
  }, [user])


  const transformedEvents = activityEvents.map(e => 
    ({
      id: e.id,
      title: `${e.streak} days active in a row!`,
      allDay: true,
      start: new Date(e.date.replace(/-/g, '\/'))
    })
  )

  // console.log(selectedCalendarEvent)
  


  return (
    
    <Grid container alignContent='center' height={'95vh'}>
      <Grid item xs={10} sx={{ m: 'auto'}}>
        <StyleWrapper>
          <FullCalendar 
            plugins={[dayGridPlugin]}
            events={transformedEvents}
            editable={true}
            selectable={true}
            aspectRatio={2.5}
            defaultAllDay={true}
            eventColor={'#a40000'}
            customButtons={{
              addEventButton: {
                text: 'Add an Activity',
                click: function() {
                  navigate('/new_event')
                }
              }
            }}
            headerToolbar={{
              start: 'title',
              center: 'addEventButton'
            }}
            eventClick={function(arg){
              setSelectedCalendarEvent(arg.event.id)
              navigate('/event')
              // console.log(selectedCalendarEvent)
            }}
          />
        </StyleWrapper>
      </Grid>
    </Grid>




  )
}

export default Home