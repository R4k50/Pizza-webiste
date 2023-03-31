import './styles/StaticNavbar.scss';
import { useRef, useState, useEffect, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import AnimatedButton from './wrappers/AnimatedButton';
import Hamburger from './Hamburger';
import FloatingMenu from './FloatingMenu';
import ButtonAction from './ButtonAction';


const StaticNavbar = forwardRef((props, ref) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const btnRef = useRef(null);

  const handleClick = () => {
    setIsMenuVisible(prev => !prev);
  }

  useEffect(() => {
    const handleClickOutside = e => {
        if (btnRef.current && !btnRef.current.contains(e.target))
          setIsMenuVisible(() => false);
    }

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [btnRef]);


  const Links = () => <>
    <div className="pages">
      <Link to="/" className='link'>home</Link>
      <Link to="/menu" className='link'>menu</Link>
      <Link to="/cart" className='link'>cart</Link>
      <Link to="/orders" className='link'>orders</Link>
    </div>
    <div className="auth">
      <ButtonAction to="/signup" appearance='alt' onClick={() => setIsMenuVisible(() => false)}>sign up</ButtonAction>
      <ButtonAction to="/login" onClick={() => setIsMenuVisible(() => false)}>log in</ButtonAction>
    </div>
  </>

  return (
    <>
      <header {...props} ref={ref} className="Navbar webnav">
        <nav>
          <Link to="/" className='logo'><span>P</span>IZZA</Link>
          <Links/>
        </nav>
        <Hamburger onClick={handleClick} ref={btnRef} menuVisibility={isMenuVisible} className='menu'/>
      </header>
      <FloatingMenu visibility={isMenuVisible}>
        <Links />
      </FloatingMenu>
    </>
  );
});

export default StaticNavbar;