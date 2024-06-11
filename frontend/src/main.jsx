import React, { useState, createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Create the context
export const Context = createContext();

const AppWrapper = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <Context.Provider value={{ isAuthorized, setIsAuthorized, user, setUser }}>
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);