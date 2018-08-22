import React from 'react';

import { DialogProvider, DialogConsumer } from './DialogProvider';

import './App.css';

class DialogCreateInner extends React.Component {
  componentDidMount() {
    this.props.dialog.addDialog(this.props.content, this.props.timeout);
  }

  render() {
    return null;
  }
}

function DialogCreate(props) {
  console.log(props);
  return (
    <DialogConsumer>
      {dialog => <DialogCreateInner dialog={dialog} content={props.children} timeout={props.timeout} /> }
    </DialogConsumer>
  );
}

const INTERVAL_POLLING_TIME = 100;
class Countdown extends React.Component {
  componentDidMount() {
    this.interval = window.setInterval(() => this.forceUpdate(), INTERVAL_POLLING_TIME);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    const remaining = Math.floor((this.props.finish - Date.now()) / 1000);

    return (
      <React.Fragment>
        {remaining < 1 ? 'Less than 1 second left' : `${remaining} seconds left`}
      </React.Fragment>
    );
  }
}

function DialogDisplayInner(props) {
  const dialogs = Object.values(props.dialog.dialogs);

  return (
    <div className="dialog-item-list">
      {dialogs.map(({ id, content, startTime, timeout }) => (
        <div className="dialog-item" key={id}>
          <div className="dialog-item__content">
            {content}
          </div>
          <div className="dialog-item__countdown">
            <Countdown finish={startTime + timeout} />
          </div>
          <button
            className="dialog-item__close"
            onClick={() => props.dialog.rmDialog(id)}>
            close
          </button>
        </div>
      ))}
    </div>
  );
}

function DialogDisplay() {
  return (
    <DialogConsumer>
      {dialog => <DialogDisplayInner dialog={dialog} />}
    </DialogConsumer>
  );
}

function App() {
  return (
    <div className="App">
      <DialogProvider>
        Dialog Provider Sandbox:
        <DialogDisplay />
        <DialogCreate timeout={2000}><div>Dialog 1</div></DialogCreate>
        <DialogCreate timeout={4000}><div>Dialog 2</div></DialogCreate>
        <DialogCreate timeout={6000}><div>Dialog 3</div></DialogCreate>
        <DialogCreate timeout={8000}><div>Dialog 4</div></DialogCreate>
        <DialogCreate timeout={10000}><div>Dialog 5</div></DialogCreate>
      </DialogProvider>
    </div>
  );
}

export default App;
