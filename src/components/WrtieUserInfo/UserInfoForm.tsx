import { Entypo } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

const { height } = Dimensions.get('screen');

const InputOutline = styled.View`
  background: #f9f7f7;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 10px;
  border-radius: 12px;
  margin: 50px 50px 0;
  elevation: 6;
`;
const SearchInput = styled(TextInput)`
  font-size: 20px;
  width: 90%;
`;

const Cycle = styled.View`
  background: ${props => props.theme.palette.title};
  width: 70px;
  height: 70px;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
`;

const StyledText = styled.Text`
  font-size: 23px;
  font-weight: 500;
  color: ${props => props.theme.palette.title};
`;
const Wrapper = styled.View`
  align-items: center;
  margin-top: ${height/2.5}px;
`;

const UserInfoForm: React.FC = () => {
//   const navigation = useNavigation();
  return(
    <>
      <InputOutline>
        <SearchInput placeholder="유저 ID" placeholderTextColor="#94bceb"/>
      </InputOutline>
      <Wrapper>
        <Cycle>
          <Entypo name="chevron-right" size={60} color="white" />
        </Cycle>
        <StyledText>Next</StyledText>
      </Wrapper>
    </>
  );
};

export default UserInfoForm;