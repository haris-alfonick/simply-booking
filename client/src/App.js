import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import Form from './component/pages/Form';

import { About, Contact, Booking, ClientDashboard, Homepage, Login, MainDashboard, PageNotFound, Service, SignUp, PrivateRoute } from './component';
import AuthWatcher from './component/utils/AuthWatcher';


const App = () => {

  return (
    <>

    <Router>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/form' element={<Form />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />

          <Route element={<PrivateRoute />}>
            <Route path="/booking" element={<Booking />} />
            <Route path="/service/:id" element={<Service />} />
          </Route>

          <Route element={<PrivateRoute allowedRole={0} />}>
            <Route path="/clientdashboard" element={<ClientDashboard />} />
          </Route>

          <Route element={<PrivateRoute allowedRole={1} />}>
            <Route path="/maindashboard" element={<MainDashboard />} />
          </Route>
          <Route path='*' element={<PageNotFound />} />

        </Routes>
      </Router>
      <ToastContainer position="top-right" autoClose={3000} />
      {/* <Router>
        <AuthWatcher />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/form' element={<Form />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />

          <Route element={<PrivateRoute />}>
            <Route path="/booking" element={<Booking />} />
            <Route path="/service/:id" element={<Service />} />
            <Route path="/clientdashboard" element={<ClientDashboard />} />
            <Route path="/maindashboard" element={<MainDashboard />} />
          </Route>
          <Route path='*' element={<PageNotFound />} />

        </Routes>
      </Router>
      <ToastContainer position="top-right" autoClose={3000} /> */}
    </>
  );
};

export default App;
