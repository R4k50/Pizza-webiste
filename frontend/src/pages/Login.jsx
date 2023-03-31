import './styles/Login.scss';
import Form from '../components/Form';
import Input from '../components/Input';

const Login = () => {
  const handleSubmit = e => {
    e.preventDefault();
    console.log('cock');
  }

  return (
    <div className="Login">
      <Form
        title='LOGIN TO YOUR ACCOUNT'
        accept="log in"
        acceptRedirect="/login"
        deny='sign up'
        denyRedirect="/signup"
        onSubmit={handleSubmit}
      >
        <Input label='e-mail' type='email' required/>
        <Input label='password' type='password' required/>
      </Form>
    </div>
  );
}

export default Login;