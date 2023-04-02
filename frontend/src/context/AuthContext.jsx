import { createContext, useReducer, useEffect } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { userData: action.payload }
    case 'REGISTER':
      return { userData: action.payload }
    case 'LOGOUT':
      return { userData: null }
    default:
      return state;
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    userData: null
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));

    if (userData)
      dispatch({ type: 'LOGIN', payload: userData });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  );
}