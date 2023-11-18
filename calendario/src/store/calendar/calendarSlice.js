import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  // events: [tempEvent],
  isLoadingEvents: true,
  events: [],
  activeEvent: null,
}

export const calendarSlice = createSlice({
  name:  'calendar',
  initialState,
  reducers: {
    onSetActiveEvent: (state, {payload}) => {
      state.activeEvent = payload
    },
    onAddNewEvent: (state, {payload}) => {
      state.events.push(payload)
      state.activeEvent = null
      state.isSaving = false
    },
    onUpdateEvent: (state, {payload}) => {
      state.events = state.events.map(calendarEvent => calendarEvent.id === payload.id ? payload : calendarEvent)
      state.activeEvent = null
      state.isSaving = false

    },
    onDeleteEvent: (state) => {
      state.events = state.events.filter(calendarEvent => calendarEvent.id !== state.activeEvent.id)
      state.activeEvent = null
    },

    onLoadEvents: (state, {payload = []}) => {
      payload.forEach(event => {

        const exists = state.events.some(dbEvent => dbEvent.id === event.id) // return a boolean

        if (exists) {

          state.events = state.events.map( dbEvent => dbEvent.id === event.id ? event : dbEvent )
        } else {

          state.events.push(event)
        }

      });

      state.isLoadingEvents = false
    },
    onLogoutCalendar: (state) => {
      state.isLoadingEvents = true
      state.events = []
      state.activeEvent = null
    }
  },
})

export const { onSetActiveEvent,
   onAddNewEvent ,
   onLogoutCalendar,
   onDeleteEvent,
   onLoadEvents,
   onUpdateEvent ,
  } = calendarSlice.actions
