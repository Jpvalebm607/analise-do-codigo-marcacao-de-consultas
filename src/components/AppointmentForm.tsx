/**
 * AppointmentForm.tsx
 *
 * Componente de formulário para agendamento de consultas.
 * Permite selecionar médico, data, horário e adicionar uma descrição.
 *
 * Props principais:
 * - onSubmit: (appointment: { doctorId: string; date: Date; time: string; description: string }) => void
 *     Função chamada ao enviar o formulário, recebe os dados da consulta.
 *
 * Funcionalidades:
 * - Seleção de médico a partir de uma lista fictícia.
 * - Input de data com formatação automática (DD/MM/AAAA) e validação.
 * - Seleção de horário disponível (intervalos de 30 min entre 09:00 e 17:30).
 * - Input de descrição da consulta.
 * - Validação de campos obrigatórios e data dentro do período permitido.
 * - Botão de envio que chama a função onSubmit com os dados formatados.
 * - Uso de styled-components para layout e estilo consistente com o tema.
 */

// Importa React e useState para controlar estados dentro do componente
import React, { useState } from 'react';

// Importa styled-components para React Native
import styled from 'styled-components/native';

// Importa componentes UI da biblioteca react-native-elements
import { Button, Input, Text } from 'react-native-elements';

// Importa componentes nativos do React Native
import { Platform, View, TouchableOpacity } from 'react-native';

// Importa o tema da aplicação (cores, tipografia, espaçamentos)
import theme from '../styles/theme';

// Importa tipos TypeScript das entidades Doctor e Appointment
import { Doctor } from '../types/doctors';
import { Appointment } from '../types/appointments';

// Lista de médicos fictícios para seleção no formulário
const doctors: Doctor[] = [
   { id: '1', name: 'Dr. João Silva', specialty: 'Cardiologista', image: 'https://mighty.tools/mockmind-api/content/human/91.jpg' },
   { id: '2', name: 'Dra. Maria Santos', specialty: 'Dermatologista', image: 'https://mighty.tools/mockmind-api/content/human/97.jpg' },
   { id: '3', name: 'Dr. Pedro Oliveira', specialty: 'Oftalmologista', image: 'https://mighty.tools/mockmind-api/content/human/79.jpg' },
];

// Tipagem das props do componente
type AppointmentFormProps = {
   onSubmit: (appointment: { doctorId: string; date: Date; time: string; description: string }) => void;
};

// Função que gera horários disponíveis (09:00 às 17:30, intervalos de 30 min)
const generateTimeSlots = () => {
   const slots = [];
   for (let hour = 9; hour < 18; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      slots.push(`${hour.toString().padStart(2, '0')}:30`);
   }
   return slots;
};

