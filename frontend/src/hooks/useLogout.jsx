import { useState } from 'react';
import useAuthContext from './useAuthContext';
import useCartContext from './useCartContext';
import axios from 'axios';

export default function useLogout() {
  const [isLoading, setIsLoading] = useState(false);
  const { userData, dispatch: authDispatch } = useAuthContext();
  const { dispatch: cartDispatch } = useCartContext();

  const logout = async () => {
    setIsLoading(() => true);

    axios.post('/logout', null, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${userData?.token}`
      }
    })
    .then(() => {
      authDispatch({ type: 'LOGOUT' });
      cartDispatch({ type: 'DESTROY' });
    })
    .catch(() => {
      authDispatch({ type: 'LOGOUT' });
      cartDispatch({ type: 'DESTROY' });
    }).finally(() => {
      setIsLoading(() => false);
    });
  }

  return { logout, isLoading }
}