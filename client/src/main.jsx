import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import theme from './configs/theme.configs.js';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <CssVarsProvider theme={theme}>
        <App />
      </CssVarsProvider>
    </Provider>
  </React.StrictMode>
);
