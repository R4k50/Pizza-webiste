import { Navigate } from 'react-router-dom'

export default function ProtectedUnverifiedRoute({ children, to = '/'}) {
  const userData = localStorage.getItem('user');

  if (userData)
    return <Navigate to={to} />;

  return children;
}