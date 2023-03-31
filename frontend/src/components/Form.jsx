import './styles/Form.scss';
import { forwardRef } from 'react';
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
    denyRedirect
  } = props;

  return (
    <div className="Form" ref={ref}>
      <h2>{title || 'Form'}</h2>
      <form onSubmit={onSubmit}>
        <div className="inputs">
          {children}
        </div>
        <div className="actions">
          <ButtonAction to={denyRedirect || '/'} appearance='alt'>{deny || "deny"}</ButtonAction>
          <ButtonAction type='submit'>{accept || "accept"}</ButtonAction>
        </div>
      </form>
      <img className='pizza' src={pizza2} alt="pizza" />
      <img className='pizza' src={pizza3} alt="pizza" />
      <img className='pizza' src={pizza4} alt="pizza" />
    </div>
  );
});

export default Form;