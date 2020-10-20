import { useNavigation } from '@react-navigation/native';
import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
 width: 100%;
 flex-direction: row;
 align-items: center;
 justify-content: center;
 margin-bottom: 15px;
`;

const CancelBtn = styled.TouchableOpacity`
  background: #ff8c94;
  width: 48%;
  align-items: center;
  border-radius: 8px;
  padding: 20px 0;
  margin-right: 2%;
`;
const SaveBtn = styled.TouchableOpacity`
  background: #769fcd;
  width: 48%;
  align-items: center;
  border-radius: 8px;
  padding: 20px 0;
  margin-left: 2%;
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