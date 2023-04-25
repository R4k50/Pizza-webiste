import { useState } from 'react';
import useAuthContext from './useAuthContext';
import axios from 'axios';

export default function useDelete(url) {
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { userData } = useAuthContext();

  const objectToArray = object => Object.values(object).flat();

  const deleteById = async (id, message) => {
    setIsLoading(() => true);
    setErrors(null);

    if (!confirm((message ?? `Please confirm that you want to delete this item`) + ` (id: ${id})`))
      return setIsLoading(() => false);

    axios.delete(`${url}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${userData?.token}`
      },
      timeout: 5000
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

  return { deleteById, isLoading, errors }
}