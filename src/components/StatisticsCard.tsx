/**
 * StatisticsCard.tsx
 *
 * Componente que exibe um card de estatísticas com título, valor principal, subtítulo opcional e ícone.
 *
 * Funcionalidades:
 * - Mostra um título e valor principal em destaque.
 * - Exibe subtítulo opcional abaixo do valor.
 * - Aceita cor personalizada para o valor e borda esquerda.
 * - Aceita ícone opcional ao lado do título.
 * - Permite aplicar estilo customizado adicional via prop `style`.
 *
 * Props principais:
 * - title: string → Título do card.
 * - value: string | number → Valor principal exibido.
 * - subtitle?: string → Texto opcional abaixo do valor.
 * - color?: string → Cor principal do card (valor e borda esquerda).
 * - icon?: React.ReactNode → Ícone opcional exibido junto ao título.
 */

// Importa React
import React from 'react';

// Importa styled-components para estilização
import styled from 'styled-components/native';

// Importa ViewStyle do React Native para tipagem de estilo
import { ViewStyle } from 'react-native';

// Importa o tema da aplicação (cores, espaçamentos etc)
import theme from '../styles/theme';

// Define a interface de propriedades que o componente aceita
interface StatisticsCardProps {
  title: string; // Título do card
  value: string | number; // Valor principal exibido
  subtitle?: string; // Texto opcional abaixo do valor
  color?: string; // Cor principal do card (borda esquerda e valor)
  icon?: React.ReactNode; // Ícone opcional que pode ser exibido junto ao título
  style?: ViewStyle; // Estilo adicional customizável
}

// Componente funcional StatisticsCard
const StatisticsCard: React.FC<StatisticsCardProps> = ({
  title,
  value,
  subtitle,
  color = theme.colors.primary, // Define cor padrão se não for passada
  icon,
  style,
}) => {
  return (
    // Container principal do card, recebe cor e estilo customizado
    <Container style={style} color={color}>
      <Header>
        {/* Exibe ícone apenas se ele existir */}
        {icon && <IconContainer>{icon}</IconContainer>}
        {/* Título do card */}
        <Title>{title}</Title>
      </Header>

      {/* Valor principal, recebe a cor passada */}
      <Value color={color}>{value}</Value>

      {/* Subtítulo opcional */}
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
    </Container>
  );
};

// Container principal do card
const Container = styled.View<{ color: string }>`
  background-color: ${theme.colors.white}; // Fundo branco
  border-radius: 12px; // Bordas arredondadas
  padding: 16px; // Espaçamento interno
  margin: 8px; // Espaçamento externo
  min-height: 120px; // Altura mínima
  justify-content: space-between; // Distribui conteúdo verticalmente
  border-left-width: 4px; // Borda esquerda destacada
  border-left-color: ${(props) => props.color}; // Cor da borda esquerda
  shadow-color: ${theme.colors.text}; // Cor da sombra (iOS)
  shadow-offset: 0px 2px; // Deslocamento da sombra
  shadow-opacity: 0.1; // Opacidade da sombra
  shadow-radius: 4px; // Raio da sombra
  elevation: 3; // Sombra no Android
`;

// Header do card (linha com ícone + título)
const Header = styled.View`
  flex-direction: row; // Layout horizontal
  align-items: center; // Alinha verticalmente ao centro
  margin-bottom: 8px; // Espaço abaixo
`;

// Container do ícone (se existir)
const IconContainer = styled.View`
  margin-right: 8px; // Espaço entre ícone e título
`;

// Título do card
const Title = styled.Text`
  font-size: 14px;
  color: ${theme.colors.text};
  font-weight: 500;
  opacity: 0.8; // Deixa o texto levemente transparente
`;

// Valor principal do card
const Value = styled.Text<{ color: string }>`
  font-size: 28px;
  font-weight: bold;
  color: ${(props) => props.color}; // Cor passada via props
  margin-bottom: 4px; // Espaço abaixo do valor
`;

// Subtítulo do card
const Subtitle = styled.Text`
  font-size: 12px;
  color: ${theme.colors.text};
  opacity: 0.6; // Mais transparente que o título
`;

// Exporta o componente para uso em outras telas
export default StatisticsCard;
