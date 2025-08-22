/**
 * [Contexto] AuthContext
 * Responsabilidade:
 *  - Manter o estado global do usuário autenticado (admin | medico | paciente).
 *  - Expor ações: login, logout e (opcional) restoreSession.
 * Fluxo:
 *  - App envolve a árvore com <AuthProvider>.
 *  - Telas consomem { user, login, logout } via useContext(AuthContext).
 * Decisões:
 *  - Context usado para evitar prop drilling e centralizar regras por perfil.
 *  - Em produção, persistir tokens seguros (SecureStore) em vez de senhas.
 */
// Importa React e hooks necessários
import React, { createContext, useContext, useState, useEffect } from 'react';

// Importa AsyncStorage para persistência local
import AsyncStorage from '@react-native-async-storage/async-storage';

// Importa o serviço de autenticação
import { authService } from '../services/auth';

// Importa tipos relacionados à autenticação
import { User, LoginCredentials, RegisterData, AuthContextData } from '../types/auth';

// Define chaves usadas no AsyncStorage para armazenar dados do usuário e token
const STORAGE_KEYS = {
  USER: '@MedicalApp:user',
  TOKEN: '@MedicalApp:token',
};

// Cria o contexto de autenticação com tipagem AuthContextData
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// Provedor de autenticação que envolve a aplicação
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null); // Armazena o usuário logado
  const [loading, setLoading] = useState(true); // Indica se os dados ainda estão sendo carregados

  // Executa uma vez ao montar o componente para carregar usuário e usuários registrados
  useEffect(() => {
    loadStoredUser();
    loadRegisteredUsers();
  }, []);

  // Função para carregar usuário armazenado no AsyncStorage
  const loadStoredUser = async () => {
    try {
      const storedUser = await authService.getStoredUser();
      if (storedUser) {
        setUser(storedUser); // Atualiza estado com o usuário encontrado
      }
    } catch (error) {
      console.error('Erro ao carregar usuário:', error);
    } finally {
      setLoading(false); // Indica que carregamento terminou
    }
  };

  // Carrega lista de usuários registrados (pode ser usado para validação ou registro)
  const loadRegisteredUsers = async () => {
    try {
      await authService.loadRegisteredUsers();
    } catch (error) {
      console.error('Erro ao carregar usuários registrados:', error);
    }
  };

  // Função de login
  const signIn = async (credentials: LoginCredentials) => {
    try {
      const response = await authService.signIn(credentials); // Chama o serviço de login
      setUser(response.user); // Atualiza o estado do usuário
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user)); // Salva usuário localmente
      await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, response.token); // Salva token localmente
    } catch (error) {
      throw error; // Propaga erro para ser tratado na interface
    }
  };

  // Função de registro de novo usuário
  const register = async (data: RegisterData) => {
    try {
      const response = await authService.register(data); // Chama serviço de registro
      setUser(response.user); // Atualiza estado do usuário
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user)); // Salva usuário localmente
      await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, response.token); // Salva token localmente
    } catch (error) {
      throw error; // Propaga erro
    }
  };

  // Função de logout
  const signOut = async () => {
    try {
      await authService.signOut(); // Chama serviço de logout
      setUser(null); // Remove usuário do estado
      await AsyncStorage.removeItem(STORAGE_KEYS.USER); // Remove dados do AsyncStorage
      await AsyncStorage.removeItem(STORAGE_KEYS.TOKEN);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  // Atualiza informações do usuário no estado e no AsyncStorage
  const updateUser = async (updatedUser: User) => {
    try {
      setUser(updatedUser); // Atualiza estado
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser)); // Atualiza armazenamento local
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      throw error; // Propaga erro
    }
  };

  // Retorna o provedor com todas as funções e estado disponível para os filhos
  return (
    <AuthContext.Provider value={{ user, loading, signIn, register, signOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para acessar o contexto de autenticação
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    // Garante que o hook só seja usado dentro do AuthProvider
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context; // Retorna estado e funções do AuthContext
};
