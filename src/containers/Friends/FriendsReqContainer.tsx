import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ErrorComponent from '../../components/Common/ErrorComponent';
import Loading from '../../components/Common/Loading';
import FriendsList from '../../components/Friends/FriendsList';
import { RootState } from '../../modules';
import { getRequestFriendListAsync } from '../../modules/requestFriend';

const FriendsReqContainer: React.FC = () => {
  const { error, loading, requestFriendList } = useSelector(
    (state: RootState) => state.requestFriendList.myRequestFriendList
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRequestFriendListAsync.request());
  }, []);
  return (
    <>
      {loading && <Loading />}
      {error && <ErrorComponent />}
      {loading || error || (
        <>
          <FriendsList type="req" friendList={requestFriendList?.applicants} />
        </>
      )}
    </>
  );
};

export default FriendsReqContainer;
