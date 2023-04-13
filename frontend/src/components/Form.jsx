import './styles/Form.scss';
import { forwardRef, useEffect, useState } from 'react';
import { animated, useTransition } from 'react-spring';
import ButtonAction from './ButtonAction';
import pizza2 from '../images/Pizza2.png';
import pizza3 from '../images/Pizza3.png';
import pizza4 from '../images/Pizza4.png';

const Form = forwardRef((props, ref) => {
  const {
    children,
    onSubmit,
    title,
    accept,
    deny,
    denyredirect,
    errors,
    isloading
  } = props;

  const [formErrors, setFormErrors] = useState(errors);

  useEffect(() => {
    setFormErrors(() => errors);
  }, [errors])


  const transition = useTransition(formErrors, {
    from: {
      opacity: 0,
      x: 0,
      y: 100
    },
    enter: {
      opacity: 1,
      x: 0,
      y: 0
    },
    leave: {
      opacity: 0,
      y: 0,
      x: 100
    },
    onRest: async () => {
      await formErrors && setTimeout(() => {
        setFormErrors(() => formErrors.filter(() => false));
      }, 5000);
    },
    trail: 100,
  });

  return (
    <animated.div {...props} className={`Form ${props.className || ''}`} onSubmit={null} title={null} ref={ref}>
      <div className="container">
        <h2>{title || 'Form'}</h2>
        <form onSubmit={onSubmit}>
          <div className="inputs">
            {children}
          </div>
          <div className="actions">
            <ButtonAction type='submit' disabled={isloading}>{accept || "accept"}</ButtonAction>
            <ButtonAction to={denyredirect || '/'} appearance='alt'>{deny || "deny"}</ButtonAction>
          </div>
          {formErrors && <ol className="errors">
              {transition((style, error, key) => (
                error && <animated.li className="error" key={key} style={style}>{error}</animated.li>
              ))}
            </ol>
          }
        </form>
      </div>
      <img className='pizza' src={pizza2} alt="pizza" />
      <img className='pizza' src={pizza3} alt="pizza" />
      <img className='pizza' src={pizza4} alt="pizza" />
    </animated.div>
  );
});

export default Form;