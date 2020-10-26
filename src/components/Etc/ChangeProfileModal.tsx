import React from 'react';
import { Image, Modal, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';

const DarkOpacity = styled.View`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;
const ModalBackground = styled.View`
  width: 100%;
  background: #f2f3f7;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  padding: 15px;
`;
const Title = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: ${props => props.theme.palette.main};
`;

const InputOutline = styled.View`
  background: #f9f7f7;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 10px;
  border-radius: 12px;
  margin: 0 auto;
  width: 80%;
`;

const ChangeInput = styled.TextInput`
  font-size: 20px;
  width: 70%;
`;
const ConfirmBtn = styled.Text`
  font-size: 16px;
  color: ${props => props.theme.palette.title};
`;
type Props = {
  show: boolean;
  closeModal(): void;
};

const ChangeProfileModal: React.FC<Props> = ({ show, closeModal }: Props) => {
  return (
    <Modal
      style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}
      visible={show}
      transparent={true}
    >
      <DarkOpacity>
        <ModalBackground>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 20,
            }}
          >
            <TouchableOpacity onPress={closeModal}>
              <Image
                source={require('../../../assets/icon/back.png')}
                style={{ width: 40, height: 40 }}
              />
            </TouchableOpacity>
            <Title>닉네임 변경</Title>
          </View>
          <InputOutline>
            <ChangeInput placeholder="변경할 닉네임 입력" />
            <Image
              source={require('../../../assets/icon/close.png')}
              style={{ width: 20, height: 20 }}
            />
          </InputOutline>
          <View
            style={{
              width: '100%',
              alignItems: 'flex-end',
              marginTop: 40,
              marginBottom: 6,
            }}
          >
            <TouchableOpacity onPress={closeModal}>
              <ConfirmBtn>변경</ConfirmBtn>
            </TouchableOpacity>
          </View>
        </ModalBackground>
      </DarkOpacity>
    </Modal>
  );
};

export default ChangeProfileModal;
