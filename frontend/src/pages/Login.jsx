import './styles/Login.scss';
import Form from '../components/Form';
import Input from '../components/Input';
import useLogin from '../hooks/useLogin';
import useForm from '../hooks/useForm';

const Login = () => {
  const { data: credentials, handleChange } = useForm();
  const { login, errors, isLoading } = useLogin();

  const handleSubmit = async e => {
    e.preventDefault();
    await login(credentials);
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
        errors={errors}
        isLoading={isLoading}
      >
        <Input
          onChange={handleChange}
          label='e-mail'
          name='email'
        />
        <Input
          onChange={handleChange}
          label='password'
          type='password'
          name='password'
        />
      </Form>
    </div>
  );
}

export default Login;