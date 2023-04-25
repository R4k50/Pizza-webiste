import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import useAuthContext from './useAuthContext';
import axios from 'axios';

export default function usePatch(url) {
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { userData } = useAuthContext();
  const navigate = useNavigate();

  const objectToArray = object => Object.values(object).flat();

  const patchById = async (data, id, redirect = '/') => {
    setIsLoading(() => true);
    setErrors(null);

    axios.patch(`${url}/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${userData?.token}`
      },
      timeout: 5000
    })
      .then(() => {
        navigate(redirect);
      })
      .catch(({ response }) => {
        if (!response) {
          setErrors(() => ['Network Error']);
          return;
        }

        if (response.status === 422) {
          const errors = response.data.errors
            ? objectToArray(response.data.errors)
            : [response.data.message];

          setErrors(errors);
          return;
        }

        setErrors(() => [response.statusText]);
      })
      .finally(() => {
        setIsLoading(() => false);
      });
  }

  return { patchById, isLoading, errors }
}