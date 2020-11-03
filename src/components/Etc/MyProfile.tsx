import React, { useState } from 'react';
import { ActivityIndicator, Image, TouchableOpacity } from 'react-native';
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
  width: 220px;
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

const AvatarWrapper = styled.ImageBackground`
  border-radius: 40px;
  overflow: hidden;
`;

type Props = {
  nickname: string | undefined;
  userId: string | undefined;
  isLoading: boolean;
  image: string;
  warning: string;
  keywordName: string;
  keywordId: string;
  onChangeNickname(text: string): void;
  onChangeUserId(text: string): void;
  clearKeyword(): void;
  onSubmitNickname(): void;
  onSubmitUserId(): void;
  onImageClick(): void;
};

type UserIdType = {
  isUser?: boolean;
};

const MyProfile: React.FC<Props> = ({
  nickname,
  userId,
  isLoading,
  image,
  warning,
  keywordName,
  keywordId,
  onChangeNickname,
  onChangeUserId,
  clearKeyword,
  onSubmitNickname,
  onSubmitUserId,
  onImageClick,
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
        <TouchableOpacity onPress={onImageClick}>
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
          <AvatarWrapper
            source={{ uri: 'https://i.ibb.co/zh9Gw4S/loading.gif' }}
          >
            <Image
              source={{
                uri: image
                  ? image
                  : 'https://i.ibb.co/nkxzFDZ/default-profile.png',
              }}
              style={{ width: 80, height: 80 }}
            />
          </AvatarWrapper>
        </TouchableOpacity>
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
