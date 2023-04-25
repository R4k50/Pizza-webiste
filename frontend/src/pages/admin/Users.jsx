import './styles/Users.scss';
import useFetch from '../../hooks/useFetch';
import useDelete from '../../hooks/useDelete';
import { Icon } from '@iconify/react';
import { useEffect } from 'react';
import Form from '../../components/Form';
import Input from '../../components/Input';
import useForm from '../../hooks/useForm';
import usePost from '../../hooks/usePost';
import ButtonAction from '../../components/ButtonAction';

const Users = () => {
  const { data: users, isLoading, errors, refetch } = useFetch('/users');
  const { deleteById } = useDelete('/user');
  const { post, isLoading: isLoadingNew, errors: errorsNew } = usePost('/user');
  const { data: user, handleChange } = useForm();

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 20000);

    return () => clearInterval(interval);
  }, [refetch]);

  const handleDelete = id => {
    deleteById(id);
    refetch();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await post(user);
    console.log(user);
    refetch();
  }

  return (
    <div className="Users">
      <Form
        title={'CREATE A NEW USER'}
        accept="create"
        deny="return to dashboard"
        denyredirect='/admin/dashboard'
        isloading={isLoadingNew ? 1 : 0}
        onSubmit={handleSubmit}
        errors={errors}
      >
        <Input
          label='e-mail'
          name='email'
          onChange={handleChange}
        />
        <Input
          label='name'
          name='name'
          onChange={handleChange}
        />
        <Input
          label='surname'
          name='surname'
          onChange={handleChange}
        />
        <Input
          label='password'
          name='password'
          type='password'
          onChange={handleChange}
        />
        <Input
          onChange={handleChange}
          errors={errors}
          name='password_confirmation'
          label='confirm password'
          type='password'
        />
        <div className='checkbox'>
          <label htmlFor="delivery">delivery</label>
          <input
            type="checkbox"
            name="isDeliveryMan"
            id="delivery"
            onChange={handleChange}
          />
        </div>
        <div className='checkbox'>
          <label htmlFor="admin">admin</label>
          <input
            type="checkbox"
            name="isAdmin"
            id="admin"
            onChange={handleChange}
          />
        </div>
      </Form>
      <h2>USERS</h2>
      {isLoading && <div>LOADING <Icon icon='eos-icons:bubble-loading' /></div>}
      {users?.length > 0 && <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Surname</th>
            <th>E-mail</th>
            <th>Admin</th>
            <th>Delivery</th>
          </tr>
        </thead>
        <tbody>
          {users?.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.surname}</td>
              <td>{user.email}</td>
              <td>{user.isAdmin ? 'yes' : 'no'}</td>
              <td>{user.isDeliveryMan ? 'yes' : 'no'}</td>
              <td><ButtonAction appearance='alt' to={`/admin/edit-user/${user.id}`}>EDIT</ButtonAction></td>
              <td><ButtonAction onClick={() => handleDelete(user.id)}>DELETE</ButtonAction></td>
            </tr>
          ))}
        </tbody>
      </table>}
      {users?.length == 0 && !isLoading && <div>No users</div>}
      {errors && !users && <div className="errors">{errors}</div>}
    </div>
  );
}

export default Users;