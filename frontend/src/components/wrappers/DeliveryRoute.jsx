import { useEffect } from 'react';
import { Navigate } from 'react-router-dom'
import useAuthContext from '../../hooks/useAuthContext';
import ProtectedRoute from './ProtectedRoute';

export default function DeliveryRoute({ children, to = '/'}) {
  const { userData } = useAuthContext();

  useEffect(() => {
    if (userData?.user.isDelivery == false)
      children = <Navigate to={to} />
  }, [userData]);

  return (
    <ProtectedRoute>
      { children }
    </ProtectedRoute>
  );
}