import React from 'react';
import {Routes, Route} from 'react-router-dom';
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import Home from './pages/home/Home';
import Coin from './pages/coin/Coin';
import Coins from './pages/coins/Coins';
import CoinsSignedOut from './pages/coins/CoinsSignedOut';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Profile from './pages/profile/Profile';
import ForgotPassword from './pages/forgot-password/ForgotPassword';
import PrivateRoute from './context/PrivateRoute';
import {useAuth} from './context/AuthContext'
import About from './pages/about/About';
import Careers from './pages/careers/Careers';
import FAQ from './pages/faq/FAQ';
import Contact from './pages/contact/Contact';

Sentry.init({
  dsn: "https://565220893610483caa58d47b39fa0e9d@o4504024449351680.ingest.sentry.io/4504024450990081",
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

function App() {
  const user = useAuth();
  return (
    <>
      <Header />
      <div className="app">
        <div className='body'>
          <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/coins' element={user.currentUser? <Coins /> : <CoinsSignedOut/>} />
              <Route path='/coins/:id' element={<Coin />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
              <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path='/about' element={<About />} />
              <Route path='/careers' element={<Careers/>} />
              <Route path='/faq' element={<FAQ/>} />
              <Route path='/contact' element={<Contact/>} />
          </Routes>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
