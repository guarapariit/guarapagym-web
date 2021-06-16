import { useRouter } from 'next/router';
import { createContext, useEffect, useState } from 'react';
import { setCookie, parseCookies, destroyCookie } from 'nookies';

import api from '../../services/api';

export interface User {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  role: number;
  roleName: string;
  avatar_url: string;
  password: string;
  days: number[];
  created_at: string;
  updated_at: string;
  role_name: string;
}

interface AuthContextProps {
  authUser: (
    email: string,
    password: string,
    remember: boolean,
  ) => Promise<{ auth: boolean; status: number; user?: User }>;
  logout: () => void;
  toggleIsRememberMeActive: () => void;
  updateUserInfo: () => void;
  user: User;
  isRememberMeActive: boolean;
  isLoggedIn: boolean;
}

export const AuthContext = createContext({} as AuthContextProps);

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState({} as User);
  const [isAuth, setIsAuth] = useState(false);
  const [isRememberMeActive, setIsRememberMeActive] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const { 'guarapagym.user': loggedUser } = parseCookies();

    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
      setIsAuth(true);
    }
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', {
        email,
        password,
      });
      const { user, token } = data;

      setUser(user);
      setIsAuth(true);

      if (isRememberMeActive) {
        setCookie(undefined, 'guarapagym.user', JSON.stringify(user), {
          maxAge: 60 * 60 * 24, // 1 day
        });
        setCookie(undefined, 'guarapagym.token', token, {
          maxAge: 60 * 60 * 24, // 1 day
        });
      }

      return { auth: true, status: 200, user };
    } catch (error) {
      return { auth: false, status: error.response.status };
    }
  }

  async function signOut() {
    await router.push('/');

    setUser(undefined);
    setIsAuth(false);

    destroyCookie(null, 'guarapagym.user');
    destroyCookie(null, 'guarapagym.token');
  }

  async function updateUserInfo() {
    const { data } = await api.get('/profile');

    console.log(user);

    if (isRememberMeActive) {
      setCookie(undefined, 'guarapagym.user', JSON.stringify(data), {
        maxAge: 60 * 60 * 24, // 1 day
      });
    }

    setUser(data);
  }

  function toggleIsRememberMeActive() {
    setIsRememberMeActive(!isRememberMeActive);
  }

  return (
    <AuthContext.Provider
      value={{
        isRememberMeActive,
        user,
        isLoggedIn: isAuth,
        logout: signOut,
        authUser: signIn,
        updateUserInfo,
        toggleIsRememberMeActive,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
