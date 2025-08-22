/**
 * TimeSlotList.tsx
 *
 * Componente que exibe uma lista de horários disponíveis em formato de grid.
 *
 * Funcionalidades:
 * - Gera horários das 09:00 às 17:30 em intervalos de 30 minutos.
 * - Permite selecionar um horário, destacando o card selecionado.
 * - Aceita estilo customizado via prop `style`.
 *
 * Props principais:
 * - onSelectTime: (time: string) => void → Função chamada ao selecionar um horário.
 * - selectedTime?: string → Horário atualmente selecionado.
 * - style?: ViewStyle → Estilo customizado para o container.
 */

// Importa React
import React from 'react';

// Importa styled-components para estilização
import styled from 'styled-components/native';

// Importa tipos e componentes do React Native
import { ViewStyle, TouchableOpacity } from 'react-native';

// Importa o tema da aplicação
import theme from '../styles/theme';

// Define as propriedades que o componente aceita
interface TimeSlotListProps {
  onSelectTime: (time: string) => void; // Função chamada quando um horário é selecionado
  selectedTime?: string; // Horário atualmente selecionado
  style?: ViewStyle; // Estilo customizado para o container
}

// Props para estilização condicional dos cards
interface StyledProps {
  isSelected: boolean; // Define se o card está selecionado
}

// Componente funcional TimeSlotList
const TimeSlotList: React.FC<TimeSlotListProps> = ({
  onSelectTime,
  selectedTime,
  style,
}) => {
  // Função para gerar horários de 30 em 30 minutos das 9h às 18h
  const generateTimeSlots = () => {
    const slots: string[] = [];
    for (let hour = 9; hour < 18; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      slots.push(`${hour.toString().padStart(2, '0')}:30`);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots(); // Lista de horários

  return (
    // Container principal do componente
    <Container style={style}>
      <TimeGrid>
        {/* Mapeia todos os horários e cria um card para cada */}
        {timeSlots.map((time) => (
          <TimeCard
            key={time}
            onPress={() => onSelectTime(time)} // Ao tocar, chama onSelectTime
            isSelected={selectedTime === time} // Passa prop para estilização condicional
          >
            <TimeText isSelected={selectedTime === time}>
              {time} {/* Exibe o horário */}
            </TimeText>
          </TimeCard>
        ))}
      </TimeGrid>
    </Container>
  );
};

// Container externo do componente
const Container = styled.View`
  margin-bottom: 15px; // Espaço abaixo do componente
`;

// Grid que organiza os horários
const TimeGrid = styled.View`
  flex-direction: row; // Linha horizontal
  flex-wrap: wrap; // Permite quebrar linha quando necessário
  justify-content: space-between; // Espaça os cards igualmente
  gap: 6px; // Espaçamento entre os cards
`;

// Card de cada horário
const TimeCard = styled(TouchableOpacity)<StyledProps>`
  width: 23%; // Largura relativa para caber 4 cards por linha
  padding: 8px;
  border-radius: 6px;
  background-color: ${(props: StyledProps) => 
    props.isSelected ? theme.colors.primary + '20' : theme.colors.background}; // Cor muda se selecionado
  border-width: 1px;
  border-color: ${(props: StyledProps) => 
    props.isSelected ? theme.colors.primary : theme.colors.border}; // Borda muda se selecionado
  align-items: center;
  justify-content: center;
`;

// Texto do horário dentro do card
const TimeText = styled.Text<StyledProps>`
  font-size: 12px;
  font-weight: 500;
  color: ${(props: StyledProps) => 
    props.isSelected ? theme.colors.primary : theme.colors.text}; // Cor muda se selecionado
`;

// Exporta o componente
export default TimeSlotList;
