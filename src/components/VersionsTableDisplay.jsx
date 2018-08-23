import React from 'react';

export default function VersionsTableDisplay(props) {
  return (
    <div className="versions-display versions-table-display">
      <div className="versions-display__header">Versions Display: Table</div>
      <table>
        <thead>
          <tr>
            <th> Versions Number </th>
            <th> From </th>
            <th> To </th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(props.versions).map(([version, { from, to }]) => (
            <tr>
              <td> {version} </td>
              <td> {from} </td>
              <td> {to} </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
