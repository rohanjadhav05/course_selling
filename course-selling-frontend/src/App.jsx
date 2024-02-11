import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './component/Navbar';
import Home from './component/Home';
import FooterComponent from './component/FooterComponent';
import Signup from './component/Signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
        <FooterComponent />
      </BrowserRouter>
      <ToastContainer position='top-right' theme='colored' />
    </>
  );
}

export default App;
