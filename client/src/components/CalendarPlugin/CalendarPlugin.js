import React, { useState, useEffect } from 'react'

import {
  Button,
  Checkbox,
  Form,
  Input,
  Radio,
  Select,
  TextArea
} from 'semantic-ui-react'


export default function CalendarPlugin() {


  const [date, setDate] = useState('')
  const [endDate, setEndDate] = useState('')

  let gapi = window.gapi

  const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY
  const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID

  const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
  const SCOPES = "https://www.googleapis.com/auth/calendar.events";

  const handleClick = () => {
    gapi.load('client:auth2', () => {
      console.log('loaded client')

      gapi
        .client
        .init({apiKey: API_KEY, clientId: CLIENT_ID, discoveryDocs: DISCOVERY_DOCS, scope: SCOPES})

      gapi
        .client
        .load('calendar', 'v3', () => console.log('bang'))

      gapi
        .auth2
        .getAuthInstance()
        .signIn()
        .then(() => {
           console.log(date.substring(0, 4))
          let event = {
            'summary': 'Cool reminder',
            'description': 'A chance to hear more about Google\'s developer products.',
            'start': {
              //'dateTime': `2021-03-28T17:00:00-07:00`,
              //'date': {date},
              'date': `${date}`
            },
            'end': {
              //'dateTime': `2021-03-28T17:00:00-07:00`,
              //'date': {date},
              'date': `${endDate}`
            },
            'reminders': {
              'useDefault': false,
              'overrides': [
                {
                  'method': 'email',
                  'minutes': 24 * 60
                }, {
                  'method': 'popup',
                  'minutes': 10
                }
              ]
            }
          };

          const request = gapi
            .client
            .calendar
            .events
            .insert({'calendarId': 'primary', 'resource': event});

          request.execute(event => {
            console.log(event)
            window.open(event.htmlLink)
          })
        })

    })
  }

  useEffect(() => {
    const Day = new Date();
    setDate(`${Day.getFullYear()}-${Day.getMonth()}-${Day.getDate()}`)
    setEndDate(`${Day.getFullYear()}-${Day.getMonth()}-${Day.getDate()}`)
  }, [])

  return (
    <div>
      <Form>
        <Input  type="text" placeholder="YYYY-MM-DD" value={date} onChange={e => setDate(e.target.value)} />
        <Input  type="text" placeholder="YYYY-MM-DD" value={endDate} onChange={e => setEndDate(e.target.value)} />
      </Form> 
      <button onClick={handleClick}>Click</button>
    </div>
  )
}
