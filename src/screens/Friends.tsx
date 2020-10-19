import React, { useState } from 'react';
import styled from 'styled-components/native';
import Header from '../components/Common/Header';
import ScrollContainer from '../components/Common/ScrollContainer';
import FriendsReqContainer from '../containers/Friends/FriendsReqContainer';
import FriendsContainer from '../containers/Friends/FriendsContainer';
import { Entypo } from '@expo/vector-icons';
import { Image, View } from 'react-native';
import PaddingContainer from '../components/Common/PaddingContainer';


const Section = styled.View`
  margin-bottom: 15px;
`;

const Sub = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;
const SubTitle = styled.Text`
  font-size: 20px;
  font-weight: 500;
  color: ${props => props.theme.palette.main};
`;

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100px;
`;
const Friends: React.FC = () => {
  const [isOpenReq, setIsOpenReq] = useState<boolean>(true); //친구요청 Open/Close
  const [isOpenList, setIsOpenList] = useState<boolean>(true); //친구목록 Open/Close
  
  const toggleReq = () => {
    setIsOpenReq(!isOpenReq);
  };
  const toggleList = () => {
    setIsOpenList(!isOpenList);
  };
  return (
    <View>
      <ScrollContainer>
        <PaddingContainer>
          <Section>
            <Sub>
              <SubTitle>친구 요청</SubTitle>
              {
                isOpenReq ? 
                  <Entypo name="chevron-up" size={28} color="#7d8c9d" onPress={toggleReq}/>
                  :<Entypo name="chevron-down" size={28} color="#7d8c9d" onPress={toggleReq}/>
              }
            </Sub>
            {isOpenReq && <FriendsReqContainer/>}
          </Section>
          <Section>
            <Sub>
              <SubTitle>친구 목록</SubTitle>
              {
                isOpenList ? 
                  <Entypo name="chevron-up" size={28} color="#7d8c9d" onPress={toggleList}/>
                  :<Entypo name="chevron-down" size={28} color="#7d8c9d" onPress={toggleList}/>
              }
            </Sub>
            {isOpenList && <FriendsContainer/>}
          </Section>
        </PaddingContainer>
      </ScrollContainer>
      <Header title="친구 목록">
        <Wrapper>
          <Image source={require('../../assets/icon/search.png') } style={{ width: 40, height: 40 }}/>
          <Image source={require('../../assets/icon/addfriends.png') } style={{ width: 40, height: 40 }}/>
        </Wrapper>
      </Header>
    </View>
  );
};

export default Friends;
