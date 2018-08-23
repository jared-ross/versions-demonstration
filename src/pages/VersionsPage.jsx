import React from 'react';

import { DialogConsumer } from '../contexts/DialogContext';
import VersionsTableDisplay from '../components/VersionsTableDisplay';
// Unused Alternate Display
// import VersionsJSONDisplay from '../components/VersionsJSONDisplay';

import api from '../lib/api';


const DIALOG_TIME = 5000;
const REFRESH_THROTTLE_PERIOD = 5000;

class VersionsPageInner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      versions: {},
      isLoading: false,
      isRefreshDisabled: false,
    };

    this.onRefresh = this.onRefresh.bind(this);
  }

  componentDidMount() {
    this.load();
  }

  onRefresh() {
    // This isn't completely safe, but it will do well here.

    if (this.state.isRefreshDisabled) {
      return;
    }

    this.setState({ isRefreshDisabled: true });

    this.load();

    window.setTimeout(
      () => this.setState({ isRefreshDisabled: false }),
      REFRESH_THROTTLE_PERIOD,
    );
  }

  async load() {
    if (this.state.isLoading) {
      return;
    }

    this.setState({ isLoading: true }, async () => {
      const loadingDialogId = this.props.dialog.addDialog(
        <span className="loading">Loading version data.</span>,
        DIALOG_TIME,
      );

      try {
        const versions = await api.getVersions();

        this.setState(
          { versions },
          () => this.props.dialog.addDialog(
            <span className="success">Successfully loaded version data.</span>,
            DIALOG_TIME,
          ),
        );
      } catch (e) {
        this.props.dialog.addDialog(
          <span className="error">There was an error loading the version data.</span>,
          DIALOG_TIME,
        );
      }

      this.props.dialog.rmDialog(loadingDialogId);
      this.setState({ isLoading: false });
    });
  }

  render() {
    return (
      <div className="versions-page">

        <h2 className="versions-page__header">Meercat App: <br /> Server Version Correspondance</h2>
        <VersionsTableDisplay
          versions={this.state.versions}
          isLoading={this.state.isLoading}
          />
        <button
          className="versions-page__refresh-btn"
          onClick={this.onRefresh}
          disabled={this.state.isRefreshDisabled}
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
