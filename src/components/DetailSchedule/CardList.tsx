import React from 'react';
import CardItem from './CardItem';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  align-items: center;
  margin-bottom: 20px;
`;
const Title = styled.Text`
  font-size: 24px;
  font-weight: 500;
  color: ${props => props.theme.palette.main};
`;

const CardList: React.FC = () => {
  return (
    <>
      <Wrapper>
        <Title>논현역 방문하기</Title>
      </Wrapper>
      <CardItem />
      <CardItem />
      <CardItem />
    </>
  );
};

export default CardList;
