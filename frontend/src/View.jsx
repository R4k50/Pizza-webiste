import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import useAuthContext from './hooks/useAuthContext';
import ScrollToTop from "./components/ScrollToTop";

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Orders from './pages/Orders';


const View = () => {
  const { userData } = useAuthContext();

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
            element={ userData ? <Navigate to='/' /> : <Login /> }
          />
          <Route
            path="/register"
            element={ userData ? <Navigate to='/' /> : <Register /> }
          />
          <Route
            path="/menu"
            element={<Menu />}
          />
          <Route
            path="/cart"
            element={ !userData ? <Navigate to='/login' /> : <Cart /> }
          />
          <Route
            path="/orders"
            element={ !userData ? <Navigate to='/login' /> : <Orders /> }
          />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default View;