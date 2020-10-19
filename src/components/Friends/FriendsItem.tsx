import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
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
  position: absolute;
  right: 0;
`;

const AcceptBtn = styled(TouchableOpacity)`
  background: ${props => props.theme.palette.title};
  padding: 6px 11px;
  border-radius: 5px;
`;
const AcceptText = styled.Text`
  color: ${props => props.theme.palette.mainBackground};
`;
const RejectBtn = styled(TouchableOpacity)`
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

const Wrapper = styled.View`
  position: relative;
  justify-content: center;
`;

type Props = {
  isReq: boolean,
}

const Profile: React.FC = () => {
  return(
    <LeftContent>
      <Image source={require('../../../assets/icon/defaultprofile.png') } style={{ width: 40, height: 40 }}/>
      <Title>고태풍</Title>
    </LeftContent>
  );
};

const FriendsItem: React.FC<Props> = ({ isReq }: Props) => {
  const openModal = () => {
    console.log('openModal');
  };

  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate('DetailFriends');
  };

  return(
    <>
      {isReq ?
        <Wrapper>
          <Container>
            <Profile/>
          </Container>
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
          </RightContent>
        </Wrapper> 
        :
        <Wrapper>
          <TouchableOpacity onPress={goToDetail}>
            <Container>
              <Profile/>
            </Container>
          </TouchableOpacity>
          <RightContent>
            <TouchableOpacity onPress={openModal}>
              <Image source={require('../../../assets/icon/coldot.png') } style={{ width: 40, height: 40 }}/>
            </TouchableOpacity>
          </RightContent>
        </Wrapper>
      }
    </>
  );
};

export default FriendsItem;