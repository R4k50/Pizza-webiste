import { useEffect, useState } from 'react';
import useAuthContext from '../hooks/useAuthContext';
import axios from 'axios';

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { userData } = useAuthContext();

  const objectToArray = object => Object.values(object).flat();

  const refetch = () => {
    setIsLoading(() => true);
    setErrors(null);

    axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${userData?.token}`
      },
      timeout: 5000
    })
      .then((response) => {
        setData(() => response.data);
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

  useEffect(refetch, [url, userData]);

  return { data, isLoading, errors, refetch }
}