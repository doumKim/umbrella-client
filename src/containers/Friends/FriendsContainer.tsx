import React from 'react';
import FriendsList from '../../components/Friends/FriendsList';

const FriendsContainer: React.FC = () => {
  return(
    <FriendsList isReq={false} />
  );
};

export default FriendsContainer;