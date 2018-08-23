import React from 'react';

export default function VersionsJSONDisplay(props) {
  return (
    <div className="versions-display versions-json-display">
      <div className="versions-display__header">Versions Display: JSON</div>
      <pre>
        {JSON.stringify(props.versions, null, 2)}
      </pre>
    </div>
  );
}
