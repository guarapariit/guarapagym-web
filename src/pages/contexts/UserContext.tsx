import { createContext, useState } from 'react';
import api from '../../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  role: number;
  avatar: null;
  password: string;
  days: number[];
  created_at: string;
  updated_at: string;
}

interface UserContextData {
  authUser: (
    email: string,
    password: string,
  ) => Promise<{ auth: boolean; status: number; userRole?: number }>;
}

export const UserContext = createContext({} as UserContextData);

export function UserContextProvider({ children }) {
  const [user, setUser] = useState({} as User);

  async function authUser(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', {
        email,
        password,
      });

      const roleMap = {
        [0]: 'student',
        [1]: 'instructor',
        [2]: 'manager',
      };

      return { auth: true, status: 200, userRole: roleMap[data.user.role] };
    } catch (error) {
      return { auth: false, status: error.response.status };
    }
  }

  return (
    <UserContext.Provider
      value={{
        authUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
