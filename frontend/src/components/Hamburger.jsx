import { useState } from 'react';
import { animated, useSpring } from 'react-spring';
import './styles/Hamburger.scss';

const Hamburger = ({menuVisibility}) => {
  const [duration] = useState(150);

  const mainAnimation = useSpring({
    to: {
      rotate: menuVisibility ? '45deg': '0deg',
      scale: menuVisibility ? 1.1 : 1
    },
    config: {
      duration
    }
  });

  const topLineAnimation = useSpring({
    to: {
      translateY: menuVisibility ? '10px': '0',
      rotate: menuVisibility ? '90deg': '0deg',
      scale: menuVisibility ? 1.1 : 1
     },
     config: {
      duration
    }
  });

  const bottomLineAnimation = useSpring({
    to: {
      translateY: menuVisibility ? '-10px': '0',
      scale: menuVisibility ? 1.1 : 1
    },
    config: {
      duration
    }
  });

  return (
    <animated.div style={mainAnimation} className='Hamburger'>
      <animated.div style={topLineAnimation} className='line'></animated.div>
      <div className='line'></div>
      <animated.div style={bottomLineAnimation} className='line'></animated.div>
    </animated.div>
  );
}

export default Hamburger;