import { useRouter } from 'next/router';
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
  logout: () => void;
  toggleIsRememberMeActive: () => void;
  user: User;
  isRememberMeActive: boolean;
  isLoggedIn: boolean;
}

export const UserContext = createContext({} as UserContextData);

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState({} as User);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRememberMeActive, setIsRememberMeActive] = useState(true);

  const [userCookie, setUserCookie, removeUserCookie] = useCookies(['user']);
  const [tokenCookie, setTokenCookie, removeTokenCookie] = useCookies([
    'token',
  ]);

  const router = useRouter();

  useEffect(() => {
    const loggedUser = userCookie.user;
    const loggedUserToken = tokenCookie.token;

    if (loggedUser && loggedUserToken) {
      login(loggedUser, loggedUserToken);
    }
  }, []);

  async function authUser(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', {
        email,
        password,
      });

      login(data.user, data.token);

      return { auth: true, status: 200, user: data.user };
    } catch (error) {
      return { auth: false, status: error.response.status };
    }
  }

  function login(user: User, token: string) {
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

      api.defaults.headers.authorization = `Bearer ${token}`;
    } else {
    }
  }

  async function logout() {
    await router.push('/');

    setUser(undefined);
    setIsLoggedIn(false);
    removeUserCookie('user');
    removeTokenCookie('token');
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
        logout,
        authUser,
        toggleIsRememberMeActive,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
