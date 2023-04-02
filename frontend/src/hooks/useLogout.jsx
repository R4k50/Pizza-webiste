import { useState } from 'react';
import useAuthContext from './useAuthContext';
import axios from 'axios';

export default function useLogout() {
  const [isLoading, setIsloading] = useState(false);
  const { dispatch } = useAuthContext();

  const logout = async (token) => {
    setIsloading(() => true);

    axios.post('/logout', null, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      }
    })
    .then(() => {
      localStorage.removeItem('user');
      dispatch({ type: 'LOGOUT' });

      setIsloading(() => false);
    })
    .catch(() => setIsloading(() => false));
  }

  return { logout, isLoading }
}