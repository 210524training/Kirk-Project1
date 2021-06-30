import React from 'react';
import Navbar from './components/navbar/Navbar';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import AppRoutes from './router/AppRoutes';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <AppRoutes />
      </Router>
    </Provider>
  );
}

export default App;
