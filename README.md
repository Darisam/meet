This repository will conatin an app that allosw the user to find upcoming events. It will implement the following functionalities.

- As a user I should be able to filter events by city, so I can more easily find the events that are of interest to me.

  1. **Given** user hasn’t searched for any city,  
     **when** the user opens the app,  
     **then** the user should see a list of all upcoming events.
  2. **Given** the main page is open,  
     **when** user starts typing in the city textbox,  
     **then** the user should see a list of cities (suggestions) that match what they’ve typed.
  3. **Given** the user was typing “Berlin” in the city textbox and the list of suggested cities is showing,  
     **when** the user selects a city (e.g., “Berlin, Germany”) from the list,  
     **then** their city should be changed to that city (i.e., “Berlin, Germany”) and the user should receive a list of upcoming events in that city.

- As a user I should be able to see the details of an event, so I can decide whether to attend it.

  1. **Given** the main page is displayed,  
     **when** the user hasn't yet selected a specific event,  
     **then** a list of events is shown, where each event is described only briefly.
  2. **Given** a list of events is diplayed,  
     **when** the user clicks on an event,  
     **then** the details for the event will be shown.
  3. **Given** that the details of an event are shown,  
     **when** the user clicks on a button to hide the details,
     **then** the event element collapses and the list of events is shown again.

- As a user, I should be able to change the number of events shown, so I can adjust the view to fit the size of my device and my preferences.

  1. **Given** a list of events is shown,  
     **when** the user hasn't changed anything,  
     **then** at most 32 events will be displayed at once.
  2. **Given** a list of events is shown,  
     **when** the user clicks on a number in a field specifying the number of events shown,  
     **then** up to the new number of events will be shown at once.

- As a user, I should be able use the app offline, so I can use it even in an area with no network.

  1. **Given** the app is not connected to the internet,  
     **when** the app is used,  
     **then** it shall display the information available from chached data.
  2. **Given** the app is not connected to the internet,  
     **when** the user changes the settings and tries to access information not available from cache,
     **then** a warning shall be shown that there in no internet connection.

- As a user, I should be able to see the number of upcoming events in each city, so I won't search for events in a city which doesn't have any. (To be honest, I am not fully conviced by this, but I have trouble thinking of any practical use case for having a visualisation of upcoming events per city.)
  1. **Given** the app is running,
     **when** the user clicks on a link to the number of upcoming events,
     **then** the user will see a chart with the number of upcoming events for each city.
