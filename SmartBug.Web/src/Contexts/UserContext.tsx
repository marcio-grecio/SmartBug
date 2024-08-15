import { api } from '../Utils/Axios';
import { User } from '../Models/User';
import { decode } from '../Utils/JsonWebToken';
import { errorLog, infoLog } from '../Utils/Logger';
import { authenticate } from '../Services/AuthService';
import { useState, createContext, ReactNode } from 'react';
import { saveAuth, getAuth, getAvatar, saveSelectedEmpreendimento } from '../Repository/AuthRepo';

type AuthContextType = {
  activeUser: User | null;
  handleLogin: (email: string, senha: string) => Promise<any>;
  handleLogout: () => Promise<boolean>;
  checkHasToken: () => boolean;
};

const UserContext = createContext<AuthContextType>({} as AuthContextType);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [activeUser, setActiveUser] = useState<User | null>(null);

  const handleLogin = async (email: string, senha: string) => {
    let data;
    try {
      data = await authenticate(email, senha);
      infoLog('AuthProvider->handleLogin', { email, senha });
      infoLog('AuthProvider->handleLogin', data.token);
      saveAuth(data.token);
      api.defaults.headers.Authorization = `Bearer ${data.token}`;

      infoLog('AuthProvider->handleLogin', data.usuario);

      const user = {
        id: data.usuario.id,
        nome: data.usuario.nome,
        email: data.usuario.email,
        avatar: data.usuario.avatar,
        empreendimentos: data.usuario.empreendimentos,
        perfil: data.usuario.perfil,
      };

      setActiveUser(user);
      saveSelectedEmpreendimento(user.empreendimentos[0]);

      return { hasLoggedIn: true, perfil: user.perfil };
    } catch (error: any) {
      setActiveUser(null);

      if (error.response.data) {
        throw new Error(error.response.data);
      }

      infoLog('AuthProvider->handleLogin', data);
      errorLog('AuthProvider->handleLogin', error);
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      api.defaults.headers.Authorization = null;
      setActiveUser(null);
      return true;
    } catch (error) {
      setActiveUser(null);
      throw error;
    }
  };

  const checkHasToken = () => {
    const token = getAuth();
    if (!!token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      return true;
    }
    return false;
  };

  if (!activeUser) {
    const token = getAuth();
    if (!!token) {
      const tokenDecoded = decode(token)
      const avatar = getAvatar()


      const user = {
        id: tokenDecoded.id,
        nome: tokenDecoded.nome,
        email: tokenDecoded.email,
        avatar: avatar ?? tokenDecoded.avatar,
        empreendimentos: JSON.parse(tokenDecoded.empreendimentos),
        perfil: tokenDecoded.perfil,
      };

      setActiveUser(user);
    }
  }

  return (
    <UserContext.Provider value={{ activeUser, handleLogin, handleLogout, checkHasToken }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, AuthProvider }