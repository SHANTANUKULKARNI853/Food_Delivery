// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import RestaurantDetail from './components/RestaurantDetail';
import DiningRestaurantDetail from './components/DiningRestaurantDetail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurant/:id" element={<RestaurantDetail />} />
        <Route path="/dining-restaurant/:id" element={<DiningRestaurantDetail />} />
      </Routes>
    </Router>
  );
};

export default App;