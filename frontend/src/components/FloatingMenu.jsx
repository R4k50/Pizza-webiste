import { Icon } from '@iconify/react';
import { animated, useTransition } from 'react-spring';

const FloatingMenu = ({children, visibility}) => {
  const transitions = useTransition(visibility, {
    from: { translateY: '-100%' },
    enter: { translateY: '0%' },
    leave: { translateY: '-100%' },
    config: {
      duration: 300
    }
  })

  return transitions((style, item) => (
    item && <animated.nav style={style}>
      <div  className='FloatingMenu webnav'>
        {children}
        <div className='socials'>
          <a href="." className='facebook'>
            <Icon icon="ri:facebook-fill" />
          </a>
          <a href="." className='twitter'>
            <Icon icon="ri:twitter-fill" />
          </a>
          <a href="." className='instagram'>
            <Icon icon="ri:instagram-fill" />
          </a>
          <a href="." className='tiktok'>
            <Icon icon="ic:baseline-tiktok" />
          </a>
        </div>
      </div>
    </animated.nav>
  ))
}

export default FloatingMenu;