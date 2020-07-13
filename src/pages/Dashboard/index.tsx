import React from 'react';

import { useAuth } from '../../hooks/auth';

import { Container, Header, HeaderTitle, UserName } from './styles';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo, {'\n'}
          <UserName>Usuario GoBarber</UserName>
        </HeaderTitle>
      </Header>
    </Container>
  );
};

export default Dashboard;
