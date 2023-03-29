import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from "./components/ScrollToTop";

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Orders from './pages/Orders';


const View = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/signup"
            element={<Signup />}
          />
          <Route
            path="/menu"
            element={<Menu />}
          />
          <Route
            path="/cart"
            element={<Cart />}
          />
          <Route
            path="/orders"
            element={<Orders />}
          />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default View;