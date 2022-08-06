import React, { Component } from 'react';

class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = null;
  }

  getStyle = () => {
    return {
      color: this.color,
    };
  };

  render() {
    return (
      <div className="Alert">
        <p style={this.getStyle()}>{this.props.text}</p>
      </div>
    );
  }
}

// Why does it only work if I add render to the Components?
// Otherwise the text is written at the top of the page and overlaps the search box.

class InfoAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'blue';
  }

  render() {
    return (
      <div className="InfoAlert">
        <p style={this.getStyle()}>{this.props.text}</p>
      </div>
    );
  }
}

class ErrorAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'red';
  }
  render() {
    return (
      <div className="ErrorAlert">
        <p style={this.getStyle()}>{this.props.text}</p>
      </div>
    );
  }
}

class WarningAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = '#FF6600';
  }
  render() {
    return (
      <div className="WarningAlert">
        <p style={this.getStyle()}>{this.props.text}</p>
      </div>
    );
  }
}

export { InfoAlert, ErrorAlert, WarningAlert };
