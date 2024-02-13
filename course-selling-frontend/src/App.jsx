import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './component/Navbar';
import Home from './component/Home';
import FooterComponent from './component/FooterComponent';
import Signup from './component/Signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { SignIn } from './component/SignIn';
import ForgetPasswordComponent from './component/ForgetPasswordComponent';
import AdminComponent from './component/AdminComponent';
import AddCourseForm from './component/AddCourseForm';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Signup' element={<Signup />} />
          <Route path='/LogIn' element={<SignIn />}/>
          <Route path='/ForgetPassword' element={<ForgetPasswordComponent />}/>
          <Route path='/Admin' element={<AdminComponent />}/>
          <Route path='/AddCourse' element={<AddCourseForm />}/>
          <Route path='/UpdateCourse/:id' element={<AddCourseForm />}/>
        </Routes>
        <FooterComponent />
      </BrowserRouter>
      <ToastContainer position='top-right' theme='colored' />
    </>
  );
}

export default App;
