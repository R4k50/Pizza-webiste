import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthContext from './useAuthContext';
import useCartContext from './useCartContext';
import axios from 'axios';


export default function useOrder() {
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { userData } = useAuthContext();
  const { dispatch: cartDispatch } = useCartContext();
  const navigate = useNavigate();

  const objectToArray = object => Object.values(object).flat();

  const order = async (orderData) => {
    setIsLoading(() => true);
    setErrors(null);

    axios.post('/order', orderData, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${userData?.token}`
      },
      timeout: 5000
    })
      .then(() => {
        cartDispatch({ type: 'DESTROY' });
        navigate('/orders');
      })
      .catch(({ response }) => {

        if (!response) {
          setErrors(() => ['Network Error']);
          return;
        }

        if (!response?.data?.errors) {
          setErrors(() => [response.statusText]);
          return;
        }

        const errors = response.data.errors
          ? objectToArray(response.data.errors)
          : [response.data.message];

        setErrors(errors);
      })
      .finally(() => {
        setIsLoading(() => false);
      });
  }

  return { order, isLoading, errors }
}