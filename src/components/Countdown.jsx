import React from 'react';

const POLLING_INTERVAL = 100;

export default class Countdown extends React.Component {
  componentDidMount() {
    this.interval = window.setInterval(() => this.forceUpdate(), POLLING_INTERVAL);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    const remaining = Math.floor((this.props.finish - Date.now()) / 1000);

    let message;
    if (remaining < 1) {
      message = 'Less than 1 second left';
    } else if (remaining < 2) {
      message = 'Almost 1 second left';
    } else {
      message = `${remaining} seconds left`;
    }

    return (
      <React.Fragment>
        {message}
      </React.Fragment>
    );
  }
}
