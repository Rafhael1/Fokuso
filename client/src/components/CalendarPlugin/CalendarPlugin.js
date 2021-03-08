import React, {useState, useEffect} from 'react'

import {
  Button,
  Form,
  Input,
  Header,
  Icon,
  Modal
} from 'semantic-ui-react'

import './CalendarPlugin.scss'

import {toast} from "react-toastify";

export default function CalendarPlugin() {

  const [open,
    setOpen] = React.useState(false) // Modal
  const [date,
    setDate] = useState('')
  const [endDate,
    setEndDate] = useState('')
  const [title,
    setTitle] = useState('')
  const [events,
    setEvents] = useState([])
  const [logged,
    setLogged] = useState(false)

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
            'summary': `${title}`,
            'description': '',
            'start': {
              //'dateTime': `2021-03-28T17:00:00-07:00`, 'date': {date},
              'date': `${date}`
            },
            'end': {
              //'dateTime': `2021-03-28T17:00:00-07:00`, 'date': {date},
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
            // console.log(event) appendPre('Event created: ' + event.htmlLink);
            // toast.dark('Event created: ' + event.htmlLink)
            toast.dark("👏 Event Created", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined
            });
          })
        })
    })
    setOpen(false)
  }

  const getEvents = () => {
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
          gapi
            .client
            .calendar
            .events
            .list({
              'calendarId': 'primary',
              'timeMin': (new Date()).toISOString(),
              'showDeleted': false,
              'singleEvents': true,
              'maxResults': 10,
              'orderBy': 'startTime'
            })
            .then(res => {
              const ev = res.result.items
              console.log(ev)
              setEvents(ev)
              setLogged(true)
            })
        })
    })
  }

  useEffect(() => {
    const Day = new Date();
    setDate(`${Day.getFullYear()}-${Day.getMonth() + 1}-${Day.getDate()}`)
    setEndDate(`${Day.getFullYear()}-${Day.getMonth() + 1}-${Day.getDate()}`)
    //console.log(Day.getMonth() + 1) getEvents()
  }, [])

  return (
    <div className="Calendar">
      <main>
        {logged === false
          ? <Button content=" Connect To Google Calendar" color="red" icon="google" onClick={getEvents}/>
          : <Modal
            closeIcon
            open={open}
            trigger={<Button className="plus" content="New Event" size="big" icon="plus"></Button>}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}>
            <Header icon='calendar alternate' content='Add Event To Calendar'/>
            <Modal.Content>
              <div className="Form">
                <Input
                  label="Title"
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}/>
                <br/>
                <Input
                  label="Start"
                  type="text"
                  placeholder="YYYY-MM-DD"
                  value={date}
                  onChange={e => setDate(e.target.value)}/>
                <br/>
                <Input
                  label="End"
                  type="text"
                  placeholder="YYYY-MM-DD"
                  value={endDate}
                  onChange={e => setEndDate(e.target.value)}/>
              </div>
            </Modal.Content>
            <Modal.Actions>
              <Button color='red' onClick={() => setOpen(false)}>
                <Icon name='remove'/>
                No
              </Button>
              <Button color='green' onClick={() => handleClick()}>
                <Icon name='checkmark'/>
                Yes
              </Button>
            </Modal.Actions>
          </Modal>
        }
        <ul>
          {events.map(event => (
            <li>
              {event.start.date} | {event.summary}
            </li>
          ))
          }
        </ul>
      </main>
    </div>
  )
}
