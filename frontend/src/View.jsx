import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from './components/ProtectedRoute';
import ProtectedUnverifiedRoute from './components/ProtectedUnverifiedRoute';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
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
            element={
              <ProtectedUnverifiedRoute>
                <Login />
              </ProtectedUnverifiedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedUnverifiedRoute>
                <Register />
              </ProtectedUnverifiedRoute>
            }
          />
          <Route
            path="/menu"
            element={<Menu />}
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute to='/login'>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute to='/login'>
                <Orders />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default View;