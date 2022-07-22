import React, { Component } from 'react';

class Event extends Component {
  state = { areDetailsHidden: true };

  toggleState = () => {
    this.setState({ areDetailsHidden: !this.state.areDetailsHidden });
  };

  // Actually hiding the details will be done with css.

  render() {
    const { event } = this.props;

    return (
      <div className="event">
        <h2>{event.summary}</h2>
        <span className="startTime">{event.startTime}</span>
        <span className="location">{event.location}</span>
        {this.state.areDetailsHidden ? (
          ''
        ) : (
          <div className={'details'}>
            <h3>About event:</h3>
            <a href={event.htmlLink}>See details on Google Calendar</a>
            <p className="description">{event.description}</p>
          </div>
        )}
        <button className="toggleDetails" onClick={this.toggleState}></button>
      </div>
    );
  }
}

export default Event;
