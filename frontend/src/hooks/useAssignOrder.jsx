import { useState } from 'react';
import useAuthContext from './useAuthContext';
import axios from 'axios';

export default function useAssignOrder() {
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { userData } = useAuthContext();

  const objectToArray = object => Object.values(object).flat();

  const assign = async (id) => {
    setIsLoading(() => true);
    setErrors(null);

    axios.patch(`/order/${id}/assign`, id, {
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${userData?.token}`
      }
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

  return { assign, isLoading, errors }
}