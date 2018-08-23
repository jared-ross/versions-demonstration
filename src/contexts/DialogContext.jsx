import React from 'react';

const { Provider, Consumer } = React.createContext();

// This is just a queue with elements that timeout and can get removed
class DialogProvider extends React.Component {
  constructor(props) {
    super(props);

    this.nextId = 0;

    this.state = {};

    this.addDialog = this.addDialog.bind(this);
    this.rmDialog = this.rmDialog.bind(this);
  }

  newId() {
    const id = this.nextId;
    this.nextId = this.nextId + 1;

    return id;
  }

  // content: React.Component, timeout: time in ms
  addDialog(content, timeout) {
    const id = this.newId();

    const dialogRecord = {
      id,
      content,
      timeout,
      startTime: Date.now(),
    };

    this.setState(
      state => ({ ...state, [id]: dialogRecord }),
      () => window.setTimeout(() => this.rmDialog(id), timeout),
    );

    return id;
  }

  rmDialog(id) {
    this.setState((state) => {
      delete state[id];
      return state;
    });
  }

  render() {
    return (
      // Ideally to prevent rerenders we would have two contexts, one
      // for controls and one for a list of dialogs
      <Provider value={{ addDialog: this.addDialog, rmDialog: this.rmDialog, dialogs: this.state }}>
        {this.props.children}
      </Provider>
    );
  }
}

export { DialogProvider, Consumer as DialogConsumer };
