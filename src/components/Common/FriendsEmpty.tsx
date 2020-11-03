import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  background: ${props => props.theme.palette.mainBackground};
  align-items: center;
  justify-content: center;
  margin: 20px 0;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: ${props => props.theme.palette.main};
`;
type Props = {
  children?: React.ReactNode;
};
const FriendsEmpty: React.FC<Props> = ({ children }: Props) => {
  return (
    <Container>
      <Title>{children}</Title>
    </Container>
  );
};

export default FriendsEmpty;
