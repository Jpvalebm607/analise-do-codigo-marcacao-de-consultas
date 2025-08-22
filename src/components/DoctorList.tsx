/**
 * DoctorList.tsx
 *
 * Componente que renderiza uma lista de médicos, permitindo a seleção de um médico.
 *
 * Props principais:
 * - doctors: Doctor[]
 *     Lista de médicos a serem exibidos.
 * - onSelectDoctor: (doctor: Doctor) => void
 *     Função chamada quando um médico é selecionado.
 * - selectedDoctorId?: string
 *     ID do médico atualmente selecionado, usado para destacar o item.
 * - style?: ViewStyle
 *     Estilo opcional para sobrescrever o container principal.
 *
 * Funcionalidades:
 * - Exibe avatar, nome e especialidade de cada médico.
 * - Destaca o médico selecionado.
 * - Integração com react-native-elements ListItem e Avatar.
 * - Mantém consistência visual utilizando o tema da aplicação (cores, tipografia, bordas).
 */

// Importa React para criar o componente funcional
import React from 'react';

// Importa styled-components para estilização de componentes nativos
import styled from 'styled-components/native';

// Importa tipo ViewStyle para tipar a propriedade style
import { ViewStyle } from 'react-native';

// Importa componentes do react-native-elements para listas e avatares
import { ListItem, Avatar } from 'react-native-elements';

// Importa tema da aplicação (cores, tipografia, etc)
import theme from '../styles/theme';

// Define a interface Doctor para tipar os médicos
interface Doctor {
  id: string;         // Identificador único do médico
  name: string;       // Nome do médico
  specialty: string;  // Especialidade do médico
  image: string;      // URL da imagem/avatar do médico
}

// Define as props esperadas pelo componente DoctorList
interface DoctorListProps {
  doctors: Doctor[];                         // Lista de médicos
  onSelectDoctor: (doctor: Doctor) => void; // Função chamada ao selecionar um médico
  selectedDoctorId?: string;                 // ID do médico atualmente selecionado (opcional)
  style?: ViewStyle;                         // Estilo adicional para o container (opcional)
}

// Componente funcional DoctorList
const DoctorList: React.FC<DoctorListProps> = ({
  doctors,
  onSelectDoctor,
  selectedDoctorId,
  style,
}) => {
  return (
    // Container principal da lista, recebe estilo adicional via props
    <Container style={style}>
      {/* Mapeia cada médico da lista e renderiza um ListItem */}
      {doctors.map((doctor) => (
        <ListItem
          key={doctor.id} // Chave única para cada item da lista
          onPress={() => onSelectDoctor(doctor)} // Chama função ao selecionar
          containerStyle={[
            styles.listItem, // Estilo padrão do item
            selectedDoctorId === doctor.id && styles.selectedItem, // Aplica estilo se selecionado
          ]}
        >
          {/* Avatar do médico */}
          <Avatar
            size="medium"
            rounded
            source={{ uri: doctor.image }} // Imagem do médico
            containerStyle={styles.avatar} // Estilo do container do avatar
          />
          
          {/* Conteúdo do ListItem */}
          <ListItem.Content>
            {/* Nome do médico */}
            <ListItem.Title style={styles.name}>{doctor.name}</ListItem.Title>
            {/* Especialidade do médico */}
            <ListItem.Subtitle style={styles.specialty}>
              {doctor.specialty}
            </ListItem.Subtitle>
          </ListItem.Content>

          {/* Chevron do ListItem (seta indicando que é clicável) */}
          <ListItem.Chevron />
        </ListItem>
      ))}
    </Container>
  );
};

// Estilos utilizados no componente
const styles = {
  listItem: {
    borderRadius: 8, // Arredonda cantos
    marginVertical: 4, // Espaçamento vertical
    backgroundColor: theme.colors.background, // Cor de fundo padrão
    borderWidth: 1, // Largura da borda
    borderColor: theme.colors.border, // Cor da borda
  },
  selectedItem: {
    backgroundColor: theme.colors.primary + '20', // Cor de fundo quando selecionado (com transparência)
    borderColor: theme.colors.primary, // Borda destacada
  },
  avatar: {
    backgroundColor: theme.colors.primary, // Cor de fundo do avatar (fallback caso não tenha imagem)
  },
  name: {
    fontSize: 16, // Tamanho da fonte do nome
    fontWeight: 'bold', // Negrito para o nome
    color: theme.colors.text, // Cor do texto
  },
  specialty: {
    fontSize: 14, // Tamanho da fonte da especialidade
    color: theme.colors.text, // Cor do texto
    opacity: 0.7, // Transparência para dar menor destaque
  },
};

// Container estilizado para a lista de médicos
const Container = styled.View`
  margin-bottom: 15px; // Espaçamento inferior
`;

// Exporta o componente para ser usado em outras partes da aplicação
export default DoctorList;
