import React from 'react';
import styled from 'styled-components/native';

type Props = {
 children?: React.ReactNode,
 title: string
};

const Container = styled.View`
  height: 30px;
  margin-bottom: 15px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.Text`
  font-size: 26px;
  font-weight: 700;
  color: ${props => props.theme.palette.title};
`;

const Header: React.FC<Props> = ({ children, title }: Props) => {
  return (
    <Container>
      <Title>{title}</Title>
      {children}
    </Container>
  );
};

export default Header;