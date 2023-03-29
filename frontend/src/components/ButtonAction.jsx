import './styles/ButtonAction.scss';
import { Link } from 'react-router-dom';
import AnimatedButton from './wrappers/AnimatedButton';

const ButtonAction = (props) => {
  const { onClick, to, type, children } = props;

  const handleClick = () => {
    if (onClick)
      onClick();
  }

  return (
    <AnimatedButton {...props} className={`ButtonAction ${type === 'alt' ? 'Alt' : ''}`} onClick={handleClick}>
      <Link to={to}>{children}</Link>
    </AnimatedButton>
  );
}

export default ButtonAction;