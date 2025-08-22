/**
 * AppointmentCard.tsx
 *
 * Componente de cartão que exibe informações resumidas de uma consulta médica.
 * Inclui nome do médico, especialidade, data, horário e status da consulta,
 * além de avatar do médico e estilização do status com cores.
 *
 * Props principais:
 * - doctorName: string
 *     Nome do médico da consulta.
 * - date: string
 *     Data da consulta.
 * - time: string
 *     Horário da consulta.
 * - specialty: string
 *     Especialidade médica.
 * - status: 'pending' | 'confirmed' | 'cancelled'
 *     Status da consulta, que altera cor e texto do indicador de status.
 * - onPress?: () => void
 *     Função opcional chamada ao clicar no card.
 * - style?: ViewStyle
 *     Estilo opcional para sobrescrever o padrão do card.
 *
 * Observações:
 * - O status é representado visualmente por um ponto colorido e texto correspondente.
 * - O avatar é gerado aleatoriamente como placeholder.
 */

// Importa React para criar componentes funcionais e usar hooks se necessário
import React from 'react';

// Importa styled-components para React Native, permitindo criar componentes estilizados
import styled from 'styled-components/native';

// Importa ViewStyle para tipagem opcional do estilo do componente
import { ViewStyle } from 'react-native';

// Importa Card, Text e Avatar da biblioteca react-native-elements
import { Card, Text, Avatar } from 'react-native-elements';

// Importa o tema da aplicação (cores, tipografia)
import theme from '../styles/theme';

// Define a tipagem das props do componente AppointmentCard
interface AppointmentCardProps {
  doctorName: string; // nome do médico
  date: string;       // data da consulta
  time: string;       // horário da consulta
  specialty: string;  // especialidade do médico
  status: 'pending' | 'confirmed' | 'cancelled'; // status da consulta
  onPress?: () => void; // função opcional ao clicar no card
  style?: ViewStyle;    // estilo opcional para sobrescrever o padrão
}

// Componente funcional que recebe props tipadas
const AppointmentCard: React.FC<AppointmentCardProps> = ({
  doctorName,
  date,
  time,
  specialty,
  status,
  onPress,
  style,
}) => {
  // Função que retorna a cor do status conforme o tipo
  const getStatusColor = () => {
    switch (status) {
      case 'confirmed':
        return theme.colors.success; // verde para confirmado
      case 'cancelled':
        return theme.colors.error; // vermelho para cancelado
      default:
        return theme.colors.primary; // azul para pendente
    }
  };

  return (
    // Card da biblioteca react-native-elements
    <Card containerStyle={[styles.card, style]}>
      {/* Container interno do Card */}
      <CardContent>
        {/* Seção com informações do médico */}
        <DoctorInfo>
          <Avatar
            size="medium" // tamanho médio do avatar
            rounded // avatar arredondado
            source={{ uri: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 10)}.jpg` }} 
            // avatar aleatório de placeholder
            containerStyle={styles.avatar} // estilo do container do avatar
          />
          {/* Container com nome e especialidade */}
          <TextContainer>
            <DoctorName>{doctorName}</DoctorName>
            <Specialty>{specialty}</Specialty>
          </TextContainer>
        </DoctorInfo>

        {/* Seção com informações da consulta */}
        <AppointmentInfo>
          <InfoRow>
            <InfoLabel>Data:</InfoLabel>
            <InfoValue>{date}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Horário:</InfoLabel>
            <InfoValue>{time}</InfoValue>
          </InfoRow>
        </AppointmentInfo>

        {/* Seção com status da consulta */}
        <StatusContainer>
          <StatusDot color={getStatusColor()} /> 
          {/* Ponto colorido representando status */}
          <StatusText color={getStatusColor()}>
            {status === 'confirmed' ? 'Confirmada' : status === 'cancelled' ? 'Cancelada' : 'Pendente'}
            {/* Texto do status */}
          </StatusText>
        </StatusContainer>
      </CardContent>
    </Card>
  );
};

// Estilos estáticos do card e avatar
const styles = {
  card: {
    borderRadius: 10, // borda arredondada
    marginHorizontal: 0, // sem margem horizontal
    marginVertical: 8,   // margem vertical
    padding: 15,         // padding interno
    elevation: 3,        // sombra para Android
    shadowColor: '#000', // cor da sombra para iOS
    shadowOffset: { width: 0, height: 2 }, // offset da sombra
    shadowOpacity: 0.25, // opacidade da sombra
    shadowRadius: 3.84,  // raio da sombra
  },
  avatar: {
    backgroundColor: theme.colors.primary, // cor de fundo do avatar
  },
};

// Container interno do Card
const CardContent = styled.View`
  padding: 10px;
`;

// Container com avatar e nome do médico
const DoctorInfo = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
`;

// Container com nome e especialidade do médico
const TextContainer = styled.View`
  margin-left: 15px;
`;

// Nome do médico com estilo
const DoctorName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${theme.colors.text};
`;

// Especialidade do médico com estilo
const Specialty = styled.Text`
  font-size: 14px;
  color: ${theme.colors.text};
  opacity: 0.7; // texto mais claro
`;

// Container com informações da consulta
const AppointmentInfo = styled.View`
  margin-bottom: 15px;
`;

// Linha de informação (Data/Horário)
const InfoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  marginBottom: 5px;
`;

// Label da informação
const InfoLabel = styled.Text`
  font-size: 14px;
  color: ${theme.colors.text};
  opacity: 0.7;
`;

// Valor da informação
const InfoValue = styled.Text`
  font-size: 14px;
  color: ${theme.colors.text};
  font-weight: 500;
`;

// Container do status
const StatusContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

// Ponto colorido do status
const StatusDot = styled.View<{ color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${props => props.color};
  margin-right: 8px;
`;

// Texto do status com cor dinâmica
const StatusText = styled.Text<{ color: string }>`
  font-size: 14px;
  color: ${props => props.color};
  font-weight: 500;
`;

// Exporta o componente
export default AppointmentCard;
