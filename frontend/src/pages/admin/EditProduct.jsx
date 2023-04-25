import './styles/EditProduct.scss';
import { useParams } from 'react-router-dom'
import Form from '../../components/Form';
import Input from '../../components/Input';
import useForm from '../../hooks/useForm';
import useFetch from '../../hooks/useFetch';
import usePatch from '../../hooks/usePatch';

const EditProduct = () => {
  const { id } = useParams();
  const { data: oldProduct, isLoading, errors } = useFetch(`/product/${id}`);
  const { data: product, handleChange } = useForm();
  const { patchById, errors: patchErrors } = usePatch('/product');

  const handleSubmit = async (e) => {
    e.preventDefault();

    patchById(product, id, '/admin/products');
  }



  return (
    <div className="EditProduct">
      <Form
        title={`UPDATE PRODUCT ${id}`}
        accept="update"
        deny='back to products'
        denyredirect="/admin/products"
        onSubmit={handleSubmit}
        errors={patchErrors}
        isloading={isLoading ? 1 : 0}
      >
        <Input
          label='name'
          name='name'
          value={oldProduct?.name}
          onChange={handleChange}
        />
        <Input
          label='ingredients'
          name='ingredients'
          value={oldProduct?.ingredients}
          onChange={handleChange}
        />
        <Input
          label='price'
          name='price'
          value={oldProduct?.price}
          onChange={handleChange}
        />
      </Form>
    </div>
  );
}

export default EditProduct;