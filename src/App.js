import React, { Component } from 'react';
import './App.css';

import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents, getAccessToken, checkToken } from './api';
import WelcomeScreen from './WelcomeScreen';
import { InfoAlert } from './Alert';

class App extends Component {
  state = {
    events: [],
    location: 'all',
    numberOfEvents: 32,
    onlineStatus: true,
    showWelcomeScreen: undefined,
  };

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

  async componentDidMount() {
    this.mounted = true;
    if (!navigator.onLine) {
      this.setState({ onlineStatus: false });
    }
    window.addEventListener('online', (e) => {
      this.setState({ onlineStatus: true });
    });
    window.addEventListener('offline', (e) => {
      this.setState({ onlineStatus: false });
    });

    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    this.setState({
      showWelcomeScreen: !(
        code ||
        isTokenValid ||
        window.location.href.startsWith('http://localhost')
      ),
    });
    if (
      (code ||
        isTokenValid ||
        window.location.href.startsWith('http://localhost')) &&
      this.mounted
    ) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events: events });
        }
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    let eventsToShow = this.eventsToShow();
    let locations = extractLocations(this.state.events);
    if (this.state.showWelcomeScreen === undefined) {
      return <div className="App"></div>;
    }

    return (
      <div className="App">
        <InfoAlert
          text={
            this.state.onlineStatus
              ? ''
              : 'The App is offline. No new data can be loaded.'
          }
        />
        <CitySearch
          locations={locations}
          updateLocation={this.updateLocation}
        />
        <NumberOfEvents updateNumber={this.updateNumber} />
        <EventList eventsToShow={eventsToShow} />
        <WelcomeScreen
          showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => {
            getAccessToken();
          }}
        />
      </div>
    );
  }
}

export default App;
