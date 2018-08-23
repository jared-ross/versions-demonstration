import React from 'react';
import isEmpty from 'lodash.isempty';
import classNames from 'classnames';
import * as compareVersions from 'compare-versions';

function VersionRange(props) {
  // This simplifies some ranges that just work with one version
  const isRange = !(props.from === props.to);
  return (
    <React.Fragment>
      {isRange ? `${props.to} - ${props.from}` : props.to}
    </React.Fragment>
  );
}

function Table(props) {
  // We want the latest versions to be at the top.
  const sortedVersions = props.versions.sort(
    (a, b) => -1 * compareVersions(a.version, b.version),
  );

  return (
      <table className="versions-table-display-table">
        <thead>
          <tr>
            <th className="versions-table-display-table__version"> App Version </th>
            <th className="versions-table-display-table__includes"> Compatible Server Versions </th>
          </tr>
        </thead>
        <tbody>
          {sortedVersions.map(({ version, from, to }) => (
            <tr>
              <td className="versions-table-display-table__version"> {version} </td>
              <td className="versions-table-display-table__server-version-range"> <VersionRange from={from} to={to} /> </td>
            </tr>
          ))}
        </tbody>
      </table>
  );
}

export default function VersionsTableDisplay(props) {
  const classes = classNames({
    'versions-table-display': true,
    'versions-table-display--loading': props.isLoading,
  });

  return (
    <div className={classes}>
      {isEmpty(props.versions) ? <p>No Data Loaded.</p> : <Table versions={props.versions} />}
    </div>
  );
}
