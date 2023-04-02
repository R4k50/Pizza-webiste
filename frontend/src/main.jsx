import './main.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthContextProvider } from './context/AuthContext';
import axios from 'axios';
import View from './View';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <View />
    </AuthContextProvider>
  </React.StrictMode>,
);
