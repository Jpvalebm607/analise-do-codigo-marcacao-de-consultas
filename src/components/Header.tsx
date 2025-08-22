/**
 * Header.tsx
 *
 * Componente que exibe o cabeçalho da aplicação, mostrando informações do usuário logado
 * e o sino de notificações.
 *
 * Funcionalidades:
 * - Exibe avatar, nome e mensagem de boas-vindas do usuário.
 * - Integração com NotificationBell para exibir notificações.
 * - Utiliza contexto de autenticação (useAuth) para obter informações do usuário.
 * - Mantém o layout e cores consistentes com o tema da aplicação.
 *
 * Props principais: Nenhuma, o componente utiliza diretamente o contexto AuthContext.
 */

// Importa React para criar o componente funcional
import React from 'react';

// Importa styled-components para estilizar os componentes nativos
import styled from 'styled-components/native';

// Importa Avatar do react-native-elements para mostrar a foto do usuário
import { Avatar } from 'react-native-elements';

// Importa o contexto de autenticação para acessar informações do usuário logado
import { useAuth } from '../contexts/AuthContext';

// Importa componente de sino de notificações
import NotificationBell from './NotificationBell';

// Importa tema da aplicação (cores, espaçamento, etc)
import theme from '../styles/theme';

// Componente funcional Header
const Header: React.FC = () => {
  // Obtém o usuário logado através do contexto de autenticação
  const { user } = useAuth();

  // Se não houver usuário logado, não renderiza nada
  if (!user) return null;

  return (
    // Container principal do header
    <Container>
      {/* Área com informações do usuário */}
      <UserInfo>
        {/* Avatar do usuário */}
        <Avatar
          size="medium" // Tamanho médio do avatar
          rounded // Avatar em formato circular
          source={{ uri: user.image }} // Imagem do usuário
          containerStyle={styles.avatar} // Estilo do container do avatar
        />

        {/* Container para textos do usuário */}
        <TextContainer>
          {/* Texto de boas-vindas */}
          <WelcomeText>Bem-vindo(a),</WelcomeText>

          {/* Nome do usuário */}
          <UserName>{user.name}</UserName>
        </TextContainer>
      </UserInfo>

      {/* Componente do sino de notificações */}
      <NotificationBell />
    </Container>
  );
};

// Estilos do avatar
const styles = {
  avatar: {
    backgroundColor: theme.colors.primary, // Cor de fundo caso não tenha imagem
  },
};

// Container principal do header
const Container = styled.View`
  background-color: ${theme.colors.primary}; // Fundo do header
  padding: 16px; // Espaçamento interno
  flex-direction: row; // Organiza filhos em linha
  justify-content: space-between; // Espaço entre UserInfo e NotificationBell
  align-items: center; // Alinha verticalmente ao centro
  border-bottom-width: 1px; // Linha inferior
  border-bottom-color: ${theme.colors.border}; // Cor da linha inferior
`;

// Container para informações do usuário (avatar + textos)
const UserInfo = styled.View`
  flex-direction: row; // Organiza avatar e textos em linha
  align-items: center; // Alinha verticalmente ao centro
  flex: 1; // Ocupa todo espaço disponível
`;

// Container para textos (boas-vindas + nome)
const TextContainer = styled.View`
  margin-left: 12px; // Espaço entre avatar e textos
`;

// Texto de boas-vindas
const WelcomeText = styled.Text`
  font-size: 14px; // Tamanho da fonte
  color: ${theme.colors.white}; // Cor do texto
  opacity: 0.9; // Ligeira transparência
`;

// Nome do usuário
const UserName = styled.Text`
  font-size: 18px; // Tamanho da fonte maior
  font-weight: bold; // Negrito
  color: ${theme.colors.white}; // Cor branca
`;

// Exporta o componente Header para ser usado em outras telas
export default Header;
