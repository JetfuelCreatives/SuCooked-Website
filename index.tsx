import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Inform index.html that the gourmet experience is ready
// Fix: Access custom property on window using type assertion to any to satisfy TypeScript (Line 19-20)
if ((window as any).hideAppLoader) {
  (window as any).hideAppLoader();
}