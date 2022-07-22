const extractLocations = (events) => {
  const locationsList = events.map((event) => event.location);
  const locations = [...new Set(locationsList)];
  return locations;
};

const extractDetails = (event) => {
  const eventDetails = {
    summary: event.summary,
    description: event.description,
    location: event.location,
    htmlLink: event.htmlLink,
    startTime: event.start.dateTime,
  };
  return eventDetails;
};

export { extractLocations, extractDetails };
