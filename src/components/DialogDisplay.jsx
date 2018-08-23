import React from 'react';

import { DialogConsumer } from '../contexts/DialogContext';
import Countdown from '../components/Countdown';

function DialogDisplayInner(props) {
  const dialogs = Object.values(props.dialog.dialogs);

  return (
    <div className="dialog-item-list">
      <h2 className="dialog-item-list__header">Notifications</h2>
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

export default function DialogDisplay() {
  return (
    <DialogConsumer>
      {dialog => <DialogDisplayInner dialog={dialog} />}
    </DialogConsumer>
  );
}
