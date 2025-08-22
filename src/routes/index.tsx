/**
 * [Rotas] index.tsx
 * Responsabilidade:
 *  - Centralizar nomes de rotas e tipagens (se aplicável).
 *  - Evitar strings mágicas espalhadas pelo projeto.
 */
// Importa o criador de pilha de navegação nativa
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importa as telas que farão parte desta pilha
import HomeScreen from '../screens/HomeScreen';
import CreateAppointmentScreen from '../screens/CreateAppointmentScreen';
import ProfileScreen from '../screens/ProfileScreen';

// Cria a pilha de navegação
const Stack = createNativeStackNavigator();

// Componente que define as rotas da aplicação
export default function AppRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Remove o cabeçalho padrão da pilha
        animation: 'slide_from_right', // Define a animação de transição das telas
      }}
    >
      {/* Tela principal (início) */}
      <Stack.Screen name="Home" component={HomeScreen} />

      {/* Tela para criar/agendar consultas */}
      <Stack.Screen name="CreateAppointment" component={CreateAppointmentScreen} />

      {/* Tela de perfil do usuário */}
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}
