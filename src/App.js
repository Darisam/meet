import React, { Component } from 'react';
import './App.css';

import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';

class App extends Component {
  state = { events: [], location: 'all', numberOfEvents: 32 };

  /* updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents =
        location === 'all'
          ? events
          : events.filter((event) => event.location === location);
      this.setState({ events: locationEvents });
    });
  };*/

  eventsToShow = () => {
    const { events, location, numberOfEvents } = this.state;
    const locationEvents =
      location === 'all'
        ? events
        : events.filter((event) => event.location === location);
    return locationEvents.slice(0, numberOfEvents);
  };

  updateNumber = (input) => {
    this.setState({ numberOfEvents: input });
  };

  updateLocation = (location) => {
    this.setState({ location: location });
  };

  componentDidMount() {
    this.mounted = true;
    /*getEvents().then((events) => {
      this.setState({ events: events });
    });*/
    let eventList = getEvents();
    this.setState({ events: eventList });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    let eventsToShow = this.eventsToShow();
    let locations = extractLocations(this.state.events);
    return (
      <div className="App">
        <CitySearch
          locations={locations}
          updateLocation={this.updateLocation}
        />
        <NumberOfEvents updateNumber={this.updateNumber} />
        <EventList eventsToShow={eventsToShow} />
      </div>
    );
  }
}

export default App;
