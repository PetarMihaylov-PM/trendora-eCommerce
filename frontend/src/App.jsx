import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Collection from './pages/Collection';
import Login from './pages/Login';
import Orders from './pages/Orders';
import PlaceOrder from './pages/PlaceOrder';
import Cart from './pages/Cart';
import Product from './pages/Product';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import Verify from './pages/Verify';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';



function App() {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
      <Navbar/>
      <SearchBar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/collection' element={<Collection />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/contact' element={<Contact />}/>
        <Route path='/product/:productId' element={<Product />}/>
        <Route path='/cart' element={<Cart />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/placeorder' element={<PlaceOrder />}/>
        <Route path='/orders' element={<Orders />}/>
        <Route path='/verify' element={<Verify />}/>
        <Route path='/profile' element={<Profile />}/>
        <Route path='/changepassword' element={<ChangePassword />}/>
      </Routes>
      <Footer />
    </div>
  )
}

export default App