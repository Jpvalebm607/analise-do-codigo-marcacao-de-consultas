/**
 * [Navegação] AppNavigator
 * Responsabilidade:
 *  - Definir stacks/tabs e guardas de rota baseadas em autenticação/perfil.
 * Fluxo:
 *  - Lê user do AuthContext → decide rotas públicas x privadas.
 * Regras por perfil:
 *  - admin -> AdminDashboard, UserManagement
 *  - medico -> DoctorDashboard
 *  - paciente -> PatientDashboard, CreateAppointment
 */
// Importa React
import React from 'react';

// Importa container de navegação e criador de pilha nativa
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importa hook de autenticação
import { useAuth } from '../contexts/AuthContext';

// Importa tipos de navegação
import { RootStackParamList } from '../types/navigation';

// Importa todas as telas do app
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import CreateAppointmentScreen from '../screens/CreateAppointmentScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import AdminDashboardScreen from '../screens/AdminDashboardScreen';
import DoctorDashboardScreen from '../screens/DoctorDashboardScreen';
import PatientDashboardScreen from '../screens/PatientDashboardScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import SettingsScreen from '../screens/SettingsScreen';

// Cria a pilha de navegação tipada com RootStackParamList
const Stack = createNativeStackNavigator<RootStackParamList>();

// Componente principal de navegação
export const AppNavigator: React.FC = () => {
  const { user, loading } = useAuth(); // Obtém usuário e estado de loading

  if (loading) {
    return null; // Enquanto carrega, retorna null ou pode ser um componente de loading
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false, // Remove cabeçalho padrão para todas as telas
        }}
      >
        {!user ? (
          // Rotas públicas para usuários não autenticados
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          // Rotas protegidas para usuários autenticados
          <>
            {/* Rotas específicas por papel do usuário */}
            {user.role === 'admin' && (
              <Stack.Screen 
                name="AdminDashboard" 
                component={AdminDashboardScreen}
                options={{ title: 'Painel Administrativo' }}
              />
            )}
            
            {user.role === 'doctor' && (
              <Stack.Screen 
                name="DoctorDashboard" 
                component={DoctorDashboardScreen}
                options={{ title: 'Painel do Médico' }}
              />
            )}
            
            {user.role === 'patient' && (
              <Stack.Screen 
                name="PatientDashboard" 
                component={PatientDashboardScreen}
                options={{ title: 'Painel do Paciente' }}
              />
            )}

            {/* Rotas comuns para todos os usuários autenticados */}
            <Stack.Screen 
              name="Home" 
              component={HomeScreen}
              options={{ title: 'Início' }}
            />
            <Stack.Screen 
              name="CreateAppointment" 
              component={CreateAppointmentScreen}
              options={{ title: 'Agendar Consulta' }}
            />
            <Stack.Screen 
              name="Profile" 
              component={ProfileScreen}
              options={{ title: 'Perfil' }}
            />
            <Stack.Screen 
              name="EditProfile" 
              component={EditProfileScreen}
              options={{ title: 'Editar Perfil' }}
            />
            <Stack.Screen 
              name="Notifications" 
              component={NotificationsScreen}
              options={{ title: 'Notificações' }}
            />
            <Stack.Screen 
              name="Settings" 
              component={SettingsScreen}
              options={{ title: 'Configurações' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
