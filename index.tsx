import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

const container = document.getElementById('root');

if (!container) {
  console.error("SuCooked Error: Mount target '#root' not found.");
} else {
  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("SuCooked System: Interface initialized successfully.");
  } catch (err) {
    console.error("SuCooked Error: Initialization failed.", err);
    throw err;
  }
}