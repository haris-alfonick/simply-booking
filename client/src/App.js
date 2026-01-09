import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './component/pages/Homepage';
import Navbar from './component/navbar/Navbar';
import About from './component/pages/About';
import Contact from './component/pages/Contact';
import Service from './component/pages/Service';
import Form from './component/pages/Form';
import Login from './component/pages/Login';
import SignUp from './component/pages/SignUp';
import Booking from './component/pages/Booking';
import ClientDashboard from './component/clientdashboard/ClientDashboard';
import Calander from './component/clientdashboard/Calander';
import Clients from './component/clientdashboard/Clients';
import Jobs from './component/clientdashboard/Jobs';


const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/service' element={<Service />} />
          <Route path='/form' element={<Form />} />


          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/booking' element={<Booking />} />


          {/* client dashboard */}

          <Route path='/clientdashboard' element={<ClientDashboard />} />
          <Route path='/calander' element={<Calander />} />
          <Route path='/client' element={<Clients />} />
          <Route path='/jobs' element={<Jobs />} />

        </Routes>
      </Router>
    </>
  );
};

export default App;
