import React from 'react';

export default function VersionsJSONDisplay(props) {
  return (
    <div className="versions-json-display">
      <div className="versions-display__header">JSON Versions Display</div>
      <pre>
        {JSON.stringify(props.versions, null, 2)}
      </pre>
    </div>
  );
}