// Componente funcional do formulário de agendamento
const AppointmentForm: React.FC<AppointmentFormProps> = ({ onSubmit }) => {
   // Estados do formulário
   const [selectedDoctor, setSelectedDoctor] = useState<string>(''); // médico selecionado
   const [dateInput, setDateInput] = useState(''); // input de data
   const [selectedTime, setSelectedTime] = useState<string>(''); // horário selecionado
   const [description, setDescription] = useState(''); // descrição da consulta
   const timeSlots = generateTimeSlots(); // horários disponíveis

   // Valida se a data está no formato DD/MM/AAAA e dentro do período permitido (hoje + 3 meses)
   const validateDate = (inputDate: string) => {
      const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
      const match = inputDate.match(dateRegex);

      if (!match) return false;

      const [, day, month, year] = match;
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      const today = new Date();
      const maxDate = new Date(new Date().setMonth(new Date().getMonth() + 3));

      return date >= today && date <= maxDate;
   };

   // Formata o input de data enquanto o usuário digita
   const handleDateChange = (text: string) => {
      const numbers = text.replace(/\D/g, ''); // remove caracteres não numéricos
      let formattedDate = '';
      if (numbers.length > 0) {
         if (numbers.length <= 2) {
            formattedDate = numbers;
         } else if (numbers.length <= 4) {
            formattedDate = `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
         } else {
            formattedDate = `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`;
         }
      }
      setDateInput(formattedDate);
   };

   // Função executada ao enviar o formulário
   const handleSubmit = () => {
      // Valida se todos os campos obrigatórios estão preenchidos
      if (!selectedDoctor || !selectedTime || !description) {
         alert('Por favor, preencha todos os campos');
         return;
      }

      // Valida se a data está correta
      if (!validateDate(dateInput)) {
         alert('Por favor, insira uma data válida (DD/MM/AAAA)');
         return;
      }

      // Converte a string de data para objeto Date
      const [day, month, year] = dateInput.split('/');
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

      // Chama a função onSubmit passada via props
      onSubmit({ doctorId: selectedDoctor, date, time: selectedTime, description });
   };

   // Verifica se o horário está disponível (placeholder para futura lógica)
   const isTimeSlotAvailable = (time: string) => {
      return true;
   };

   return (
      <Container>
         {/* Seção de seleção do médico */}
         <Title>Selecione o Médico</Title>
         <DoctorList>
            {doctors.map((doctor) => (
               <DoctorCard
                  key={doctor.id}
                  selected={selectedDoctor === doctor.id} // marca o card selecionado
                  onPress={() => setSelectedDoctor(doctor.id)} // seleciona o médico ao clicar
               >
                  <DoctorImage source={{ uri: doctor.image }} />
                  <DoctorInfo>
                     <DoctorName>{doctor.name}</DoctorName>
                     <DoctorSpecialty>{doctor.specialty}</DoctorSpecialty>
                  </DoctorInfo>
               </DoctorCard>
            ))}
         </DoctorList>

         {/* Seção de data e horário */}
         <Title>Data e Hora</Title>
         <Input
            placeholder="Data (DD/MM/AAAA)"
            value={dateInput}
            onChangeText={handleDateChange} // formata a data enquanto digita
            keyboardType="numeric"
            maxLength={10} // tamanho máximo do input
            containerStyle={InputContainer}
            errorMessage={dateInput && !validateDate(dateInput) ? 'Data inválida' : undefined}
         />

         {/* Seleção dos horários disponíveis */}
         <TimeSlotsContainer>
            <TimeSlotsTitle>Horários Disponíveis:</TimeSlotsTitle>
            <TimeSlotsGrid>
               {timeSlots.map((time) => {
                  const isAvailable = isTimeSlotAvailable(time);
                  return (
                     <TimeSlotButton
                        key={time}
                        selected={selectedTime === time} // marca horário selecionado
                        disabled={!isAvailable} // desabilita se não disponível
                        onPress={() => isAvailable && setSelectedTime(time)} // seleciona horário
                     >
                        <TimeSlotText selected={selectedTime === time} disabled={!isAvailable}>
                           {time}
                        </TimeSlotText>
                     </TimeSlotButton>
                  );
               })}
            </TimeSlotsGrid>
         </TimeSlotsContainer>

         {/* Input da descrição da consulta */}
         <Input
            placeholder="Descrição da consulta"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            containerStyle={InputContainer}
         />

         {/* Botão de envio */}
         <SubmitButton
            title="Agendar Consulta"
            onPress={handleSubmit}
            buttonStyle={{
               backgroundColor: theme.colors.primary,
               borderRadius: 8,
               padding: 12,
               marginTop: 20,
            }}
         />
      </Container>
   );
};

// Containers e estilos estilizados com styled-components
const Container = styled.View`
  padding: ${theme.spacing.medium}px;
`;

const Title = styled.Text`
  font-size: ${theme.typography.subtitle.fontSize}px;
  font-weight: ${theme.typography.subtitle.fontWeight};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.medium}px;
`;

const DoctorList = styled.ScrollView`
  margin-bottom: ${theme.spacing.large}px;
`;

const DoctorCard = styled(TouchableOpacity)<{ selected: boolean }>`
  flex-direction: row;
  align-items: center;
  padding: ${theme.spacing.medium}px;
  background-color: ${(props: { selected: boolean }) => props.selected ? theme.colors.primary : theme.colors.white};
  border-radius: 8px;
  margin-bottom: ${theme.spacing.medium}px;
  elevation: 2;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  shadow-offset: 0px 2px;
`;

const DoctorImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin-right: ${theme.spacing.medium}px;
`;

const DoctorInfo = styled.View`
  flex: 1;
`;

const DoctorName = styled.Text`
  font-size: ${theme.typography.subtitle.fontSize}px;
  font-weight: ${theme.typography.subtitle.fontWeight};
  color: ${theme.colors.text};
`;

const DoctorSpecialty = styled.Text`
  font-size: ${theme.typography.body.fontSize}px;
  color: ${theme.colors.text};
  opacity: 0.8;
`;

const TimeSlotsContainer = styled.View`
  margin-bottom: ${theme.spacing.large}px;
`;

const TimeSlotsTitle = styled.Text`
  font-size: ${theme.typography.body.fontSize}px;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.small}px;
`;

const TimeSlotsGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${theme.spacing.small}px;
`;

const TimeSlotButton = styled(TouchableOpacity)<{ selected: boolean; disabled: boolean }>`
  background-color: ${(props: { selected: boolean; disabled: boolean }) => 
    props.disabled 
      ? theme.colors.background 
      : props.selected 
        ? theme.colors.primary 
        : theme.colors.white};
  padding: ${theme.spacing.small}px ${theme.spacing.medium}px;
  border-radius: 8px;
  border-width: 1px;
  border-color: ${(props: { selected: boolean; disabled: boolean }) => 
    props.disabled 
      ? theme.colors.background 
      : props.selected 
        ? theme.colors.primary 
        : theme.colors.text};
  opacity: ${(props: { disabled: boolean }) => props.disabled ? 0.5 : 1};
`;

const TimeSlotText = styled(Text)<{ selected: boolean; disabled: boolean }>`
  font-size: ${theme.typography.body.fontSize}px;
  color: ${(props: { selected: boolean; disabled: boolean }) => 
    props.disabled 
      ? theme.colors.text 
      : props.selected 
        ? theme.colors.white 
        : theme.colors.text};
`;

const InputContainer = {
   marginBottom: theme.spacing.medium,
   backgroundColor: theme.colors.white,
   borderRadius: 8,
   paddingHorizontal: theme.spacing.medium,
};

const SubmitButton = styled(Button)`
  margin-top: ${theme.spacing.large}px;
`;

// Exporta o componente
export default AppointmentForm;
