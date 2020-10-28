import React, { useState } from 'react';
import { ActivityIndicator, Image, TouchableOpacity, View } from 'react-native';
import styled, { css } from 'styled-components/native';
import ChangeProfileModal from './ChangeProfileModal';

const Container = styled.View`
  background: ${props => props.theme.palette.profileCard};
  border-radius: 25px;
  padding: 20px 50px;
  align-items: center;
  justify-content: center;
  min-height: 250px;
`;

const TopContent = styled.View`
  position: relative;
  margin-bottom: 10px;
`;
const BottomContent = styled.View`
  align-items: center;
  width: 70%;
  max-width: 300px;
`;
const Span = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
  margin-bottom: 10px;
  width: 100%;
  min-height: 30px;
`;
const Label = styled.Text`
  font-size: 18px;
  font-weight: 500;
  margin-right: 20px;
`;
const NickName = styled.Text`
  font-size: 18px;
  margin-right: 10px;
  color: ${props => props.theme.palette.title};
`;
const UserId = styled.Text`
  margin-right: 10px;
  ${(props: UserIdType) =>
    props.isUser
      ? css`
          font-size: 18px;
          color: ${props => props.theme.palette.subSub};
        `
      : css`
          color: ${props => props.theme.palette.sub};
          border-style: solid;
          border-bottom-width: 1px;
          border-bottom-color: ${props => props.theme.palette.sub};
          font-size: 15px;
          line-height: 30px;
        `}

  min-width: 110px;
`;

type Props = {
  avatar: string | undefined;
  nickname: string | undefined;
  userId: string | undefined;
  isLoading: boolean;
  warning: string;
  keywordName: string;
  keywordId: string;
  onChangeNickname(text: string): void;
  onChangeUserId(text: string): void;
  clearKeyword(): void;
  onSubmitNickname(): void;
  onSubmitUserId(): void;
};

type UserIdType = {
  isUser?: boolean;
};

const MyProfile: React.FC<Props> = ({
  avatar,
  nickname,
  userId,
  isLoading,
  warning,
  keywordName,
  keywordId,
  onChangeNickname,
  onChangeUserId,
  clearKeyword,
  onSubmitNickname,
  onSubmitUserId,
}: Props) => {
  const [show, setShow] = useState(false);
  const [type, setType] = useState('nickname');

  const closeModal = () => {
    setShow(false);
  };
  const openNicknameModal = () => {
    setType('nickname');
    setShow(true);
  };
  const openUserIdModal = () => {
    setType('userid');
    setShow(true);
  };
  return isLoading ? (
    <Container>
      <ActivityIndicator color={'black'} size={'large'} />
    </Container>
  ) : (
    <Container>
      <TopContent>
        <Image
          source={require('../../../assets/icon/camera.png')}
          style={{
            width: 30,
            height: 30,
            position: 'absolute',
            top: -4,
            left: -7,
            zIndex: 100,
          }}
        />
        <View style={{ borderRadius: 40, overflow: 'hidden' }}>
          <Image source={{ uri: avatar }} style={{ width: 80, height: 80 }} />
        </View>
      </TopContent>
      <BottomContent>
        <Span>
          <Label>닉네임</Label>
          <TouchableOpacity
            onPress={openNicknameModal}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <NickName>{nickname}</NickName>
            <Image
              source={require('../../../assets/icon/write.png')}
              style={{ width: 30, height: 30 }}
            />
          </TouchableOpacity>
        </Span>
        <Span>
          <Label>유저ID</Label>
          {userId ? (
            <UserId isUser>{userId}</UserId>
          ) : (
            <>
              <UserId>아이디를 생성해주세요.</UserId>
              <TouchableOpacity
                onPress={openUserIdModal}
                style={{ flexDirection: 'row', alignItems: 'center' }}
              >
                <Image
                  source={require('../../../assets/icon/write.png')}
                  style={{ width: 30, height: 30 }}
                />
              </TouchableOpacity>
            </>
          )}
        </Span>
      </BottomContent>
      <ChangeProfileModal
        type={type}
        show={show}
        warning={warning}
        closeModal={closeModal}
        nickname={nickname}
        keywordName={keywordName}
        keywordId={keywordId}
        onChangeNickname={onChangeNickname}
        onChangeUserId={onChangeUserId}
        clearKeyword={clearKeyword}
        onSubmitNickname={onSubmitNickname}
        onSubmitUserId={onSubmitUserId}
      />
    </Container>
  );
};

export default MyProfile;
