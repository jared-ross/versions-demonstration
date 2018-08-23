import React from 'react';

import { DialogConsumer } from '../contexts/DialogContext';
import VersionsJSONDisplay from '../components/VersionsJSONDisplay';

import api from '../lib/api';


const SHORT_DIALOG_TIME = 5000;

class VersionsPageInner extends React.Component {
  constructor(props) {
    super(props);

    this.state = { versions: {}, displayType: 'JSON', isLoading: false };

    this.load = this.load.bind(this);
  }

  componentDidMount() {
    this.load();
  }

  async load() {
    if (this.state.isLoading) {
      return;
    }

    this.setState({ isLoading: true }, async () => {
      const loadingDialogId = this.props.dialog.addDialog(
        <span className="loading">Loading...</span>,
        SHORT_DIALOG_TIME,
      );

      try {
        const data = await api.getVersions();

        this.setState(
          { versions: data.data },
          () => this.props.dialog.addDialog(
            <span className="success">Successfully loaded version data.</span>,
            SHORT_DIALOG_TIME,
          ),
        );
      } catch (e) {
        this.props.dialog.addDialog(
          <span className="error">There was an error loading the version data.</span>,
          SHORT_DIALOG_TIME,
        );
      }

      this.props.dialog.rmDialog(loadingDialogId);
      this.setState({ isLoading: false });
    });
  }

  render() {
    return (
      <div className="versions-page">
        <VersionsJSONDisplay versions={this.state.versions} />
        <button
          className="versions-page__refresh-btn"
          onClick={this.load}
          >
          Refresh
        </button>
      </div>
    );
  }
}

export default function VersionsPage(props) {
  return (
    <DialogConsumer>
      {dialog => <VersionsPageInner dialog={dialog} {...props} />}
    </DialogConsumer>
  );
}
