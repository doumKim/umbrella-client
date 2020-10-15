import React from 'react';
import { Image } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  height: 60px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const LeftContent = styled.View`
  flex-direction: row;
  align-items: center;
`;
const RightContent = styled.View`
  flex-direction: row;
  align-items: center;
`;

const AcceptBtn = styled.View`
  background: ${props => props.theme.palette.title};
  padding: 5px 10px;
  border: 2px solid #4590E7;
  border-radius: 5px;
`;
const AcceptText = styled.Text`
  color: ${props => props.theme.palette.mainBackground};
`;
const RejectBtn = styled.View`
  margin-left: 10px;
  background: white;
  padding: 5px 10px;
  border: 2px solid #EDEEF5;
  border-radius: 5px;
`;
const RejectText = styled.Text`
  
`;
const Title = styled.Text`
  margin-left: 10px;
  font-weight: 500;
  color: ${props => props.theme.palette.main};
`;

type Props = {
  isReq: boolean,
}

const FriendsItem: React.FC<Props> = ({ isReq }: Props) => {
  return(
    <Container>
      <LeftContent>
        <Image source={require('../../../assets/icon/defaultprofile.png') } style={{ width: 40, height: 40 }}/>
        <Title>고태풍</Title>
      </LeftContent>
      {isReq ? 
        <RightContent>
          <AcceptBtn>
            <AcceptText>
              수락
            </AcceptText>
          </AcceptBtn>
          <RejectBtn>
            <RejectText>
              거절
            </RejectText>
          </RejectBtn>
        </RightContent> : 
        <RightContent>
          <Image source={require('../../../assets/icon/coldot.png') } style={{ width: 40, height: 40 }}/>
        </RightContent>}
    </Container>
  );
};

export default FriendsItem;