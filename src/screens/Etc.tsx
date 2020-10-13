import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';
const Test = styled.Text`
  background: ${props => props.theme.palette.mainBackground};
`;
const Etc: React.FC = () => {
  return (
    <View>
      <Test>Etc</Test>
      <Text>Test</Text>
    </View>
  );
};

export default Etc;
