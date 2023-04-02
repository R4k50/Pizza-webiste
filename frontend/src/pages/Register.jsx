import './styles/Register.scss';
import Form from '../components/Form';
import Input from '../components/Input';
import useRegister from '../hooks/useRegister';
import useForm from '../hooks/useForm';

const Register = () => {
  const { data: user, handleChange } = useForm();
  const { register, errors, isLoading } = useRegister();

  const handleSubmit = async e => {
    e.preventDefault();
    await register(user);
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
        errors={errors}
        isLoading={isLoading}
      >
        <Input onChange={handleChange} errors={errors} name='name' label='name'/>
        <Input onChange={handleChange} errors={errors} name='surname' label='surname' />
        <Input onChange={handleChange} errors={errors} name='email' label='e-mail' />
        <Input onChange={handleChange} errors={errors} name='password' label='password' type='password' />
        <Input onChange={handleChange} errors={errors} name='password_confirmation' label='confirm password' type='password' />
      </Form>
    </div>
  );
}

export default Register;