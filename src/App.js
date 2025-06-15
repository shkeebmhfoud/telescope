import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import OverAllLayout from './Layouts/OverAllLayout';
import AppLayout from './Layouts/AppLayout';
import Teachers from './pages/Teachers';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Bookings from './pages/Bookings';
import Register from './pages/Register';
import Booking from './pages/Booking';

const browserRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<OverAllLayout />}>
      <Route path='/' element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path='/teachers' element={<Teachers />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/bookings' element={<Bookings />} />
        <Route path='/booking/:teacherId' element={<Booking />} />
      </Route>

      <Route path='/login' element={<Login />} />

      <Route path='/register' element={<Register />} />
    </Route>
  )
)

const App = () => {
  return (
    <RouterProvider router={browserRouter} />
  )
}

export default App