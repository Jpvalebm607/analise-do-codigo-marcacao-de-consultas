/**
 * NotificationBell.tsx
 *
 * Componente que exibe um sino de notificações com contagem de mensagens não lidas.
 *
 * Funcionalidades:
 * - Obtém o usuário logado através do AuthContext.
 * - Consulta a API de notificações via notificationService para obter a contagem de notificações não lidas.
 * - Atualiza a contagem periodicamente a cada 30 segundos e ao retornar para a tela.
 * - Permite navegar para a tela de notificações ao ser pressionado.
 * - Mostra um badge vermelho com a contagem (exibe "99+" se ultrapassar 99).
 *
 * Props principais: Nenhuma, utiliza contexto de autenticação e navegação.
 */

// Importa React e hooks useState e useEffect
import React, { useState, useEffect } from 'react';

// Importa styled-components para estilização
import styled from 'styled-components/native';

// Importa TouchableOpacity do React Native para criar botão clicável
import { TouchableOpacity } from 'react-native';

// Importa Badge do react-native-elements para mostrar contagem de notificações
import { Badge } from 'react-native-elements';

// Importa contexto de autenticação para obter dados do usuário
import { useAuth } from '../contexts/AuthContext';

// Importa hook de navegação para navegar entre telas
import { useNavigation } from '@react-navigation/native';

// Importa serviço de notificações que faz chamadas à API
import { notificationService } from '../services/notifications';

// Importa tema da aplicação (cores, espaçamentos etc)
import theme from '../styles/theme';

// Componente funcional NotificationBell
const NotificationBell: React.FC = () => {
  // Obtém o usuário logado do contexto
  const { user } = useAuth();

  // Hook de navegação para controlar navegação entre telas
  const navigation = useNavigation();

  // Estado que guarda o número de notificações não lidas
  const [unreadCount, setUnreadCount] = useState(0);

  // Função que carrega a contagem de notificações não lidas
  const loadUnreadCount = async () => {
    // Se não houver usuário, não faz nada
    if (!user?.id) return;
    
    try {
      // Chama serviço para obter contagem de notificações não lidas
      const count = await notificationService.getUnreadCount(user.id);
      setUnreadCount(count); // Atualiza o estado com a contagem
    } catch (error) {
      console.error('Erro ao carregar contador de notificações:', error);
    }
  };

  // useEffect para carregar contagem ao montar o componente
  useEffect(() => {
    loadUnreadCount();

    // Atualiza contagem a cada 30 segundos
    const interval = setInterval(loadUnreadCount, 30000);

    // Limpa o intervalo ao desmontar componente
    return () => clearInterval(interval);
  }, [user?.id]);

  // useEffect para atualizar contagem sempre que a tela volta ao foco
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadUnreadCount);
    return unsubscribe; // Remove listener ao desmontar
  }, [navigation, user?.id]);

  // Função chamada ao clicar no sino
  const handlePress = () => {
    navigation.navigate('Notifications' as never); // Navega para tela de notificações
  };

  return (
    // Botão clicável envolvendo o sino
    <TouchableOpacity onPress={handlePress}>
      <BellContainer>
        {/* Ícone do sino */}
        <BellIcon>🔔</BellIcon>

        {/* Badge mostrando contagem de notificações não lidas */}
        {unreadCount > 0 && (
          <Badge
            value={unreadCount > 99 ? '99+' : unreadCount.toString()} // Mostra '99+' se passar de 99
            status="error" // Cor do badge (vermelho)
            containerStyle={styles.badge} // Estilo do container do badge
            textStyle={styles.badgeText} // Estilo do texto dentro do badge
          />
        )}
      </BellContainer>
    </TouchableOpacity>
  );
};

// Estilos JS para Badge
const styles = {
  badge: {
    position: 'absolute' as const, // Posicionamento absoluto sobre o sino
    top: -8, // Distância do topo
    right: -8, // Distância da direita
  },
  badgeText: {
    fontSize: 10, // Tamanho da fonte do número
  },
};

// Container do sino
const BellContainer = styled.View`
  position: relative; // Permite posicionar o badge sobre o sino
  padding: 8px; // Espaçamento interno
`;

// Ícone do sino (emoji)
const BellIcon = styled.Text`
  font-size: 24px; // Tamanho do ícone
  color: ${theme.colors.white}; // Cor branca
`;

// Exporta o componente para uso em outras telas
export default NotificationBell;
