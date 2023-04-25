import { useState } from 'react';
import useAuthContext from './useAuthContext';
import axios from 'axios';


export default function usePost(path) {
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { userData } = useAuthContext();

  const objectToArray = object => Object.values(object).flat();

  const post = async (data) => {
    setIsLoading(() => true);
    setErrors(null);

    axios.post(path, data, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${userData?.token}`
      },
      timeout: 5000
    })
      .catch(({ response }) => {

        console.log(response);

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

  return { post, isLoading, errors }
}