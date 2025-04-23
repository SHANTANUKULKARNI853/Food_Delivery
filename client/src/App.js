// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import RestaurantDetail from './components/RestaurantDetail';
import DiningRestaurantDetail from './components/DiningRestaurantDetail';
import NightRestaurantDetail from './components/NightRestaurantDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserProfile from './components/UserProfile';
import TrackOrder from './components/TrackOrder';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurant/:id" element={<RestaurantDetail />} />
        <Route path="/dining-restaurant/:id" element={<DiningRestaurantDetail />} />
        <Route path="/night-restaurant/:id" element={<NightRestaurantDetail />} />    
            <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/trackorder" element={<TrackOrder />} />



      </Routes>
    </Router>
  );
};

export default App;
