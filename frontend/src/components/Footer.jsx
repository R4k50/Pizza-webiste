import './styles/Footer.scss';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Socials from './Socials';

const Footer = () => {
  return (
    <footer>
      <div className="main">
        <h2 className='logo'><span>P</span>IZZA</h2>
        <p>We don't just make pizza, we make memories.</p>
      </div>
      <div className="help">
        <h3>HELP</h3>
        <nav>
          <Link to='/'>home</Link>
          <Link to='/menu'>menu</Link>
          <Link to='/cart'>cart</Link>
          <Link to='/orders'>orders</Link>
          <Link to='/signup'>sign up</Link>
          <Link to='/login'>log in</Link>
        </nav>
      </div>
      <div className="contact">
        <h3>CONTACT</h3>
        <p className="tel info"><Icon icon="icon-park-solid:phone-telephone"/>000-000-000</p>
        <p className="mail info"><Icon icon="material-symbols:mail-outline-rounded"/>pizza@example.com</p>
      </div>
      <div className="socials">
        <h3>SOCIAL MEDIA</h3>
        <Socials />
      </div>
    </footer>
  );
}

export default Footer;