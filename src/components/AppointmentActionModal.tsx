/**
 * AppointmentActionModal.tsx
 *
 * Componente de modal utilizado para ações de consulta (confirmar ou cancelar) no aplicativo.
 * Ele exibe informações da consulta, permite inserir um motivo no caso de cancelamento,
 * e disponibiliza botões para confirmar ou cancelar a ação.
 *
 * Props principais:
 * - visible: boolean
 *     Controla se o modal está visível ou não.
 * - onClose: () => void
 *     Função chamada ao fechar o modal.
 * - onConfirm: (reason?: string) => void
 *     Função chamada ao confirmar a ação. Recebe opcionalmente um motivo no caso de cancelamento.
 * - actionType: 'confirm' | 'cancel'
 *     Define se o modal está sendo usado para confirmar ou cancelar a consulta.
 * - appointmentDetails: { patientName, doctorName, date, time, specialty }
 *     Objeto com detalhes da consulta a ser exibida no modal.
 *
 * Observações:
 * - Se actionType for 'cancel', o modal exibirá um input para o usuário informar o motivo do cancelamento.
 * - Os botões de ação mudam de cor e texto de acordo com a actionType.
 */

// Importa o React para criar componentes funcionais e usar hooks como useState
import React from 'react';

// Importa styled-components adaptado para React Native, usado para criar componentes estilizados
import styled from 'styled-components/native';

// Importa Modal (componente nativo para modais) e tipo ViewStyle para estilização de botões
import { Modal, ViewStyle } from 'react-native';

// Importa Button e Input da biblioteca react-native-elements
import { Button, Input } from 'react-native-elements';

// Importa o tema da aplicação (cores, tipografia)
import theme from '../styles/theme';

// Define a tipagem das props do componente
interface AppointmentActionModalProps {
  visible: boolean; // controla se o modal está visível
  onClose: () => void; // função chamada ao fechar o modal
  onConfirm: (reason?: string) => void; // função chamada ao confirmar ação, opcionalmente com um motivo
  actionType: 'confirm' | 'cancel'; // define se a ação é confirmar ou cancelar
  appointmentDetails: { // detalhes da consulta
    patientName: string;
    doctorName: string;
    date: string;
    time: string;
    specialty: string;
  };
}

