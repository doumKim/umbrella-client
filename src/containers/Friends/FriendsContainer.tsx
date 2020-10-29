import React, { useEffect } from 'react';
import FriendsList from '../../components/Friends/FriendsList';
import { useDispatch, useSelector } from 'react-redux';
import ErrorComponent from '../../components/Common/ErrorComponent';
import Loading from '../../components/Common/Loading';
import { RootState } from '../../modules';
import { getFriendListAsync } from '../../modules/friend';

const FriendsContainer: React.FC = () => {
  const { error, loading, friendList } = useSelector(
    (state: RootState) => state.friendList.myFriendList
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFriendListAsync.request());
  }, []);

  return (
    <>
      {loading && <Loading />}
      {error && <ErrorComponent />}
      {loading || error || (
        <>
          <FriendsList type="search" friendList={friendList?.followers} />
        </>
      )}
    </>
  );
};

export default FriendsContainer;
