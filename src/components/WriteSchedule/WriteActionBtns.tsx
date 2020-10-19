import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const { width } = Dimensions.get('screen');

const Container = styled.View`
 width: ${width}px;
 flex-direction: row;
 align-items: center;
 justify-content: center;
`;

const CancelBtn = styled.TouchableOpacity`
  background: #ff8c94;
  width: ${width/2}px;
  align-items: center;
  padding: 20px 0;
`;
const SaveBtn = styled.TouchableOpacity`
  background: #769fcd;
  width: ${width/2}px;
  align-items: center;
  padding: 20px 0;
`;
const StyledText = styled.Text`
  font-size: 20px;
  color: white;
`;

const WriteActionBtns: React.FC = () => {
  const navigation = useNavigation();
  return(
    <Container>
      <CancelBtn
        onPress={() => {
          navigation.goBack();
        }}
      >
        <StyledText>취소</StyledText>
      </CancelBtn>
      <SaveBtn>
        <StyledText>저장</StyledText>
      </SaveBtn>
    </Container>
  );
};

export default WriteActionBtns;