// Componente funcional React que recebe props tipadas
const AppointmentActionModal: React.FC<AppointmentActionModalProps> = ({
  visible,
  onClose,
  onConfirm,
  actionType,
  appointmentDetails,
}) => {
  // Estado local para armazenar o motivo do cancelamento
  const [reason, setReason] = React.useState('');

  // Função chamada ao confirmar a ação
  const handleConfirm = () => {
    onConfirm(reason.trim() || undefined); // envia motivo ou undefined se vazio
    setReason(''); // limpa o input
    onClose(); // fecha o modal
  };

  // Função chamada ao fechar o modal sem confirmar
  const handleClose = () => {
    setReason(''); // limpa o input
    onClose(); // fecha o modal
  };

  // Booleano para facilitar verificações se a ação é cancelamento
  const isCancel = actionType === 'cancel';

  return (
    // Modal nativo do React Native
    <Modal
      visible={visible} // controla se o modal está visível
      transparent // fundo semi-transparente
      animationType="slide" // animação de slide
      onRequestClose={handleClose} // função chamada ao tentar fechar no Android
    >
      {/* Overlay semi-transparente centralizando o modal */}
      <Overlay>
        {/* Caixa branca do modal com borda arredondada e sombra */}
        <ModalContainer>
          {/* Cabeçalho do modal */}
          <Header>
            <Title>
              {isCancel ? 'Cancelar Consulta' : 'Confirmar Consulta'} 
              {/* Título muda conforme ação */}
            </Title>
          </Header>

          {/* Corpo do modal */}
          <Content>
            {/* Caixa com informações da consulta */}
            <AppointmentInfo>
              {/* Linha de informação */}
              <InfoRow>
                <InfoLabel>Paciente:</InfoLabel>
                <InfoValue>{appointmentDetails.patientName}</InfoValue>
              </InfoRow>

              <InfoRow>
                <InfoLabel>Médico:</InfoLabel>
                <InfoValue>{appointmentDetails.doctorName}</InfoValue>
              </InfoRow>

              <InfoRow>
                <InfoLabel>Especialidade:</InfoLabel>
                <InfoValue>{appointmentDetails.specialty}</InfoValue>
              </InfoRow>

              <InfoRow>
                <InfoLabel>Data/Hora:</InfoLabel>
                <InfoValue>{appointmentDetails.date} às {appointmentDetails.time}</InfoValue>
              </InfoRow>
            </AppointmentInfo>

            {/* Input para motivo do cancelamento, aparece apenas se for cancelamento */}
            {isCancel && (
              <ReasonContainer>
                <Input
                  label="Motivo do cancelamento (opcional)"
                  placeholder="Digite o motivo..."
                  value={reason} // valor do input vinculado ao estado
                  onChangeText={setReason} // atualiza estado ao digitar
                  multiline // permite várias linhas
                  numberOfLines={3} // altura do input
                  containerStyle={styles.reasonInput} // estilo do container
                />
              </ReasonContainer>
            )}

            {/* Texto de confirmação, muda conforme ação */}
            <ConfirmationText isCancel={isCancel}>
              {isCancel 
                ? 'Tem certeza que deseja cancelar esta consulta?'
                : 'Tem certeza que deseja confirmar esta consulta?'
              }
            </ConfirmationText>
          </Content>

          {/* Botões de ação */}
          <ButtonContainer>
            {/* Botão cancelar */}
            <Button
              title="Cancelar"
              onPress={handleClose} // chama função de fechar modal
              containerStyle={styles.cancelButton as ViewStyle} // estilo do container
              buttonStyle={styles.cancelButtonStyle} // estilo do botão
            />

            {/* Botão confirmar */}
            <Button
              title={isCancel ? 'Confirmar Cancelamento' : 'Confirmar'} // texto muda conforme ação
              onPress={handleConfirm} // chama função de confirmar
              containerStyle={styles.confirmButton as ViewStyle} // estilo do container
              buttonStyle={[
                styles.confirmButtonStyle,
                { backgroundColor: isCancel ? theme.colors.error : theme.colors.success } 
                // cor do botão muda conforme ação
              ]}
            />
          </ButtonContainer>
        </ModalContainer>
      </Overlay>
    </Modal>
  );
};

// Estilos simples para botões e input
const styles = {
  reasonInput: {
    marginBottom: 10, // espaço inferior
  },
  cancelButton: {
    flex: 1, // ocupa metade do espaço horizontal
    marginRight: 8, // espaço à direita
  },
  confirmButton: {
    flex: 1, // ocupa metade do espaço horizontal
    marginLeft: 8, // espaço à esquerda
  },
  cancelButtonStyle: {
    backgroundColor: theme.colors.secondary, // cor do botão cancelar
    paddingVertical: 12, // altura do botão
  },
  confirmButtonStyle: {
    paddingVertical: 12, // altura do botão
  },
};

// Overlay semi-transparente
const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

// Caixa branca do modal com sombra
const ModalContainer = styled.View`
  background-color: ${theme.colors.white};
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  shadow-color: ${theme.colors.text};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 5;
`;

// Cabeçalho do modal
const Header = styled.View`
  padding: 20px 20px 10px 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.border};
`;

// Título centralizado
const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${theme.colors.text};
  text-align: center;
`;

// Conteúdo principal
const Content = styled.View`
  padding: 20px;
`;

// Caixa com informações da consulta
const AppointmentInfo = styled.View`
  background-color: ${theme.colors.background};
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
`;

// Linha de informação
const InfoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
`;

// Label da informação
const InfoLabel = styled.Text`
  font-size: 14px;
  color: ${theme.colors.text};
  font-weight: 500;
`;

// Valor da informação
const InfoValue = styled.Text`
  font-size: 14px;
  color: ${theme.colors.text};
  font-weight: 400;
  flex: 1;
  text-align: right;
`;

// Container do input de motivo
const ReasonContainer = styled.View`
  margin-bottom: 16px;
`;

// Texto de confirmação
const ConfirmationText = styled.Text<{ isCancel: boolean }>`
  font-size: 16px;
  color: ${(props: { isCancel: boolean }) => props.isCancel ? theme.colors.error : theme.colors.success};
  text-align: center;
  margin-bottom: 20px;
  font-weight: 500;
`;

// Container dos botões
const ButtonContainer = styled.View`
  flex-direction: row;
  padding: 0 20px 20px 20px;
`;

// Exporta o componente
export default AppointmentActionModal;
