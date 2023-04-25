import './styles/EditUser.scss';
import { useParams } from 'react-router-dom'
import Form from '../../components/Form';
import Input from '../../components/Input';
import useForm from '../../hooks/useForm';
import useFetch from '../../hooks/useFetch';
import usePatch from '../../hooks/usePatch';

const EditUser = () => {
  const { id } = useParams();
  const { data: oldUser, isLoading, errors } = useFetch(`/user/${id}`);
  const { data: user, handleChange } = useForm();
  const { patchById, errors: patchErrors } = usePatch('/user');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await patchById(user, id, '/admin/users');
  }

  return (
    <div className="EditUser">
      <Form
        title={`UPDATE USER ${id}`}
        accept="update"
        deny='back to users'
        denyredirect="/admin/users"
        onSubmit={handleSubmit}
        errors={patchErrors}
        isloading={isLoading ? 1 : 0}
      >
        <Input
          label='e-mail'
          name='email'
          value={oldUser?.email}
          onChange={handleChange}
        />
        <Input
          label='name'
          name='name'
          value={oldUser?.name}
          onChange={handleChange}
        />
        <Input
          label='surname'
          name='surname'
          value={oldUser?.surname}
          onChange={handleChange}
        />
        <div className='checkbox'>
          <label htmlFor="delivery">delivery</label>
          <input
            type="checkbox"
            name="isDeliveryMan"
            id="delivery"
            onChange={handleChange}
            defaultChecked={oldUser?.isDeliveryMan}
          />
        </div>
        <div className='checkbox'>
          <label htmlFor="admin">admin</label>
          <input
            type="checkbox"
            name="isAdmin"
            id="admin"
            onChange={handleChange}
            defaultChecked={oldUser?.isAdmin}
          />
        </div>
      </Form>
    </div>
  );
}

export default EditUser;