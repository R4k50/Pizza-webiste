import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthContext from './useAuthContext';
import axios from 'axios';

export default function useRegister() {
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const objectToArray = object => Object.values(object).flat();

  const register = async (user) => {
    setIsLoading(() => true);
    setErrors(null);

    axios.post('/register', user)
      .then(({ data }) => {
        localStorage.setItem('user', JSON.stringify(data));
        dispatch({ type: 'REGISTER', payload: data });

        setIsLoading(() => false);
        navigate('/');
      })
      .catch(({ response }) => {
        const errors = response.data.errors
        ? objectToArray(response.data.errors)
        : [response.data.message];

        setIsLoading(() => false);
        setErrors(errors);
      });
  }

  return { register, isLoading, errors }
}