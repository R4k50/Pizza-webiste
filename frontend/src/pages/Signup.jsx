import './styles/Signup.scss';
import Form from '../components/Form';
import Input from '../components/Input';

const Signup = () => {
  const handleSubmit = e => {
    e.preventDefault();
    console.log('cock');
  }

  return (
    <div className="Signup">
      <Form
        title='CREATE A NEW ACCOUNT'
        accept="register"
        acceptRedirect="/signup"
        deny='log in'
        denyRedirect="/login"
        onSubmit={handleSubmit}
      >
        <div className="subsection">
          <Input label='name' required/>
          <Input label='surname' required/>
          <Input label='e-mail' type='email' required/>
          <Input label='password' type='password' required/>
          <Input label='confirm password' type='password' required/>
        </div>
        <div className="subsection">
          <Input label='address' required/>
          <Input label='city' required/>
          <Input label='postal code' required/>
        </div>
      </Form>
    </div>
  );
}

export default Signup;