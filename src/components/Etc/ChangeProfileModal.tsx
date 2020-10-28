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
const WarningText = styled.Text`
  color: #f67280;
`;
type Props = {
  show: boolean;
  type: string;
  closeModal(): void;
  warning: string;
  nickname: string | undefined;
  keywordName: string;
  keywordId: string;
  onChangeNickname(text: string): void;
  onChangeUserId(text: string): void;
  clearKeyword(): void;
  onSubmitNickname(): void;
  onSubmitUserId(): void;
};

const ChangeProfileModal: React.FC<Props> = ({
  show,
  type,
  closeModal,
  warning,
  nickname,
  keywordName,
  keywordId,
  onChangeNickname,
  onChangeUserId,
  clearKeyword,
  onSubmitNickname,
  onSubmitUserId,
}: Props) => {
  const onClickBack = () => {
    clearKeyword();
    closeModal();
  };
  const submitNickname = () => {
    onSubmitNickname();
    closeModal();
  };
  const submitUserId = () => {
    onSubmitUserId();
    closeModal();
  };

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
              paddingTop: 10,
            }}
          >
            <TouchableOpacity onPress={onClickBack}>
              <Image
                source={require('../../../assets/icon/back.png')}
                style={{ width: 40, height: 40 }}
              />
            </TouchableOpacity>
            <Title>{type === 'nickname' ? '닉네임 변경' : 'ID 설정하기'}</Title>
          </View>
          <InputOutline>
            <ChangeInput
              value={type === 'nickname' ? keywordName : keywordId}
              placeholder={
                type === 'nickname' ? `${nickname}` : 'ID(영문, 최대 10글자)'
              }
              onChangeText={
                type === 'nickname' ? onChangeNickname : onChangeUserId
              }
            />
            <TouchableOpacity onPress={clearKeyword}>
              <Image
                source={require('../../../assets/icon/close.png')}
                style={{ width: 20, height: 20 }}
              />
            </TouchableOpacity>
          </InputOutline>
          <View style={{ alignItems: 'center', marginTop: 30 }}>
            <WarningText>{warning}</WarningText>
          </View>
          <View
            style={{
              width: '100%',
              alignItems: 'flex-end',
              marginTop: 40,
              marginBottom: 6,
            }}
          >
            <TouchableOpacity
              onPress={type === 'nickname' ? submitNickname : submitUserId}
            >
              <ConfirmBtn>변경</ConfirmBtn>
            </TouchableOpacity>
          </View>
        </ModalBackground>
      </DarkOpacity>
    </Modal>
  );
};

export default ChangeProfileModal;
