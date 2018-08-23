import React from 'react';

import { DialogProvider } from './contexts/DialogContext';
import VersionsPage from './pages/VersionsPage';
import DialogDisplay from './components/DialogDisplay';

import './App.css';


function App() {
  return (
    <div className="App">
      <DialogProvider>
        <VersionsPage />
        <DialogDisplay />
      </DialogProvider>
    </div>
  );
}

export default App;
