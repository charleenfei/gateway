import React, {
  createContext,
  FC,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { LoggedInUser, User } from '@centrifuge/gateway-lib/models/user';
import { useJWT } from './useJWT';
import { httpClient } from '../http-client';

interface AuthContextData {
  user: User | null;
  setUser: (user: User) => void;
  token: string | null;
  setToken: (token: string) => void;
}

export const AuthContext = createContext<AuthContextData>({
  user: null,
  setUser: () => undefined,
  token: null,
  setToken: () => undefined,
});

interface Props {
  children: (user: null | User, logout: () => void) => ReactNode;
  loggedInUser: LoggedInUser | null;
}

export const Auth: FC<Props> = ({ loggedInUser, children }) => {
  const [userLoaded, setUserLoaded] = useState(!!loggedInUser);
  const [user, setUser] = useState(loggedInUser?.user || null);
  const [token, setToken] = useJWT();

  useEffect(() => {
    (async () => {
      if (user || !token) {
        setUserLoaded(true);
        return;
      }

      try {
        const res = await httpClient.user.profile(token);
        setUser(res.data);
      } catch (e) {
        setToken(null);
      }
      setUserLoaded(true);
    })();
  }, [token, user, setUserLoaded, setUser, setToken]);

  if (!userLoaded) return null;

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken }}>
      {children(user, () => {
        setToken(null);
        setUser(null);
      })}
    </AuthContext.Provider>
  );
};
