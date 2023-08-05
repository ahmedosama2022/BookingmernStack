import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SearchContextProvider } from "../src/components/Context/SearchContext";
import { AuthContextProvider } from "../src/components/Context/AuthContext";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <SearchContextProvider>
     <AuthContextProvider>
        <App />
      </AuthContextProvider>
      </SearchContextProvider>
  </React.StrictMode>
);
