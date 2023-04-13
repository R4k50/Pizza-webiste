import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useFetch(url, token = null) {
  const [data, setData] = useState(null);
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const objectToArray = object => Object.values(object).flat();

  const refetch = async () => {
    useEffect(() => {
      setIsLoading(() => true);
      setErrors(null);

      const config = !token
        ? null
        : {headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        }};

      axios.get(url, { timeout: 5000, ...config })
        .then((response) => {
          setData(() => response.data);
          setIsLoading(() => false);
        })
        .catch(({ response }) => {
          setIsLoading(() => false);

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
        });
    }, [url]);
  }

  refetch();

  return { data, isLoading, errors, refetch }
}