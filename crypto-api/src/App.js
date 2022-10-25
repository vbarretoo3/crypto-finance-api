import React from 'react';
import {Routes, Route} from 'react-router-dom';
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import Home from './pages/home/Home';
import Coin from './pages/coin/Coin';
import Coins from './pages/coins/Coins';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Profile from './pages/profile/Profile';
import ForgotPassword from './pages/forgot-password/ForgotPassword';
import PrivateRoute from './context/PrivateRoute';

Sentry.init({
  dsn: "https://565220893610483caa58d47b39fa0e9d@o4504024449351680.ingest.sentry.io/4504024450990081",
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

function App() {
  return (
    <>
      <Header />
      <div className="app">
        <div className='body'>
          <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/coins' element={<Coins />} />
              <Route path='/coins/:id' element={<Coin />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
              <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
          </Routes>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
