import React from 'react';
import ReactDOM from 'react-dom/client';
<<<<<<< HEAD
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
=======
>>>>>>> 2013d9c2c3592bdb0dc6c432734c88095d88fe62
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
<<<<<<< HEAD
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
=======
    <App />
>>>>>>> 2013d9c2c3592bdb0dc6c432734c88095d88fe62
  </React.StrictMode>
);