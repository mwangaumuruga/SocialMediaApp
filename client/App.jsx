import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './pages/Header';
import Home from './components/Home';
import About from './components/About';
import Contacts from './components/Contacts';
import Login from './components/Login';
import Footer from './pages/Footer';
import BookingPage from './components/BookingPage';
import Adminpage from './components/Adminpage';
import MyProfile from './components/MyProfile';
import Onboarding from './components/Onboardingpage'

import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Onboarding/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/admin" element={<Adminpage />} />
          <Route path="/profile" element={<MyProfile />} />
         
        </Routes>

        <hr />

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
