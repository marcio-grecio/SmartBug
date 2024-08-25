import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Contexts/UserContext';

interface ProtectedRoutesProps {
  children: React.ReactNode;
  perfil: number;
}

const ProtectedRoutes = ({ children, perfil }: ProtectedRoutesProps) => {
  const context = useContext(UserContext);
  const navigate = useNavigate();

  if (!context) {
    // Handle the case where the context is not defined
    navigate('/login');
    return null;
  }
  
  const { activeUser, checkHasToken } = context;
  const isAuthenticated = checkHasToken();
  
  
  useEffect(() => {
    if (!activeUser || !isAuthenticated || parseInt(activeUser.perfil) > perfil) {
      navigate('/login');
    }
  }, [activeUser, isAuthenticated, navigate, perfil]);

  // Only render children if authenticated
  return isAuthenticated ? children : null;
};

export default ProtectedRoutes;
