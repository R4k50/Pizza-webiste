import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthContext from './useAuthContext';
import axios from 'axios';

export default function useLogin() {
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const objectToArray = object => Object.values(object).flat();

  const login = async (credentials) => {
    setIsLoading(() => true);
    setErrors(null);

    axios.post('/login', credentials)
      .then(({ data }) => {
        localStorage.setItem('user', JSON.stringify(data));
        dispatch({ type: 'LOGIN', payload: data });

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

  return { login, isLoading, errors }
}