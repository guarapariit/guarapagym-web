import { createContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import api from '../../services/api';

export interface User {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  role: number;
  roleName: string;
  avatar: null;
  password: string;
  days: number[];
  created_at: string;
  updated_at: string;
  role_name: string;
}

interface UserContextData {
  authUser: (
    email: string,
    password: string,
    remember: boolean,
  ) => Promise<{ auth: boolean; status: number; user?: User }>;
  user: User;
  isRememberMeActive: boolean;
  toggleIsRememberMeActive: () => void;
  isLoggedIn: boolean;
}

export const UserContext = createContext({} as UserContextData);

export function UserContextProvider({ children }) {
  const [user, setUser] = useState({} as User);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRememberMeActive, setIsRememberMeActive] = useState(true);

  const [userCookie, setUserCookie, removeUserCookie] = useCookies(['user']);
  const [tokenCookie, setTokenCookie, removeTokenCookie] = useCookies([
    'token',
  ]);

  useEffect(() => {});

  useEffect(() => {
    const loggedUser = userCookie.user;
    const loggedUserToken = tokenCookie.token;

    if (loggedUser && loggedUserToken) {
      loginUser(loggedUser, loggedUserToken);
    }
  }, []);

  async function authUser(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', {
        email,
        password,
      });

      loginUser(data.user, data.token);

      return { auth: true, status: 200, user: data.user };
    } catch (error) {
      return { auth: false, status: error.response.status };
    }
  }

  function loginUser(user: User, token: string) {
    setUser(user);
    setIsLoggedIn(true);

    if (isRememberMeActive) {
      const expires = new Date();
      expires.setDate(expires.getDate() + 7);

      setUserCookie('user', user, {
        expires,
      });
      setTokenCookie('token', token, {
        expires,
      });
    } else {
    }
  }

  function toggleIsRememberMeActive() {
    setIsRememberMeActive(!isRememberMeActive);
  }

  return (
    <UserContext.Provider
      value={{
        isRememberMeActive,
        user,
        isLoggedIn,
        authUser,
        toggleIsRememberMeActive,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
