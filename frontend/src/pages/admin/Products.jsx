import './styles/Products.scss';
import useFetch from '../../hooks/useFetch';
import useDelete from '../../hooks/useDelete';
import { Icon } from '@iconify/react';
import { useEffect } from 'react';
import Form from '../../components/Form';
import Input from '../../components/Input';
import useForm from '../../hooks/useForm';
import usePost from '../../hooks/usePost';
import ButtonAction from '../../components/ButtonAction';

const Products = () => {
  const { data: products, isLoading, errors, refetch } = useFetch('/products');
  const { deleteById } = useDelete('/product');
  const { post, isLoading: isLoadingNew, errors: errorsNew } = usePost('/product');
  const { data: product, handleChange } = useForm();

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
    await post({...product, img: 'pizza1.png'});
    refetch();
  }


  return (
    <div className="Products">
      <Form
        title={'CREATE A NEW PRODUCT'}
        accept="create"
        deny="return to dashboard"
        denyredirect='/admin/dashboard'
        isloading={isLoadingNew ? 1 : 0}
        onSubmit={handleSubmit}
        errors={errors}
      >
        <Input
          label='name'
          name='name'
          onChange={handleChange}
        />
        <Input
          label='ingredients'
          name='ingredients'
          onChange={handleChange}
        />
        <Input
          label='price'
          name='price'
          onChange={handleChange}
        />
      </Form>
      <h2>PRODUCTS</h2>
      {isLoading && <div>LOADING <Icon icon='eos-icons:bubble-loading' /></div>}
      {products?.length > 0 && <table>
        <thead>
        <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Ingredients</th>
            <th>Price</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {products?.map(product => (
            <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.ingredients}</td>
            <td>${product.price}</td>
            <td>{`${import.meta.env.VITE_API_BASE_URL}storage/images/${product.img}`}</td>
            <td><ButtonAction appearance='alt' to={`/admin/edit-product/${product.id}`}>EDIT</ButtonAction></td>
            <td><ButtonAction onClick={() => handleDelete(product.id)}>DELETE</ButtonAction></td>
          </tr>
          ))}
        </tbody>
      </table>}
      {products?.length == 0 && !isLoading && <div>No products</div>}
      {errors && !products && <div className="errors">{errors}</div>}
    </div>
  );
}

export default Products;