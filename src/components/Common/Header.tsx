import React from 'react';
import styled from 'styled-components/native';

type Props = {
  children?: React.ReactNode;
  title?: string;
};

const Container = styled.View`
  height: 90px;
  background: ${props => props.theme.palette.mainBackground};
  margin-bottom: 15px;
  padding: 35px 15px 0;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  right: 0;
  top: 0;
  left: 0;
`;

const Title = styled.Text`
  font-size: 26px;
  font-weight: 700;
  color: ${props => props.theme.palette.title};
`;

const Header: React.FC<Props> = ({ children, title }: Props) => {
  return (
    <Container>
      {title && <Title>{title}</Title>}
      {children}
    </Container>
  );
};

export default Header;
