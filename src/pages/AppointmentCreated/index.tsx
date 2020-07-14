import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

import {
  Container,
  Title,
  Description,
  OkButton,
  OkButtonText,
} from './styles';

const AppointmentCreated: React.FC = () => {
  return (
    <Container>
      <Icon name="check" size={80} color="#04f361" />

      <Title>Agendamento Concluído</Title>
      <Description>cccc, dia dd de MMMM de yyyy às HH:00</Description>

      <OkButton onPress={() => {}}>
        <OkButtonText>Ok</OkButtonText>
      </OkButton>
    </Container>
  );
};

export default AppointmentCreated;
