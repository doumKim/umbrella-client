import React from 'react';
import FriendsItem from './FriendsItem';

type Props = {
  isReq: boolean
}

// isReq: 친구요청 or 친구목록에 따른 조건부 렌더링
const FriendsList: React.FC<Props> = ({ isReq }: Props) => {
  return(
    <>
      <FriendsItem isReq={isReq}/>
      <FriendsItem isReq={isReq}/>
      <FriendsItem isReq={isReq}/>
      <FriendsItem isReq={isReq}/>
    </>
  );
};

export default FriendsList;