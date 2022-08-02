import { calendarEventList } from './mock-data';
import axios from 'axios';
import NProgress from 'nprogress';

const checkToken = async (accessToken) => {
  const result = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  )
    .then((response) => response.json())
    .catch((error) => error.json());
  return result;
};

const getToken = async (code) => {
  const encodeCode = encodeURIComponent(code);
  const { access_token } = await fetch(
    'https://mpsz2rdhq1.execute-api.eu-central-1.amazonaws.com/dev/api/token/' +
      encodeCode
  )
    .then((response) => response.json())
    .catch((error) => error);

  if (access_token) {
    localStorage.setItem('access_token', access_token);
  }

  return access_token;
};

const getAccessToken = async () => {
  const accessToken = localStorage.getItem('access_token');
  const tokenCheck = accessToken && (await checkToken(accessToken));

  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem('access_token');
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get('code');
    if (!code) {
      const results = await axios.get(
        'https://mpsz2rdhq1.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url'
      );
      const { authUrl } = results.data;
      return (window.location.href = authUrl);
    }
    return code && getToken(code);
  }
  return accessToken;
};

const removeQuery = () => {
  if (window.history.pushState && window.location.pathname) {
    let newUrl =
      window.location.protocol +
      '//' +
      window.location.host +
      window.location.pathname;
    window.history.pushState('', '', newUrl);
  } else {
    let newUrl = window.location.protocol + '//' + window.location.host;
    window.history.pushState('', '', newUrl);
  }
};

// Get rid of unused data to save memory

const extractUsedData = (eventList) => {
  const shortenEvent = (event) => {
    return {
      id: event.id,
      location: event.location,
      start: { dateTime: event.start.dateTime },
      summary: event.summary,
      description: event.description,
      htmlLink: event.htmlLink,
    };
  };
  return eventList.map(shortenEvent);
};

const getEvents = async () => {
  NProgress.start();

  if (window.location.href.startsWith('http://localhost')) {
    NProgress.done();
    return extractUsedData(calendarEventList);
  }

  if (!navigator.onLine) {
    const lastEvents = localStorage.getItem('lastEvents');
    NProgress.done();
    return lastEvents ? JSON.parse(lastEvents) : [];
  }

  const token = await getAccessToken();

  if (token) {
    removeQuery();
    const url =
      'https://mpsz2rdhq1.execute-api.eu-central-1.amazonaws.com/dev/api/get-events/' +
      token;
    const result = await axios.get(url);

    if (result.data) {
      let locations = extractLocations(result.data.events);
      let events = extractUsedData(result.data.events);
      localStorage.setItem('lastEvents', JSON.stringify(events));
      localStorage.setItem('locations', JSON.stringify(locations));
      NProgress.done();
      return events;
    }
    NProgress.done();
  }
};

const extractLocations = (events) => {
  const locationsList = events.map((event) => event.location);
  const locations = [...new Set(locationsList)];
  return locations;
};

export { extractLocations, getEvents, checkToken, getAccessToken };
