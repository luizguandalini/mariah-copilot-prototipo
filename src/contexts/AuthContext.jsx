import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula verificação de autenticação no localStorage
    const storedUser = localStorage.getItem('mariah_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const loginWithGoogle = async () => {
    // Mock de login com Google
    const mockUser = {
      id: '1',
      name: 'Usuário Demo',
      email: 'usuario@demo.com',
      provider: 'google',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
    };
    setUser(mockUser);
    localStorage.setItem('mariah_user', JSON.stringify(mockUser));
  };

  const loginWithApple = async () => {
    // Mock de login com Apple
    const mockUser = {
      id: '2',
      name: 'Usuário Apple',
      email: 'usuario@apple.com',
      provider: 'apple',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Apple'
    };
    setUser(mockUser);
    localStorage.setItem('mariah_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mariah_user');
  };

  const value = {
    user,
    loading,
    loginWithGoogle,
    loginWithApple,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
