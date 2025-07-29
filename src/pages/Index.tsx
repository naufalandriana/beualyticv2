
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login page instead of dashboard
    // In a real app, you'd check authentication status here
    navigate('/login');
  }, [navigate]);

  return null;
};

export default Index;
