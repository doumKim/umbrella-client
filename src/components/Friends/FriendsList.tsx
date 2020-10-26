import React from 'react';
import FriendsItem from './FriendsItem';

type Props = {
  type: string;
};

// isReq: 친구요청 or 친구목록에 따른 조건부 렌더링
// TODO: 친구 요청이 없습니다. 친구목록이 비어있습니다. 추가
const FriendsList: React.FC<Props> = ({ type }: Props) => {
  return (
    <>
      <FriendsItem type={type} />
    </>
  );
};

export default FriendsList;