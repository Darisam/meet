This repository will contain an serverless progressive web application wriiten in React that allows the user to find upcoming events. It will implement the following functionalities.

- As a user I should be able to filter events by city, so I can more easily find the events that are of interest to me.

  1. **_Given_** user hasn’t searched for any city,  
     **_when_** the user opens the app,  
     **_then_** the user should see a list of all upcoming events.
  2. **_Given_** the main page is open,  
     **_when_** user starts typing in the city textbox,  
     **_then_** the user should see a list of cities (suggestions) that match what they’ve typed.
  3. **_Given_** the user was typing “Berlin” in the city textbox and the list of suggested cities is showing,  
     **_when_** the user selects a city (e.g., “Berlin, Germany”) from the list,  
     **_then_** their city should be changed to that city (i.e., “Berlin, Germany”), the list of suggestions should disappear, and the user should receive a list of upcoming events in that city.

- As a user I should be able to see the details of an event, so I can decide whether to attend it.

  1. **_Given_** the main page is displayed,  
     **_when_** the user hasn't yet selected a specific event,  
     **_then_** a list of events is shown, where each event is described only briefly.
  2. **_Given_** a list of events is diplayed,  
     **_when_** the user clicks on an event,  
     **_then_** the details for the event will be shown.
  3. **_Given_** that the details of an event are shown,  
     **_when_** the user clicks on a button to hide the details,
     **_then_** the event element collapses and the list of events is shown again.

- As a user, I should be able to change the number of events shown, so I can adjust the view to fit the size of my device and my preferences.

  1. **_Given_** a list of events is shown,  
     **_when_** the user hasn't changed anything,  
     **_then_** at most 32 events will be displayed at once.
  2. **_Given_** a list of events is shown,  
     **_when_** the user clicks on a number in a field specifying the number of events shown,  
     **_then_** up to the new number of events will be shown at once.

- As a user, I should be able use the app offline, so I can use it even in an area with no network.

  1. **_Given_** the app is not connected to the internet,  
     **_when_** the app is used,  
     **_then_** it shall display the information available from cached data.
  2. **_Given_** the app is not connected to the internet,  
     **_when_** the user changes the settings and tries to access information not available from cache,  
     **_then_** a warning shall be shown that there in no internet connection.

- As a user, I should be able to see the number of upcoming events in each city, so I won't search for events in a city which doesn't have any. (To be honest, I am not fully conviced by this, but I have trouble thinking of any practical use case for having a visualisation of upcoming events per city.)
  1. **_Given_** the app is running,  
     **_when_** the user clicks on a link to the number of upcoming events,  
     **_then_** the user will see a chart with the number of upcoming events for each city.
