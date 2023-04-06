import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children, to = '/'}) {
  const userData = localStorage.getItem('user');

  if (!userData)
    return <Navigate to={to} />;

  return children;
}