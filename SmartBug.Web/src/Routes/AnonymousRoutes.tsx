import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Contexts/UserContext';

interface AnonymousRoutesProps {
  children: React.ReactNode;
}

const AnonymousRoutes = ({ children }: AnonymousRoutesProps) => {
  const context = useContext(UserContext);
  const navigate = useNavigate();

  if (!context) {
    navigate('/Login');
    return null;
  }

  const { checkHasToken } = context;
  const isAuthenticated = checkHasToken();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return !isAuthenticated ? children : null;
};

export default AnonymousRoutes;
