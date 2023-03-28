import './styles/Navbar.scss';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="Navbar">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </nav>
    </header>
  );
}

export default Navbar;